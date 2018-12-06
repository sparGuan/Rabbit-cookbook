import { statusCode } from '../../config/index';
import Footprint, { IFootprint } from '../../db/schema/footprint';
import BASE_OPEN_SOURCE_API from '../../master/BASE_OPEN_SOURCE_API';
import FootprintService from './footprint.service';
import DynSingleDie, { IDynSingleDie } from '../../db/schema/dynSingleDie';
import Dynamic, { IDynamic, IDynamicComment } from '../../db/schema/dynamic';
import Activity, { IActivity } from '../../db/schema/activity';
import mongoose = require('mongoose');
// 此处需要的是路由
class FootprintController extends BASE_OPEN_SOURCE_API< FootprintService , IFootprint > {
  private footprint: IFootprint;
  private footprintList: IFootprint[];
  private FootprintService: any;
  private dynamic: IDynamic;
  private dynamicList: IDynamic [];
  private activity: IActivity;
  private activityList: IActivity[];
  constructor(model: any) {
    super(model)
  }
  /**
   *  保存一条足迹数据
   *  @param userId
   *  @return void
   *  @data Footprint
   *  1.先判断操作数据的用户是否已经分享过了
   *  2.没有分享过的情况下，数据保存到foot表
   *  3.从foot表拉取数据
   *  TODO: 由足迹转发动态
   */
  public saveFootprint() {
    return async (ctx: any) => {
      // 让异步变同步
      const { body } = ctx.request;
      const canShare = await this.genericSingleDie(Dynamic, DynSingleDie, body);
      if (canShare) {
          // 进来就证明，已经往统计增加了一条数据
          // 保存到足迹表
          this.FootprintService = new FootprintService()
          await this.FootprintService.saveFootprintService(body)
          ctx.body = {
            message: statusCode.success
          };
      } else {
        ctx.body = {
          message: statusCode.error
        };
      }
    };
  }
  /**
   * TODO: 获取所有列表数据
   * 视频获取单图文放置列表第一
   * 如果他是单图文或者单视频，走第一
   */
  public queryFootPrintList() {
    return async (ctx: any) => {
      // 让异步变同步
      const { body } = ctx.request;
      // 先查询10条足迹
      // 查询0的为第一批
      this.footprintList = (await Footprint.find({
      })
        .populate({ path: 'user', select: 'headImg nickName' })
        .sort({ create_at: -1 })
        .limit(10)
        .exec()) as IFootprint [];
        console.log(this.footprintList)
        if (this.footprintList.length > 0 ) {
          // 对该10条足迹进行分类
        const dynamicTypeIds: any = [] // 动态类型
        const activityTypeIds: any = [] // 活动类型
        // 分类筛选数据
        // 动态类型为一组
        // 活动类型为一组
        this.footprintList.forEach( (item: any) => {
          switch ( item.footprintType ) {
            case 0:
              dynamicTypeIds.push(item.sourceDataId)
              break;
            case 1:
              activityTypeIds.push(item.sourceDataId)
              break;
            default:
              break;
          }
        })
        // 分好类型之后。。。。
        // 向数据库发起5次请求
        // 查询动态表
        console.log(452345352)
        console.log(dynamicTypeIds)
        if ( dynamicTypeIds.length > 0 ) {
          this.dynamicList = (await Dynamic.find({
            _id: { $in: dynamicTypeIds }
          })
          .populate({ path: 'user', select: 'headImg nickName' })
          .sort({ create_at: -1 }).exec()) as IDynamic[];
          console.log(242123411)
          console.log(this.dynamicList)
        }
        if (activityTypeIds.length > 0) {
          this.activityList = (await Activity.find({
            _id: { $in: activityTypeIds }
          })
          .populate({ path: 'user', select: 'headImg nickName' })
          .sort({ create_at: -1 }).exec()) as IActivity[];
        }
        [this.dynamicList, this.activityList].forEach( (item: any []) => {
            if (typeof item  === 'object' && item.length > 0) {
              item.forEach( (item: any, index: number) => {
                item._doc.footprintType = index
              })
            }
        })
        const footprintAllList = [...this.dynamicList, ...this.activityList]
        // 最终将整个数组返回前端
        if (footprintAllList.length > 0) {
          ctx.body = {
            message: statusCode.success,
            footprintAllList
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
}
export default new FootprintController(Footprint);
