import Controller, { IController } from './Controller';
// 所有公开API库
export default class BASE_OPEN_SOURCE_API {
  private Controller: IController;
  private type: string;
  // 总主干
  constructor(type?: string | null) {
    switch (type) {
      case '1':
        break;
      case '2':
        break;
      default:
        // 初始化公共构造器
        this.Controller = new Controller()
        break;
    }
  }
}
