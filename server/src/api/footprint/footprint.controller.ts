import { statusCode } from '../../config/index';
import Footprint, { IFootprint } from '../../db/schema/footprint';
import BASE_OPEN_SOURCE_API from '../../master/BASE_OPEN_SOURCE_API';
import footprintService from './footprint.service';

// 此处需要的是路由
class FootprintController extends BASE_OPEN_SOURCE_API< footprintService , IFootprint > {
  private footprint: IFootprint;
  private footprintList: IFootprint[];
  constructor(model: any) {
    super(model)
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
    };
  }
}
export default new FootprintController(Footprint);
