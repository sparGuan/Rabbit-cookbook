import mongoose = require('mongoose');
import Footprint, { IFootprint } from '../../db/schema/footprint';
export default class FootprintService {
  private Footprint: any;
  public async saveFootprintService(body: any) {
      // 进来就证明，已经往统计增加了一条数据
      // 保存到足迹表
      const data = {} as any
      if (body.footprintType === '0') {
        // 动态数据类型为0
        data.footprintType = Number(body.footprintType)
        data.desc = body.speech
        data.sourceData = body._id // 来源哪张表，就获取该数据的id
        data.user = mongoose.Types.ObjectId(body.acceptUserId)
        data.linkType = Number(body.linkType)
        data.comment = body.comment
        this.Footprint = new Footprint(data);
        this.Footprint = await this.Footprint.save();
    }
  }
}
