import { statusCode } from '../../config/index';
import Activity, { IActivity } from '../../db/schema/activity';
import DynSingleDie, { IDynSingleDie } from '../../db/schema/dynSingleDie'; // 引入足迹点赞业务中间表
import DirExistUtils from '../../utils/DirExistUtils';
// import ProcessingImage from '../../utils/ProcessingImage';
import BASE_OPEN_SOURCE_API from '../../master/BASE_OPEN_SOURCE_API';
import ActivityService from './activity.service';
const formidable = require('formidable');
// 此处需要的是路由
class ActivityController extends BASE_OPEN_SOURCE_API<ActivityService, IActivity> {
    private activity: IActivity;
    private activityList: IActivity[];
    private activitysByZan: any[];
    private activitysByByZuJi: any[];
    private activityService: any;
    constructor(model: any) {
        super(model)
        this.activityService = new ActivityService()
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
                        console.log(`上传的图片数据为....`)
                        console.log(files)
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
                            await Activity.findByIdAndUpdate(_id, body, { new: true })
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
                // 判断今天是否已经有赞
                // 需求有一个发起请求的id
                this.activitysByZan = await this.queryDieByTodayCount(DynSingleDie, Object.assign({ type: 0, searchAble: 'activity' }, body));
                console.log(this.activitysByZan)
                this.activitysByByZuJi = await this.queryDieByTodayCount(DynSingleDie, Object.assign({ type: 1, searchAble: 'activity' }, body));
                this.activityList = await this.activityService.queryUserActivityInfoService(body, this.activitysByZan, this.activitysByByZuJi)
            }
            if (this.activitysByZan && this.activityList.length > 0) {
                ctx.body = {
                    message: statusCode.success,
                    activityList: this.activityList
                };
            } else {
                ctx.body = {
                    message: statusCode.noOne
                };
            }
        };
    }
    /**
     * 更新活动的赞
     * @param userId
     * @param acceptUserId
     */
    public updateActivitysZan() {
        return async (ctx: any) => {
            const { body } = ctx.request
            console.log(`我是acceptUserId是：  ${body.acceptUserId}`)
            const canZan = await this.genericSingleDie(Activity, DynSingleDie, body);
            console.log(`这里测试是否可以点赞.....${canZan}`)
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
    }
}
export default new ActivityController(Activity);
