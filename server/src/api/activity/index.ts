import activityController from './activity.controller'
const path = require('path')
export default (Router: any) => {
  const parentAddr = path.resolve(__dirname, '.')  
  const Model = parentAddr.substring(parentAddr.lastIndexOf('/') + 1)  
  for (const reqMethod of Object.getOwnPropertyNames(
    Object.getPrototypeOf(activityController)
  )) {
    // 不是构造器所有的非静态方法作为post
    if (reqMethod !== 'constructor') {
      Router.post(
        `/${Model}/${reqMethod}`,
        activityController[reqMethod].apply(activityController)
      )
    }
  }
  return Router
}
