import path = require('path')
import Controller, { IController } from './Controller'
export default class BASE_OPEN_SOURCE_API {
  private Controller: IController;
  private type: string;
  //总主干
  // 更换index.ts的方法，置换所有index.ts
  // super的方法
  // *构造函数： 
  /**
   * 
   * @param {object} 传入类型对象
   *          |--  可以是Controller //如果是类型对象，会转换为Controller类型
   * 
   */
  constructor() {
    switch(this.type)
    {
    case '1':    
      break;
    case '2':      
      break;
    default:
        // this.addSubstemRoutes(this.Controller)         
      break;
    }
  }
  
}