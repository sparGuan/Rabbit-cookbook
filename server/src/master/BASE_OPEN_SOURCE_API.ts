import IController from './Controller';
import Service from './Service';
// 所有公开API库
export default class BASE_OPEN_SOURCE_API<S , M> implements IController {
  private BaseService: any;
  private BaseModel: M;
  constructor (Model: M) {
    this.BaseService = new Service<S>();
    this.BaseModel = Model;
  }
  // 总主干
  // 先有默认的Controller
  // 然后提供接口重写该Controller
  // 实现业务 ===》 点赞
  public async genericSingleDie<T>(child: T, data?: {}): Promise<boolean> {
    const canZan = await this.BaseService.genericSingleDieService(this.BaseModel, child , data)
    return canZan
  }
}
