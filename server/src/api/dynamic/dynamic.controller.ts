import { statusCode } from '../../config/index';
import Dynamic, { IDynamic, IDynamicComment } from '../../db/schema/dynamic';
import User, { IUser } from '../../db/schema/user';
import DynSingleDie, { IDynSingleDie } from '../../db/schema/dynSingleDie';
import DirExistUtils from '../../utils/DirExistUtils';
import BASE_OPEN_SOURCE_API from '../../master/BASE_OPEN_SOURCE_API';
import dynamicService from './dynamic.service';
import mongoose = require('mongoose');
import formidable = require('formidable');
import moment = require('moment');
// 实验目的：能够在子类的controller里面使用basecontroller的公共方法
// this指向了BASE_OPEN_SOURCE_API，实验目的：this指向baseController
class DynamicController extends BASE_OPEN_SOURCE_API<dynamicService , Dynamic> {
  private dynamic: IDynamic;
  private dynamicList: IDynamic[];
  private user: IUser;
  private dynSingleDieList: IDynSingleDie []; // 动态点赞操作
  private dynSingleDie: IDynSingleDie ; // 动态点赞操作
  constructor() {
    super();
  }
  /**
   *  个人动态控制器
   *  实现保存个人动态
   *  req:{
   *      userID
   *      speech
   *      album
   *      meta : {其他元信息}
   *    }
   */
  public saveDynamic() {
    return async (ctx: any) => {
      // 让异步变同步
      try {
        const form = new formidable.IncomingForm();
        let body;
        await new Promise((reslove: any, reject: any) => {
          form.parse(ctx.req, async (err: any, fields: any, files: any) => {
            if (err) {
              throw err;
            }
            body = JSON.parse(fields.dynamic);
            if (Object.keys(files).length > 0) {
              const dynamicFilesArray: any = await DirExistUtils.uploadFileCommon(
                files
              );
              body.album = dynamicFilesArray; // 相册地址
            }
            this.dynamic = await new Dynamic(body);
            this.dynamic = await this.dynamic.save();
            reslove();
          });
        });
        if (!global._.isEmpty(this.dynamic)) {
          ctx.body = {
            message: statusCode.success,
            Dynamic: this.dynamic
          };
        } else {
          ctx.body = {
            message: statusCode.error
          };
        }
      } catch (error) {
        throw error;
      }
    };
  }
  /**
   *  保存评论，更新dong'tai评论
   *  @param dynamicId
   *  @param userId
   *  @return void
   */
  public saveDynamicComment() {
    return async (ctx: any) => {
      // 让异步变同步
      try {
        const { body } = ctx.request;
        // 如果动态ID不为空并且用户ID不为空
        if (
          !global._.isEmpty(body.userId) &&
          !global._.isEmpty(body.dynamicId)
        ) {
          const dynamicId = body.dynamicId;
          const userId = body.userId;
          // 更新动态表，将评论放入动态表里面
          this.user = (await User.findById(userId)) as IUser;
          this.dynamic = (await Dynamic.findById(dynamicId)) as IDynamic;
          this.dynamic.dynamicCommentList.push({
            nickName: this.user.nickName,
            speech: body.speech,
            createTime: new Date()
          } as IDynamicComment);
          this.dynamic = await Dynamic.update(
            { _id: dynamicId },
            { $set: this.dynamic },
            { new: true }
          );
          if (!global._.isEmpty(this.dynamic)) {
            ctx.body = {
              message: statusCode.success
            };
          }
        }
      } catch (error) {
        throw error;
      }
    };
  }
  /**
   *  查询所有用户下的活动列表和所有的评论
   *  @param userId
   *  @return void
   *  @data DynamicList
   */
  public queryUserAndFriendsDynamic() {
    return async (ctx: any) => {
      // 让异步变同步
      const { body } = ctx.request;
      // 找出所有自己和自己的朋友的动态，最新时间排序
      // 用userId去查出所有的friendsIds && 查出自己的最新动态10条
      // 判断是否有firendsIds,把所有的friendsIds去查对应自己的最新动态10条
      // Model.find({id:{$in:[]},function(err,list){})
      if (!global._.isEmpty(body.userId)) {
        // 先查出自己的10条动态
        // 查找当前用户判断是否存在好友
        // 将所有的好友的Id在动态集合中使用查询$in查找出来
        // this.DynamicList = await Dynamic.find({ userId: body.userId });
        const _id = body.userId;
        this.user = (await User.findById(_id)) as IUser; // 查询一条用户对象信息
        if (!global._.isEmpty(this.user)) {
          const friends: IUser[] = this.user.get('friends') as IUser[];
          const userIds: string[] = [...friends, this.user].map(v => v._id);
          this.dynamicList = (await Dynamic.find({
            user: { $in: userIds }
          })
            .populate({ path: 'user', select: 'headImg nickName' })
            .sort({ create_at: -1 })
            .limit(10)
            .exec()) as IDynamic[];
          ctx.body = {
            message: statusCode.success,
            dynamicList: this.dynamicList
          };
        } else {
          ctx.body = {
            message: statusCode.noOne
          };
        }
      } else {
        ctx.body = {
          message: statusCode.noOne
        };
      }
    };
  }
  /**
   *  查询所有用户下的活动列表和所有的评论
   *  更新动态文章的赞数量
   *  @param {number} type 0 1 2
   *  @param {Object} dynamic 动态Id
   *  @param {string} user    当前用户Id
   *  @param {string} acceptUserId 请求用户Id
   *  @return void
   */
  public updateDynamicsZan() {
    // 执行service函数 ---->
    // 更新该文章赞数量
    return async (ctx: any) => {
      // 让异步变同步
      const { body } = ctx.request;
      console.log(32421341234234)
      console.log(body)
      // 当前用户和被选用户id都不为空
      if (!global._.isEmpty(body.userId) && !global._.isEmpty(body.acceptUserId)) {
        // 先去表里面查一下有没有该数据记录
        // 没有的话就插入一条，然后返回成功
        // 如果已经存在该条记录了
        // 就返回提示信息
        // mongoose.Types.ObjectId('576cd26698785e4913b5d0e1')
        // totalPraise +1
        // thelast TODO: 将该业务封装至底层处理 by 2018/11/27
        const acceptUser = body.acceptUser = mongoose.Types.ObjectId(body.acceptUserId)
        const user = body.user = mongoose.Types.ObjectId(body.userId)
        // 日期处理类库moment
        const today: string = moment().format('L') as string;
        console.log(`today is ${today}`)
        // 如何强转该类型？
        // 直接传一个类型进去
        this.dynSingleDieList = (await DynSingleDie.find({
          acceptUser,
          user,
          create_at: { $gte: today },
          type: Number(body.type)
        })) as IDynSingleDie [];
        console.log(45566464664644546)
        console.log(this.dynSingleDieList)
        if (this.dynSingleDieList.length === 0) {
          // 插入数据
          body.dynamic = mongoose.Types.ObjectId(body.dynamicId)
          this.dynSingleDie = new DynSingleDie(body);
          await this.dynSingleDie.save();
          const _id = body.dynamicId;
          // 给被看动态的用户点赞 +1
          this.dynamic = (await Dynamic.findById(_id) as IDynamic);
          const totalPraise = this.dynamic.meta.totalPraise + 1
          await this.dynamic.update(
            { $inc: {
              'meta.totalPraise': 1
            } },
            { new: true });
          ctx.body = {
            message: statusCode.success
          };
        } else {
          // 此处返回失败
          // 今天之内不可再点赞了
          ctx.body = {
            message: statusCode.error
          };
        }
      }
    };
  }
}
export default new DynamicController();
