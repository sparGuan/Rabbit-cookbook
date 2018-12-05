import { statusCode } from '../../config/index';
import Dynamic, { IDynamic, IDynamicComment } from '../../db/schema/dynamic';
import User, { IUser } from '../../db/schema/user';
import DynSingleDie, { IDynSingleDie } from '../../db/schema/dynSingleDie';
import DirExistUtils from '../../utils/DirExistUtils';
import BASE_OPEN_SOURCE_API from '../../master/BASE_OPEN_SOURCE_API';
import DynamicService from './dynamic.service';
import formidable = require('formidable');
// 实验目的：能够在子类的controller里面使用basecontroller的公共方法
// this指向了BASE_OPEN_SOURCE_API，实验目的：this指向baseController
class DynamicController extends BASE_OPEN_SOURCE_API<DynamicService, IDynamic> {
  private dynamic: IDynamic;
  private dynamicList: IDynamic[];
  private user: IUser;
  private dynSingleDieList: IDynSingleDie[]; // 动态点赞操作
  private dynSingleDie: IDynSingleDie; // 动态点赞操作
  constructor(model: any) {
    super(model);
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
        // 在搜索所有的列表之前，先判断哪些是被该用户die过的
        // 查询die表，type为0的且是该用户今天赞过的
        // 查询die表，type为1的且是该用户今天分享过足迹的
        // 执行前的操作
        // 获取到已经赞过的ids
        if (!global._.isEmpty(this.user)) {
          const dynamicIdsByZan: any [] = await this.queryDieByTodayCount(DynSingleDie, Object.assign({type: 0}, body));
          // 获取已经分享到足迹过的Ids
          const dynamicIdsByShare: any [] = await this.queryDieByTodayCount(DynSingleDie, Object.assign({type: 1}, body));
          console.log(dynamicIdsByZan)
          console.log(dynamicIdsByShare)
          const friends: IUser[] = this.user.get('friends') as IUser[];
          const userIds: string[] = [...friends, this.user].map(v => v._id);
          this.dynamicList = (await Dynamic.find({
            user: { $in: userIds }
          })
            .populate({ path: 'user', select: 'headImg nickName' })
            .sort({ create_at: -1 })
            .limit(10)
            .exec()) as IDynamic[];
            if (this.dynamicList.length > 0) {
              this.dynamicList.forEach( (item: any) => {
                if (dynamicIdsByZan.indexOf(item._id) > -1) {
                  item.hasZan = true
                }
                if (dynamicIdsByShare.indexOf(item._id) > -1) {
                  console.log(231412414)
                  item.hasShare = true
                }
                // dynamicIdsByZan.some( keof => {
                //   if (keof.equals(item.id)) {

                //   }
                //   return ;
                //   });
                // dynamicIdsByShare.some( elem => {
                //     return elem.equals(item.id);
                // });
              })
            }
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
      // 当前用户和被选用户id都不为空
      if (
        !global._.isEmpty(body.userId) &&
        !global._.isEmpty(body.acceptUserId)
      ) {
        // 调用底层的service zanservice
        /**
         * @param {child} 子表
         * 传输的数据
         * 底层点赞业务
         * 先去表里面查一下有没有该数据记录
        // 没有的话就插入一条，然后返回成功
        // 如果已经存在该条记录了
        // 就返回提示信息
         */
        const canZan = await this.genericSingleDie(Dynamic , DynSingleDie, body);
        if (canZan) {
          ctx.body = {
            message: statusCode.success
          };
        } else {
          ctx.body = {
            message: statusCode.error
          };
        }
      }
    };
  }
}
export default new DynamicController(Dynamic);
