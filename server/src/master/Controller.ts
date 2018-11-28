// 声明一个控制器接口接口
// 公共业务处理控制器
export default interface IController {
  // <T>(arg: T): T;
  // ?是可选参数
  genericSingleDie<T>(child?: T , data?: {}): void;
}

