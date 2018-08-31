import { statusCode } from '../../config/index';
import Dynamic, { IDynamic } from '../../db/schema/dynamic';
import DirExistUtils from '../../utils/DirExistUtils';
import BASE_OPEN_SOURCE_API from '../../master/BASE_OPEN_SOURCE_API';
const formidable = require('formidable');
// 实验目的：能够在子类的controller里面使用basecontroller的公共方法
// this指向了BASE_OPEN_SOURCE_API，实验目的：this指向baseController
class DynamicController extends BASE_OPEN_SOURCE_API {
  private dynamic: IDynamic;
  constructor() {
    super()
  }
  // private DynamicList: IDynamic[];
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
      console.log(111)
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
   *  查询所有用户下的活动列表
   *  @param userId
   *  @return void
   *  @data DynamicList
   */
  public queryUserAndFriendsDynamic() {
    return async (ctx: any) => {
      // 让异步变同步
      const { body } = ctx.request;
      // 用userId去查出所有的friendsIds && 查出自己的最新动态10条
      // 判断是否有firendsIds,把所有的friendsIds去查对应自己的最新动态10条
      // 最后进行合并 时间排序
      // if (!global._.isEmpty(body.userId)) {
      //   this.DynamicList = await Dynamic.find({ userId: body.userId });
      // }
      // if (this.DynamicList.length > 0) {
      //   ctx.body = {
      //     message: statusCode.success,
      //     DynamicList: this.DynamicList
      //   };
      // } else {
      //   ctx.body = {
      //     message: statusCode.error
      //   };
      // }
    };
  }
}
export default new DynamicController() as any;
