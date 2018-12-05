import { statusCode } from '../../config/index';
import Footprint, { IFootprint } from '../../db/schema/footprint';
import BASE_OPEN_SOURCE_API from '../../master/BASE_OPEN_SOURCE_API';
import FootprintService from './footprint.service';
import DynSingleDie, { IDynSingleDie } from '../../db/schema/dynSingleDie';
import Dynamic, { IDynamic, IDynamicComment } from '../../db/schema/dynamic';
import mongoose = require('mongoose');
// 此处需要的是路由
class FootprintController extends BASE_OPEN_SOURCE_API< FootprintService , IFootprint > {
  private footprint: IFootprint;
  private footprintList: IFootprint[];
  private FootprintService: any;
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
}
export default new FootprintController(Footprint);
