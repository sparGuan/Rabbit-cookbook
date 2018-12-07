import mongoose = require('mongoose');
import Footprint, { IFootprint } from '../../db/schema/footprint';
import Dynamic, { IDynamic, IDynamicComment } from '../../db/schema/dynamic';
import Activity, { IActivity } from '../../db/schema/activity';
import { statusCode } from '../../config/index';
export default class FootprintService {
  private Footprint: any;
  private footprintList: IFootprint[];
  private dynamicList: IDynamic [];
  private activityList: IActivity[];
  public async saveFootprintService(body: any) {
      // 进来就证明，已经往统计增加了一条数据
      // 保存到足迹表
      const data = {} as any
      if (body.footprintType === '0') {
        // 动态数据类型为0
        data.footprintType = Number(body.footprintType)
        data.sourceDataId = body.sourceDataId // 来源哪张表，就获取该数据的id
        data.user = mongoose.Types.ObjectId(body.acceptUserId)
        data.linkType = Number(body.linkType)
        this.Footprint = new Footprint(data);
        this.Footprint = await this.Footprint.save();
    }
  }
  public async queryFootPrintListService() {
    // 足迹数据列表
    this.footprintList = (await Footprint.find({
    })
    .populate({ path: 'user', select: 'headImg nickName' })
    .sort({ create_at: -1 })
    .limit(10)
    .exec()) as IFootprint [];
    if (this.footprintList.length > 0 ) {
      // 对该10条足迹进行分类
        const dynamicTypeIds: any = [] // 动态类型
        const activityTypeIds: any = [] // 活动类型
        const linkTypeMap: any [] = [];  // 2：有视频的类型; 0：单图文的类型; 1：纯文本的类型; 3：多图文灯箱的类型
        // 分类筛选数据
        // 动态类型为一组
        // 活动类型为一组
        this.footprintList.forEach( (item: any) => {
          linkTypeMap.push({
            sourceDataId: item.sourceDataId,
            linkType: item.linkType,
            footprintType: item.footprintType
          })
          switch ( item.footprintType ) {
            case 0:
              dynamicTypeIds.push(mongoose.Types.ObjectId(item.sourceDataId))
              break;
            case 1:
              activityTypeIds.push(mongoose.Types.ObjectId(item.sourceDataId))
              break;
            default:
              break;
          }
        })
        // 分好类型之后。。。。
        // 向数据库发起5次请求
        // 查询动态表
        if ( dynamicTypeIds.length > 0 ) {
          this.dynamicList = (await Dynamic.find({
            _id: { $in: dynamicTypeIds }
          })
          .populate({ path: 'user', select: 'headImg nickName' })
          .sort({ create_at: -1 }).exec()) as IDynamic[];
        } else {
          this.dynamicList = []
        }
        if (activityTypeIds.length > 0) {
          this.activityList = (await Activity.find({
            _id: { $in: activityTypeIds }
          })
          .populate({ path: 'user', select: 'headImg nickName' })
          .sort({ create_at: -1 }).exec()) as IActivity[];
        } else {
          this.activityList = []
        }
        const footprintAllList: any [] = [...this.dynamicList, ...this.activityList]
         // 动态，活动等等数据进行合并处理
         footprintAllList.forEach( (item: any) => {
          linkTypeMap.forEach( elem => {
              if ( elem.sourceDataId.toString() === item._id.toString() ) {
                item._doc.linkType = elem.linkType
                item._doc.footprintType = elem.footprintType
              }
          })
      })
        // 最终将整个数组返回前端
      if (footprintAllList.length > 0) {
          return footprintAllList
      } else {
        return statusCode.noOne
      }
    } else {
      return statusCode.noOne
    }
  }
}
