import { statusCode } from '../../config/index';
import Dynamic, { IDynamic } from '../../db/schema/dynamic';
import DirExistUtils from '../../utils/DirExistUtils';
const formidable = require('formidable');
class DynamicController {
  private dynamic: IDynamic;
  private DynamicList: IDynamic[];
  public saveOrUpdate() {
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
                body.album = dynamicFilesArray
              }
              const _id: string = body._id;
              if (!global._.isEmpty(_id)) {
                // 有ID就update
                await Dynamic.findByIdAndUpdate(_id, body, {new: true})
                reslove()
              } else {
                this.dynamic = await new Dynamic(body);
                this.dynamic = await this.dynamic.save();
                reslove()
              }
            });
        })
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
  // public queryUserDynamicInfo() {
  //   return async (ctx: any) => {
  //     // 让异步变同步
  //     const { body } = ctx.request;
  //     if (!global._.isEmpty(body.userId)) {
  //       this.DynamicList = await Dynamic.find({ userId: body.userId });
  //     }
  //     if (this.DynamicList.length > 0) {
  //       ctx.body = {
  //         message: statusCode.success,
  //         DynamicList: this.DynamicList
  //       };
  //     } else {
  //       ctx.body = {
  //         message: statusCode.error
  //       };
  //     }
  //   };
  // }
}
export default new DynamicController() as any;
