import Activity, { IActivity } from '../../db/schema/activity';
import { statusCode } from '../../config/index';
export default class ActivityService {
  private activityList: IActivity[];
  public update() {
    console.log(111)
  }
  /**
   *
   * @param body 数据源
   * @param activitysByZan 所有查询到的是否存在今天有赞的ids
   */
  public async queryUserActivityInfoService(body: any , activitysByZan: any[], activitysByByZuJi: any[]) {
    // 这里应该是找到自己创建的活动和附近的活动一起合并，自己的活动排在第一，附近的活动排在第二
    this.activityList = await Activity.find({ userId: body.userId }).sort({ create_at: -1 })
    .limit(10) as IActivity[];
    if (this.activityList.length > 0) {
      if (activitysByZan.length > 0 || activitysByByZuJi.length > 0) {
        this.activityList.forEach( (item: any) => {
          if (activitysByZan.indexOf(item._id.toString()) > -1) {
            console.log(`已经点赞过啦.....`)
            item._doc.hasZan = true
          }
          if (activitysByByZuJi.indexOf(item._id.toString()) > -1) {
            console.log(`已经分享过啦.....`)
            item._doc.hasShare = true
          }
        })
      }
    }
    return this.activityList
  }
}
