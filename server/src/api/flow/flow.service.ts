import mongoose = require('mongoose');
import Flow, { IFlow } from '../../db/schema/flow';
import Dynamic, { IDynamic, IDynamicComment } from '../../db/schema/dynamic';
import Activity, { IActivity } from '../../db/schema/activity';
export default class FlowService {
  private flow: any;
  private flowList: IFlow[];
  // 保存关注的数据信息
  public async saveFlowService(body: any) {
      // 进来就证明，已经往统计增加了一条数据
      // 保存到足迹表
      const data = {} as any
      // 动态数据类型为0
      data.sourceDataType = Number(body.sourceDataType)
      data.sourceDataId = body.sourceDataId // 来源哪张表，就获取该数据的id
      data.acceptUser = mongoose.Types.ObjectId(body.acceptUserId)
      data.sourceDataType = Number(body.sourceDataType)
      data.user = mongoose.Types.ObjectId(body.userId)
      this.flow = new Flow(data);
      this.flow = await this.flow.save();
  }
}
