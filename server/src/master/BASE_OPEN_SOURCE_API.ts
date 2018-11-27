import IController from './Controller';
import Service from './Service';
// 所有公开API库
export default class BASE_OPEN_SOURCE_API implements IController {
  private Service: any;
  constructor() {
    this.Service = new Service()
  }
  // 总主干
  public a() {
    this.Service.a();
  }
}
