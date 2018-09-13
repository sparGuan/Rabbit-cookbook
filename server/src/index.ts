import mongoosePaginate = require('mongoose-paginate');
import http = require('http');
import * as Koa from 'koa'; // koa
import * as Router from 'koa-router'; // x导入koa路由
import * as parser from 'koa-bodyparser'; // json
import * as cors from 'koa2-cors';
import * as helmet from 'koa-helmet'; // 安全相关
import api from './routes/api';
import routes from './routes/index';
import ioLoader from './io/index';
import mongoConnection from './db/connection';
import * as nunjucks from 'koa-nunjucks-2';
import { port, webServerDoMain, baseApi, limit } from './config/index';
import path = require('path');
global._ = require('lodash');
const app = new Koa();
const router = new Router({
  prefix: baseApi
});
// @ts-ignore
mongoosePaginate.paginate.options = {
  limit: `${limit}`
};
const server = http.createServer(app.callback());
(async () => {
  try {
    await app
      .use(
        cors({
          origin: (ctx: Koa.Context) => {
            if (ctx.url === '/test') {
              return '*'; // 允许来自所有域名请求
            }
            return '*'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
          },
          exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
          maxAge: 5,
          credentials: true,
          allowMethods: ['GET', 'POST', 'DELETE'],
          allowHeaders: [
            'Content-Type',
            'Authorization',
            'Accept',
            'X-Requested-With'
          ]
        })
      )
      .use(helmet())
      .use(parser({}))
      .use(
        nunjucks({
          ext: 'html',
          path: path.join(__dirname, './views'),
          nunjucksConfig: {
            trimBlocks: true
          }
        })
      ) // 部署node的模板引擎
      .use(routes(Router));
    await api(app, router); // 部署所有的api
     // 先连接数据库
    await mongoConnection();
    await ioLoader(server)
    // 首先必须所有接口部署完成
  } catch (e) {
    console.error('ERROR:', e);
    return;
  }
  // 服务器部署需要写上服务器ip，不能localhost
  server.listen(port, () => {
    console.log(`${webServerDoMain} ${port} server listen`);
  });
})();
