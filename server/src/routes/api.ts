import routesLoader from './routesLoader';
import * as Router from 'koa-router' // x导入koa路由
import Koa = require('koa');
const path = require('path');
const resolve = (dir: string) => path.join(__dirname, '..', dir);
// 这里不再引用路由Indexjs，而是生成对应的Indexjs
export default (app: any, Router: Router): void => {
  routesLoader(resolve('/api')).then((routes: any) => {
    routes.forEach((route: any) => {
      // 调用route的方法
      const ro = route.Routing(Router);
      app.use(ro.routes()).use(
        ro.allowedMethods({
          throw: true
        })
      );
    });
  });
};
