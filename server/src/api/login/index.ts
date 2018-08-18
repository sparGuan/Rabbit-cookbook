import LoginController from './login.controller'
export default (Router: any) => {
  for (const reqMethod of Object.getOwnPropertyNames(
    Object.getPrototypeOf(LoginController)
  )) {
    // 不是构造器所有的非静态方法作为post
    if (reqMethod !== 'constructor') {
      Router.post(
        `/${reqMethod}`,
        LoginController[reqMethod].apply(LoginController)
      )
    }
  }
  return Router
}
