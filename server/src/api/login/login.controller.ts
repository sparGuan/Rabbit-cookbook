import User, { IUser } from '../../db/schema/user';
import * as jwt from 'jsonwebtoken';
const bluebird = require('bluebird');
const { isValid } = require('mongoose').Types.ObjectId;
const bcrypt = bluebird.promisifyAll(require('bcryptjs'), { suffix: '$' });
import { statusCode, qsms,wx } from '../../config/index';
import getDateAfter from '../../utils/getDateAfter';
import Qsms = require('qcloudsms_js');
import DirExistUtils from '../../utils/DirExistUtils';
import formidable = require('formidable');
import getWxConfigUtil from '../../utils/getWxConfigUtil';
class LoginController {
  private qsms: any;
  private user: IUser;
  private userInfo: any;
  private saltRounds = 5;
  constructor() {
    this.qsms = new Qsms(qsms.appid, qsms.appkey);
  }
  // 注册--手机号注册
  // 腾讯云服务
  // 注册使用的参数：
  /**
   * 腾讯云短信的sdk包
   * @param {number} appid 腾讯云的短信应用id
   * @param {string} appkey 腾讯云短信应用key
   * @param {string} Mobile 手机号
   */
  public msgValid() {
    return async (ctx: any, next: any) => {
      const { body } = ctx.request;
      // 初始化接口
      // 先查询该手机号是否被注册
      this.user = (await User.findOne({ Mobile: body.Mobile })) as IUser;
      // 如果是注册用户就要进入该判断
      if (!global._.isEmpty(this.user) && body.register === true) {
        // 如果存在
        ctx.body = {
          message: '该手机号已被注册！'
        };
        return;
      }
      const valid = global._.random(999999);
      const smsType = 0; // Enum{0: 普通短信, 1: 营销短信}
      const ssender = this.qsms.SmsSingleSender();
      await ssender.send(
        smsType,
        86,
        body.Mobile,
        `您的验证码${valid}，此验证码10分钟内有效，请勿向他人泄露`,
        '',
        ''
      );
      ctx.body = {
        message: valid
      };
      // 单发短信
      // await this.qsms.singleSend({
      // 	phoneNumber:body.Mobile,
      // 	msg: `您的验证码${valid}，此验证码10分钟内有效，请勿向他人泄露`
      // });
    };
  }
  public register() {
    return async (ctx: any, next: any) => {
      const { body } = ctx.request;
      const salt = await bcrypt.genSalt$(this.saltRounds);
      body.passWord = await bcrypt.hash$(body.passWord, salt);
      this.user = new User(body);
      const UserModel = await this.user.save();
      await LoginController.resetExpiredTime(UserModel.get('_id'));
      ctx.body = {
        message: statusCode.success,
        UserModel
      };
    };
  }
  // 手机号找回
  /**
   * 腾讯云短信的sdk包
   * @param {string} Mobile 账号
   * @param {string} newPassWord 新的密码
   */
  public forgetPwd() {
    return async (ctx: any, next: any) => {
      const { body } = ctx.request;
      this.user = (await User.findOne({ Mobile: body.Mobile })) as any;
      if (!global._.isEmpty(this.user)) {
        this.user = await User.update(
          { _id: this.user.get('_id') },
          {
            $set: {
              passWord: body.passWord
            }
          }
        ).select('-passWord -updateTime -logoutTime -createTime ');
        ctx.body = {
          message: statusCode.success,
          user: this.user
        };
      } else {
        ctx.status = 401;
        ctx.body = {
          message: '该手机号还没被注册！'
        };
      }
    };
  }
  // 更新登录日志信息
  /**
   * @param {object} obj 所有用户信息
   */
  public useWxOrQQLogin() {
    return async (ctx: any, next: any) => {
      const { body } = ctx.request;
      let expiredTime;
      try {
        // 没有账号密码直接报400
        // 微信 QQ登录的自动创建账号密码
        if (!body.tenancyName || !body.openid) {
          // 400的报错是缺少参数
          ctx.status = 400;
          ctx.body = {
            error: `expected an object with userName, passWord but got: ${body}`
          };
          return;
        }
        this.user = (await User.findOneAndUpdate(
          { openid: body.openid },
          {
            $set: {
              // 生成 token 返回给客户端
              token: jwt.sign(
                {
                  data: body.Mobile,
                  // 设置 token 过期时间
                  exp: Math.floor(Date.now() / 1000) + 60 * 60 // 60 seconds * 60 minutes = 1 hour
                },
                'secret'
              )
            }
          },
          { new: true }
        )) as IUser;
        if (global._.isEmpty(this.user)) {
          const salt = await bcrypt.genSalt$(this.saltRounds);
          body.passWord = await bcrypt.hash$(body.openid, salt);
          body.token = jwt.sign(
            {
              data: body.openid, // 但三方登录使用openid作为token
              // 设置 token 过期时间
              exp: Math.floor(Date.now() / 1000) + 60 * 60 // 60 seconds * 60 minutes = 1 hour
            },
            'secret'
          );
          this.user = new User(body);
          this.user = (await this.user.save()) as IUser;
        } else {
          expiredTime = Date.parse(
            getDateAfter('', statusCode.expiredTime, '/')
          );
          this.user = await User.update(
            { _id: this.user._id },
            {
              $set: {
                location: body.location.map((element: string) => {
                  return Number(element);
                }),
                updateTime: new Date(),
                expiredTime
              }
            },
            { new: true }
          ).select('-passWord -updateTime -logoutTime -createTime ');
        }
        ctx.body = {
          message: statusCode.success,
          user: this.user,
          token: jwt.sign(
            {
              data: this.user,
              // 设置 token 过期时间
              exp: Math.floor(Date.now() / 1000) + 60 * 60 // 60 seconds * 60 minutes = 1 hour
            },
            'secret'
          )
        };
      } catch (error) {
        ctx.throw(500);
      }
    };
  }
  // 登录之后重设过期时间
  // 類接口才可以使用靜態的？
  public static async resetExpiredTime(_id: string) {
    // 后台过期时间，如果存在就重设
    // 不存在就默认是第一次登录（设置默认时间）
    // 直接更新过期时间就行了！
    const expiredTime: number = Date.parse(
      getDateAfter('', statusCode.expiredTime, '/')
    );
    await User.update(
      { _id },
      {
        $set: {
          expiredTime
        }
      }
    );
    return expiredTime;
  }
  // 每次手机登录都生成token值
  public useMobileLogin() {
    return async (ctx: any, next: any) => {
      const { body } = ctx.request;
      // 不用用户名登录就是手机登录
      if (!global._.isEmpty(body.Mobile)) {
        this.user = (await User.findOneAndUpdate(
          { Mobile: body.Mobile },
          {
            $set: {
              // 生成 token 返回给客户端
              token: jwt.sign(
                {
                  data: body.Mobile,
                  // 设置 token 过期时间
                  exp: Math.floor(Date.now() / 1000) + 60 * 60 // 60 seconds * 60 minutes = 1 hour
                },
                'secret'
              )
            }
          },
          { new: true }
        ).select(' -updateTime -logoutTime -createTime ')) as IUser;
      }
      // 如果找不到用户，就报401
      if (global._.isEmpty(this.user)) {
        ctx.status = 401;
        ctx.body = {
          message: '用户名或手机号错误'
        };
        return;
      }
      // 匹配密码是否相等
      // 使用中间件坐比较
      if (await bcrypt.compare(body.passWord, this.user.passWord)) {
        ctx.status = 200;
        let expiredTime;
        await LoginController.resetExpiredTime(this.user.get('_id')).then(
          result => {
            expiredTime = result;
          }
        ); // 设置过期时间
        delete this.user.passWord;
        ctx.body = {
          message: statusCode.success,
          user: this.user,
          expiredTime
        };
      } else {
        ctx.status = 401;
        ctx.body = {
          message: '密码错误'
        };
      }
    };
  }
  // token 验证
  // 点击登录窗口弹出来验证
  public tokenValid() {
    return async (ctx: any, next: any) => {
      const { token } = ctx.request.body;
      try {
        const decoded: any = jwt.verify(token, 'secret');
        // 过期
        if (decoded.exp <= Date.now() / 1000) {
          ctx.body = {
            status: 0,
            msg: '登录状态已过期，请重新登录'
          };
          return;
        }
        if (decoded) {
          // token is ok
          ctx.body = {
            status: 1,
            msg: '登陆验证成功'
          };
          return;
        }
      } catch (e) {
        if (e) {
          ctx.body = {
            status: 0,
            msg: e.message
          };
        }
      }
    };
  }
  // 更新登录日志信息
  /**
   * @param {string} userId 用户Id
   * @param {object} location 当前用户位置
   */
  public updateLoginInfo() {
    return async (ctx: any, next: any) => {
      console.log(ctx)
      // 在这里生成token和ticket的签名,保存进数据库
      const wxToken =  getWxConfigUtil.getToken()
      const wxTicket = getWxConfigUtil.getTicket(wxToken)
      const nonceStr = getWxConfigUtil.createNonceStr()
      const timestamp = getWxConfigUtil.createTimeStamp()
      const signature = getWxConfigUtil.calcSignature(wxTicket, nonceStr, timestamp, ctx.url) //获取签名
      // 将微信服务的签名返回到前端展示
      const { userId, location } = ctx.request.body;
      if (!global._.isEmpty(userId) && isValid(userId)) {
        const expiredtime: number = Date.parse(
          getDateAfter('', statusCode.expiredTime, '/')
        );

        this.userInfo = {
          $set: {
            updateTime: new Date(), // 更新时间
            location: location.map((element: string) => {
              return Number(element);
            }), // 更新当前位置
            expiredTime: expiredtime // 更新报废时长
          }
        };
        this.user = (await User.findByIdAndUpdate(userId, this.userInfo, {
          new: true
        })
          .select('-passWord -updateTime -logoutTime -createTime ')
          .populate({
            path: 'requestList',
            select: '-passWord -updateTime -logoutTime -createTime'
          })) as IUser;
        console.log(this.user);
        ctx.body = {
          message: statusCode.success,
          user: this.user,
          wxConfig: {
            appId: wx.appId,
            timestamp,
            nonceStr,
            signature
          }
        };
      }
    };
  }
  // 更新用户个人信息
  /**
   * @param {string} userId 用户Id
   * @param {img} headImg 当前用户头像
   * @param {img} headBgImg 当前用户背景图
   *
   */
  public updateUserInfo() {
    return async (ctx: any, next: any) => {
      const form = new formidable.IncomingForm();
      await new Promise((reslove: any, reject: any) => {
        form.parse(ctx.req, async (err: any, fields: any, files: any) => {
          if (err) {
            reject(err);
          }
          this.userInfo = JSON.parse(fields.userInfo);
          if (Object.keys(files).length > 0) {
            const filePaths = await DirExistUtils.uploadFileCommon(files);
            if (!global._.isEmpty(filePaths.headImg)) {
              this.userInfo.headImg = filePaths.headImg;
            }
            if (!global._.isEmpty(filePaths.headBgImg)) {
              this.userInfo.headBgImg = filePaths.headBgImg;
            }
          }
          const _id: string = this.userInfo.userId;
          if (!global._.isEmpty(_id) && isValid(_id)) {
            // 有ID就update
            this.user = (await User.findByIdAndUpdate(_id, this.userInfo, {
              new: true
            }).select(
              '-passWord -updateTime -logoutTime -createTime '
            )) as IUser;
            reslove();
          }
        });
      });
      if (!global._.isEmpty(this.user)) {
        ctx.body = {
          message: statusCode.success,
          user: this.user
        };
      } else {
        ctx.body = {
          message: statusCode.error
        };
      }
    };
  }
}
export default new LoginController();
