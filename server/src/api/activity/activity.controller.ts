import { statusCode } from '../../config/index';
import Activity, { IActivity } from '../../db/schema/Activity';
import DirExistUtils from '../../utils/DirExistUtils';
const formidable = require('formidable');
class ActivityController {
  private Activity: IActivity;
  private ActivityList: IActivity[];
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
              body = JSON.parse(fields.userActivity);
              if (Object.keys(files).length > 0) {
                const bgActivityArray: any = await DirExistUtils.uploadFileCommon(
                  files
                );
                if (bgActivityArray.bgBanner) {
                  body.bgBanner = bgActivityArray.bgBanner;
                }
                if (bgActivityArray.uploadBoxPic) {
                  body.uploadBoxPic = bgActivityArray.uploadBoxPic;
                }
                if (bgActivityArray.ruleBg) {
                  body.ruleBg = bgActivityArray.ruleBg;
                }
              }
              const _id: string = body._id;
              if (!global._.isEmpty(_id)) {
                // 有ID就update
                await Activity.findByIdAndUpdate(_id, body, {new: true})
                reslove()
              } else {
                this.Activity = await new Activity(body);
                this.Activity = await this.Activity.save();
                reslove()
              }
            });
        })
        if (!global._.isEmpty(this.Activity)) {
          ctx.body = {
            message: statusCode.success,
            Activity: this.Activity
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
   *  @data ActivityList
   */
  public queryUserActivityInfo() {
    return async (ctx: any) => {
      // 让异步变同步
      const { body } = ctx.request;
      if (!global._.isEmpty(body.userId)) {
        this.ActivityList = await Activity.find({ userId: body.userId });
      }
      if (this.ActivityList.length > 0) {
        ctx.body = {
          message: statusCode.success,
          ActivityList: this.ActivityList
        };
      } else {
        ctx.body = {
          message: statusCode.error
        };
      }
    };
  }
  
}
export default new ActivityController() as any;
