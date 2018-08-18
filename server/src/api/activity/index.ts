import activityController from './activity.controller'
export default (Router: any) => {
  for (const reqMethod of Object.getOwnPropertyNames(
    Object.getPrototypeOf(activityController)
  )) {
    // 不是构造器所有的非静态方法作为post
    if (reqMethod !== 'constructor') {
      Router.post(
        `/${reqMethod}`,
        activityController[reqMethod].apply(activityController)
      )
    }
  }
  return Router
}
