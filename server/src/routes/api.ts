import routesLoader from '../utils/routesLoader';
import Router = require('koa-router');
import Koa = require('koa');
const path = require('path');
const resolve = (dir: string) => path.join(__dirname, '..', dir);
export default (app: Koa, Router: Router): void => {
  routesLoader(resolve('/api')).then((routes: any) => {
    routes.forEach((route: any) => {
      const ro = route.default(Router);
      app.use(ro.routes()).use(
        ro.allowedMethods({
          throw: true
        })
      );
    });
  });
};
