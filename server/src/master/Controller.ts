//声明一个控制器接口接口
import path = require('path')
export interface IController{
  addSubstemRoutes(Router: any): any;
}
//实现接口
//这里使用了 implements 关键字来实现接口
export default class Controller implements IController{
  // Controller类型函数调用
  // 返回所有控制器API路由组
  addSubstemRoutes(Router: any): any {
//     const parentAddr = path.resolve(__dirname, '.')  
//     const Model = parentAddr.substring(parentAddr.lastIndexOf('/') + 1)  
//     for (const reqMethod of Object.getOwnPropertyNames(
//       Object.getPrototypeOf(activityController)
//     )) {
//       // 不是构造器所有的非静态方法作为post
//       if (reqMethod !== 'constructor') {
//         Router.post(
//           `/${Model}/${reqMethod}`,
//           activityController[reqMethod].apply(activityController)
//         )
//       }
//     }
//     return Router
  }
}
