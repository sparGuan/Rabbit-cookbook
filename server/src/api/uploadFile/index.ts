import uploadFileController from './uploadFile.controller'
const koaBody = require('koa-body')({
  multipart: true // 支持文件上传
})
export const Routing = (Router: any) => {
  for (const reqMethod of Object.getOwnPropertyNames(
    Object.getPrototypeOf(uploadFileController)
  )) {
    // 不是构造器所有的非静态方法作为post
    if (reqMethod !== 'constructor') {
      Router.post(
        `/${reqMethod}`,
        koaBody,
        uploadFileController[reqMethod].apply(uploadFileController)
      )
    }
  }
  return Router
}
