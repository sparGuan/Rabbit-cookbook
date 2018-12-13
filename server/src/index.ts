import mongoosePaginate = require('mongoose-paginate');
import * as Koa from 'koa'; // koa
import * as Router from 'koa-router'; // x导入koa路由
import * as parser from 'koa-bodyparser'; // json
import * as cors from 'koa2-cors';
import * as helmet from 'koa-helmet'; // 安全相关
import api from './routes/api';
import routes from './routes/index';
import mongoConnection from './db/connection';
import * as nunjucks from 'koa-nunjucks-2';
import { port, webServerDoMain, baseApi, limit } from './config/index';
import path = require('path');
import IO = require('koa-socket');
import Socket, { ISocket } from './db/schema/socket';
import User, { IUser } from './db/schema/user';
// 中间件导入
const ioLoader = require('./io/index');
const catchError = require('./middlewares/catchErrors');
// const seal = require('./middlewares/seal');
// const frequency = require('./middlewares/frequency');
// const isVaild = require('./middlewares/isVaild');
const log = require('./middlewares/log');
const enhanceContext = require('./middlewares/enhanceContext');
// 初始化应用
global._ = require('lodash');
const app = new Koa();
const io = new IO({});
const router = new Router({
  prefix: baseApi
});
// 初始化完成，配置应用,加载中间件
// @ts-ignore
mongoosePaginate.paginate.options = {
  limit: `${limit}`
};
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
    // 注入应用io
    io.attach(app);
    io.use(log);
    io.use(enhanceContext);
    io.use(catchError);
    // 首先必须所有接口部署完成
    app.io.on('connection', async (ctx: any) => {
      console.log(
        `  <<<< connection ${ctx.socket.id} ${
          ctx.socket.request.connection.remoteAddress
        }`
      );
      const socket: ISocket = new Socket({
        id: ctx.socket.id,
        ip: ctx.socket.request.connection.remoteAddress
      }) as ISocket;
      await socket.save();
      // 此处应该循环导入所有的监听
      // ctx.socket是当前的socket
      ioLoader.socketConnect(ctx.socket);
      // app.io.sockets.sockets[socketid].emit('message', 'for your eyes only');
    });
    app.io.on('disconnect', async (ctx: any) => {
      console.log(`  >>>> disconnect ${ctx.socket.id}`);
      await Socket.remove({
        id: ctx.socket.id
      });
      await User.findOneAndUpdate(
        { sockId: ctx.socket.id },
        { $set: { sockId: '' } }
      );
    });
    await mongoConnection(); // 最后连接数据库
     // 先删除socket表里面所有数据,每当服务器重启的时候
    await Socket.remove({});
  } catch (e) {
    console.error('ERROR:', e);
    return;
  }
  // 监听服务器
  app.listen(port, () => {
    console.log(`${webServerDoMain} ${port} server listen`);
  });
})();
