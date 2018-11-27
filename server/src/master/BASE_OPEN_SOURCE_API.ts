import IController from './Controller';
import Service from './Service';
// 所有公开API库
export default class BASE_OPEN_SOURCE_API<S , M> implements IController {
  // 总主干
  // 先有默认的Controller
  // 然后提供接口重写该Controller
  // 实现业务 ===》 点赞
  public genericSingleDie() {
    const IService = new Service<S>()
    // const IModel = new Model<M>()
    // IService.genericSingleDieService(IModel);
  }
}
