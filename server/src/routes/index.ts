import { IRouterContext, IRouterOptions } from "koa-router";

export default (Router: any) => {
  const router = new Router()
  /**
   * 首页路由
   * @param  {Function} Router
   * @return {Function}
   */
  router.get('/', async (ctx: any, next: any) => {
    ctx.body = 'koa2 string'
  })
  return router.routes()
}
