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
  /**router.get('/.well-known/acme-challenge/wqe5-WvW_HKjsEDvWp0HI-x90R2lXoUCGirmlusokNU', async (ctx: any, next: any) => {
    ctx.body = 'wqe5-WvW_HKjsEDvWp0HI-x90R2lXoUCGirmlusokNU.E0O1GN6QWJPdePfPtPsVMxBjof7zYJ1V9MRK70sL2Q8'        
  })*/
  return router.routes()
}
