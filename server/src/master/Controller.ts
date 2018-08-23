// 声明一个控制器接口接口
// 公共业务处理控制器
export interface IController {
 save(): void;
 saveOrUpdate(): void;
 delete(): void
}
// 实现接口
// 这里使用了 implements 关键字来实现接口
// todo: 实现继承该控制器之后自动输出Router
export default class Controller implements IController {
  // 只处理公共业务逻辑的Controller
  // constructor() {
  //   // this.addSubstemRoutes()
  // }
  public save() {
    console.log(11)
  }
  public saveOrUpdate() {
    console.log(11)
  }
  public delete() {
    console.log(11)
  }
}
