import { statusCode } from '../../config/index';
import Dynamic, { IDynamic, IDynamicComment } from '../../db/schema/dynamic';
import User, { IUser } from '../../db/schema/user';
import DirExistUtils from '../../utils/DirExistUtils';
import BASE_OPEN_SOURCE_API from '../../master/BASE_OPEN_SOURCE_API';
const formidable = require('formidable');
// 实验目的：能够在子类的controller里面使用basecontroller的公共方法
// this指向了BASE_OPEN_SOURCE_API，实验目的：this指向baseController
class DynamicController extends BASE_OPEN_SOURCE_API {
  private dynamic: IDynamic;
  private dynamicList: IDynamic[];
  private user: IUser;
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
      }
    };
  }
}
export default new DynamicController();
