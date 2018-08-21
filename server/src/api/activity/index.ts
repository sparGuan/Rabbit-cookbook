import dynamicController from './dynamic.controller'
export default (Router: any) => {
  for (const reqMethod of Object.getOwnPropertyNames(
    Object.getPrototypeOf(dynamicController)
  )) {
    // 不是构造器所有的非静态方法作为post
    if (reqMethod !== 'constructor') {
      Router.post(
        `/${reqMethod}`,
        dynamicController[reqMethod].apply(dynamicController)
      )
    }
  }
  return Router
}
