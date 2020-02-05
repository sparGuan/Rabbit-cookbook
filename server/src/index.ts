import * as cors from 'koa2-cors';
import * as helmet from 'koa-helmet';
import * as Koa from 'koa';
import * as nunjucks from 'koa-nunjucks-2';
import * as parser from 'koa-bodyparser';
import * as Router from 'koa-router';
import * as Sentry from '@sentry/node';
import * as koaJwt from 'koa-jwt';
import * as jwt from 'jsonwebtoken';
import api from './routes/api';
import mongoConnection from './db/connection';
import routes from './routes/index';
import Socket, { ISocket } from './db/schema/socket';
import User, { IUser } from './db/schema/user';
import { baseApi, limit, port, redis_db, redis_host, redis_port, webServerDoMain, secret } from './config/index';
import mongoosePaginate = require('mongoose-paginate');
import path = require('path');
import IO = require('koa-socket');
const flash = require('koa-flash2'); // flash中间件，用来显示消息通知
const xerror = require('koa-xerror');
const cookieParser = require('cookie-parser');
import { scheduleObjectLiteralSyntax } from './utils/safeifyToMeishichina';
const child_process = require("child_process"); // 开启子进程
// const num_processes = require('os').cpus().length;
const num_processes = 1
const cluster = require('cluster'); // cluster是一个nodejs内置的模块，用于nodejs多核处理。cluster模块，可以帮助我们简化多进程并行化程序的开发难度，轻松构建一个用于负载均衡的集群。
const net = require('net'); // net网络服务器
const redis = require('redis'); // redis缓存
const sio_redis = require('socket.io-redis');
const koaLogger = require('koa-logger-winston');
// 中间件导入
const redisStore = require('koa-redis');
const gracefulShutdown = require('http-graceful-shutdown');
const session = require('koa-generic-session');
const ioLoader = require('./io/index');
const catchError = require('./middlewares/catchErrors');
const logger = require('./middlewares/logger');
const enhanceContext = require('./middlewares/enhanceContext');
const logRecord = require('koa-logs-full');
const moment = require('moment');
// 初始化应用
global._ = require('lodash');
const app = new Koa();
const io: any = new IO({}) as any;
const router = new Router({
    prefix: baseApi
});
// 错误信息汇总
Sentry.init({ dsn: 'https://5eccff38cb1b49cfb28a836447a638fd@sentry.io/1413343' });
process.setMaxListeners(0);
// 初始化完成，配置应用,加载中间件
// @ts-ignore
mongoosePaginate.paginate.options = {
    limit: `${limit}`
};

(async () => {
    try {
        app
        .use(cors({
          origin: (ctx: Koa.Context) => {
            if (ctx.url === '/test') {
              return '*'; // 允许来自所有域名请求
            }
            return '*'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
          },
          exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Authorization'],
          maxAge: 5,
          credentials: true,
          allowMethods: ['GET', 'POST', 'DELETE'],
          allowHeaders: [
            'Content-Type',
            'Authorization',
            'Accept',
            'X-Requested-With'
          ]
        }))
        .use(logRecord(app, {
          logdir: path.join(__dirname, 'logs')
        }))
        .use(helmet())
        .use(parser({}))
        .use(nunjucks({
          ext: 'njk',
          path: path.join(__dirname, './views'),
          nunjucksConfig: {
            trimBlocks: true
          }
        })).
        use(xerror())
        .use(async (ctx: any, next: any) => {
          try {
            await next();
            const status = ctx.status || 404;
            if (status === 404) {
              ctx.throw(404);
            }
          }
          catch (error) {
            ctx.status = error.status || 500;
            if (ctx.status === 404) {
              await ctx.render('pc/dist/error/404', {
                Title: '404',
                data: JSON.stringify({
                  Tips: 'error',
                  Content: '无法找到页面,<a href=\\"/\\">返回</a>'
                })
              });
            }
            else {
              await ctx.render('pc/dist/error/500', {
                Title: '500',
                data: JSON.stringify({
                  Tips: 'error',
                  Content: '系统错误,<a href=\\"/\\">返回</a>'
                })
              });
            }
            ctx.app.emit('error', error, ctx);
          }
        })
        // 正常请求的日志
        .use(koaLogger(logger.success))
        // 部署node的模板引擎
        .use(routes(Router))
        // 路由权限控制 除了path里的路径不需要验证token 其他都要
        .use(
          koaJwt({
              secret
          }).unless({
              path: [/^\/api\/login\/*/, /^\/api\/footprint\/queryFootPrintList/, /^\/api\/datav\/queryDatavMeishichinaTypeList/, /^\/api\/datav\/queryDavavMeishiChinaList/]
          })
        )
        .use(async (ctx, next) => {
          if (ctx.header && ctx.header.authorization) {
            const parts = ctx.header.authorization.split(' ');
            if (parts.length === 2) {
              // 取出token
              const scheme = parts[0];
              const token = parts[1];
              if (/^Bearer$/i.test(scheme)) {
                const decoded: any = jwt.verify(token, secret);
                // updateUser
                if (moment().subtract(7, 'days').unix() > decoded.exp ) {
                  ctx.status = 401;
                  ctx.body = {
                    error_code: 1,
                    error_msg: '登录已过期，请重新登录'
                  }
                }
                const newToken = jwt.sign(
                  {
                      data: decoded
                  },
                  secret,
                  { expiresIn: '7d' }
                );
                const user = await User.findOneAndUpdate(token, {
                  token: newToken
                }, {new: true})
                if (!user) {
                  ctx.status = 401;
                  ctx.body = {
                    error_code: 1,
                    error_msg: 'Protected resource, use Authorization header to get access\n'
                  }
                }
                ctx.user = user
                ctx.res.setHeader('Authorization', newToken);
                return next()
              }
            }
          }
          return next().catch(err => {
            if (err.status === 401) {
              ctx.status = 401;
              ctx.body = {
                error_code: 1,
                error_msg: 'Protected resource, use Authorization header to get access\n'
              }
            } else {
              throw err;
            }});
         })
        await api(app, router); // 部署所有的api
        // app.use( function* (next) {
        //     // 任何能够拿到context的地方都可以使用
        //     this.logger.log("我是要输出的文本");
        //     // 也可以使用error,warn,info.在终端输出的颜色会不同
        // })
        // 注入应用io
        io.attach(app);
        io.use(enhanceContext);
        io.use(catchError);
        await mongoConnection(); // 最后连接数据库
        // 先删除socket表里面所有数据,每当服务器重启的时候
        Socket.remove({});
        // 执行爬虫脚本沙箱
        child_process.exec("ts-node ./src/utils/safeifyToMeishichina.ts", async (error: Error, stdout: any, stderr: any) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
           scheduleObjectLiteralSyntax();
        });
    } catch (e) {
        console.error('ERROR:', e);
        return;
    }
    try {
        // 实现内核集群
        // 实现思路:创建一个master进程(管理工作进程)和多个worker进程(工作进程),连接来了后,由master进程计算并分发请求到指定的worker进程,并且每次相同ip的请求到达后,都由相同的worker进程处理
        if (cluster.isMaster) {
            const workers: any[] = [];
            const spawn = (i: number) => {
                workers[i] = cluster.fork();
                workers[i].on('exit', (worker: any, code: any, signal: any) => {
                    console.log('respawning worker', i);
                    spawn(i);
                });
            };
            for (let i = 0; i < num_processes; i++) {
                spawn(i);
            }
            const reg = /^[0-9]*$/
            const worker_index = (ip: string, len: number) => {
                if (ip === '::1') {
                    return 0; //  for mac os x
                }
                let s = '';
                for (let i = 0, _len = ip.length; i < _len; i++) {
                    if (ip[i] !== '.' && reg.test(ip[i])) {
                        s += ip[i];
                    }
                }
                return Number(s) % len;
            };
            // 分发进程
            const serverRoot = net.createServer({ pauseOnConnect: true }, (connection: any) => {
                const worker = workers[worker_index(connection.remoteAddress, num_processes)];
                worker.send('sticky-session:connection', connection);
            }).listen(port);
            // 启动平滑关闭
            gracefulShutdown(serverRoot, {
                signals: 'SIGINT SIGTERM',
                timeout: 30000,
                onShutdown: (signal: any) =>
                    new Promise((resolve: any) => {
                        console.log(`... called signal:${signal}`);
                        console.log('... in cleanup');
                        setTimeout(() => {
                            console.log('... cleanup finished');
                            resolve();
                        }, 1000);
                    }),
                finally: () => {
                    console.log('Server gracefulls shutted down.....');
                }
            });
            //  子进程
        } else if (cluster.isWorker) {
            console.log(`${webServerDoMain}:${port}`)
            const client = redis.createClient(redis_port, redis_host);
            app.use(session({
                store: redisStore({
                    db: redis_db,
                    client
                })
            }))
                // flash中间件,用来显示通知
                .use(flash());
            const server = app.listen(0, () => {
                console.log(`${webServerDoMain} ${port} server listen`);
            });
            // 启动平滑关闭
            gracefulShutdown(server, {
                signals: 'SIGINT SIGTERM',
                timeout: 30000,
                onShutdown: (signal: any) =>
                    new Promise((resolve: any) => {
                        console.log(`... called signal:${signal}`);
                        console.log('... in cleanup');
                        setTimeout(() => {
                            console.log('... cleanup finished');
                            resolve();
                        }, 1000);
                    }),
                finally: () => {
                    console.log('Server gracefulls shutted down.....');
                }
            });
            // 6379是redis缓存数据库的接口
            app.io.socket._adapter(sio_redis({ host: webServerDoMain, port: redis_port }));
            console.log(`适配缓存数据库中。。。`);
            // worker工作进程接收到master主进程分发的请求
            process.on('message', (message, connection) => {
                // 不是主进程分发的进程都return掉
                if (message !== 'sticky-session:connection') {
                    return;
                }
                server.emit('connection', connection);
                connection.resume();
            });
            // https://my.oschina.net/swingcoder/blog/527648
            // 监听服务器
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
        }
    } catch (error) {
        throw error
    }
})();
