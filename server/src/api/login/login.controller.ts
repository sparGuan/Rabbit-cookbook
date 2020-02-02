import * as jwt from 'jsonwebtoken';
import getDateAfter from '../../utils/getDateAfter';
import User, { IUser } from '../../db/schema/user';
import { qsms, statusCode, secret } from '../../config/index';
const bluebird = require('bluebird');
const bcrypt = bluebird.promisifyAll(require('bcryptjs'), { suffix: '$' });
import Qsms = require('qcloudsms_js');
import LoginService from './login.service';
import BASE_OPEN_SOURCE_API from '../../master/BASE_OPEN_SOURCE_API';
import * as moment from 'moment'
class LoginController extends BASE_OPEN_SOURCE_API<LoginService, IUser> {
    private qsms: any;
    private user: IUser;
    private userInfo: any;
    private saltRounds = 5;
    private LoginService: any;
    constructor(model: any) {
        super(model);
        this.qsms = new Qsms(qsms.appid, qsms.appkey);
        this.LoginService = new LoginService();
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
            try {
                const { body } = ctx.request;
                const valid = await this.LoginService.msgValidService(body)
                if (valid) {
                    ctx.body = {
                        message: valid
                    };
                } else {
                    ctx.body = {
                        message: statusCode.error
                    };
                }
            } catch (error) {
                throw error
            }
        };
    }
    /**
     * @param {string} Mobile 账号
     * @param {string} passWord 新的密码
     */
    public register() {
        return async (ctx: any, next: any) => {
            const { body } = ctx.request;
            this.user = (await User.findOne(
                { Mobile: body.Mobile }
            )) as IUser;
            console.log(this.user)
            if (!global._.isEmpty(this.user)) {
                return ctx.body = this.response(-1, 'ACCOUNT_ALREADY_EXISTS');
            }
            console.log(23413241234)
            const UserModel = await this.LoginService.registerService(body);
            if (UserModel) {
                return ctx.body = this.response(0, 'SUCCESS', UserModel);
            }
            return ctx.body = this.response(-1, 'MISS_RES_USERMODEL');
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
                    },
                    { new: true }
                ).select('-passWord -updatedAt -logoutTime -createAt ');
                ctx.body = this.response(0, statusCode.success, this.user);
                return;
            } else {
                ctx.status = 401;
                ctx.body = this.response(-1, 'ERR_NOT_REGISTERED'); // 该手机号还没被注册！
                return;
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
                this.user = await this.LoginService.useWxOrQQLoginService(body)
                ctx.body = {
                    message: statusCode.success,
                    user: this.user
                };
            } catch (error) {
                ctx.body = {
                    message: statusCode.error
                };
                ctx.throw(500);
            }
        };
    }
    // 每次手机登录都生成token值
    public useMobileLogin() {
        return async (ctx: any, next: any) => {
            const { body } = ctx.request;
            console.log(`正在使用手机进行登录！！！`)
            // 不用用户名登录就是手机登录
            if (!global._.isEmpty(body.Mobile)) {
                this.user = (await User.findOneAndUpdate(
                    { Mobile: body.Mobile },
                    {
                        $set: {
                            // 生成 token 返回给客户端
                            token: jwt.sign(
                                {
                                    data: body.Mobile
                                },
                                secret,
                                { expiresIn: '7d' }
                            )
                        }
                    },
                    { new: true }
                ).select('friends requestList tenancyName nickName token openid passWord headImg headBgImg sex age Mobile loginTime expiredTime descPerson location socket')) as IUser;
            } else {
              ctx.status = 402;
              ctx.body = {
                  message: '请输入手机号'
              };
              return;
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
                delete this.user.passWord;
                ctx.body = this.response(0, statusCode.success, this.user);
                return;
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
                const decoded: any = jwt.verify(token, secret);
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
            const { userId, location } = ctx.request.body;
            this.user = await this.LoginService.updateLoginInfo(userId, location)
            if (this.user) {
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
    // 更新用户个人信息
    /**
     * @param {string} userId 用户Id
     * @param {img} headImg 当前用户头像
     * @param {img} headBgImg 当前用户背景图
     *
     */
    public updateUserInfo() {
        return async (ctx: any, next: any) => {
            this.user = await this.LoginService.updateUserInfoService(ctx.req)
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
export default new LoginController(User);
