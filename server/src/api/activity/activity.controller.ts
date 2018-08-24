import { statusCode } from '../../config/index';
import Activity, { IActivity } from '../../db/schema/activity';
import DirExistUtils from '../../utils/DirExistUtils';
// import ProcessingImage from '../../utils/ProcessingImage';
import BASE_OPEN_SOURCE_API from '../../master/BASE_OPEN_SOURCE_API';
const formidable = require('formidable');
// 此处需要的是路由
class ActivityController extends BASE_OPEN_SOURCE_API {
  private activity: IActivity;
  private activityList: IActivity[];
  constructor() {
    super()
  }
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
                this.activity = await new Activity(body);
                this.activity = await this.activity.save();
                reslove()
              }
            });
        })
        if (!global._.isEmpty(this.activity)) {
          ctx.body = {
            message: statusCode.success,
            activity: this.activity
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
   *  @data activityList
   */
  public queryUserActivityInfo() {
    return async (ctx: any) => {
      // 让异步变同步
      const { body } = ctx.request;
      if (!global._.isEmpty(body.userId)) {
        this.activityList = await Activity.find({ userId: body.userId });
      }
      if (this.activityList.length > 0) {
        ctx.body = {
          message: statusCode.success,
          activityList: this.activityList
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
