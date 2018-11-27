import moment = require('moment');
import mongoose = require('mongoose');
// 公共服务层
export default class Service<T> {
  private identity: T;
  private identityList: T [];
  public genericSingleDieService: (identity: T, d: any) => ({})
  // 生成全局的点赞业务处理
  // 生成一个全局的装饰器 》》》》后面再去封装
  /**
   * @param {object} class 操作点赞，足迹等业务的执行操作的类
   * @param {object} data 操作点赞，足迹等业务的数据
   */
  // public async genericSingleDieService <T> (identity: T, data: any) {
  //   const today: string = moment().format('L') as string;
  //   const acceptUser  = mongoose.Types.ObjectId(data.acceptUserId)
  //   const user = mongoose.Types.ObjectId(data.userId)
  //   // this.identity = identity<T>
  //   // this.identityList = (await this.identity.find({
  //   //   acceptUser,
  //   //   user,
  //   //   create_at: { $gte: today },
  //   //   type: Number(body.type)
  //   // })) as IDynSingleDie [];

  //   // this.dynSingleDieList = (await DynSingleDie.find({
  //   //   acceptUser,
  //   //   user,
  //   //   create_at: { $gte: today },
  //   //   type: Number(body.type)
  //   // })) as IDynSingleDie [];
  // }
}
