"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoosePaginate = require("mongoose-paginate");
const http = require("http");
const Koa = require("koa"); // koa
const Router = require("koa-router"); // x导入koa路由
const parser = require("koa-bodyparser");
const cors = require("koa2-cors");
const helmet = require("koa-helmet"); // 安全相关
const api_1 = require("./routes/api");
const index_1 = require("./routes/index");
const connection_1 = require("./db/connection");
const nunjucks = require("koa-nunjucks-2");
const index_2 = require("./config/index");
const path = require("path");
global._ = require('lodash');
const app = new Koa();
const router = new Router({
    prefix: index_2.baseApi
});
console.log(1111);
// @ts-ignore
mongoosePaginate.paginate.options = {
    limit: `${index_2.limit}`
};
(async () => {
    try {
        await app
            .use(cors({
            origin: (ctx) => {
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
        }))
            .use(helmet())
            .use(parser({}))
            .use(nunjucks({
            ext: 'html',
            path: path.join(__dirname, './views'),
            nunjucksConfig: {
                trimBlocks: true
            }
        }))
            .use(index_1.default(Router));
        await api_1.default(app, router);
        await connection_1.default();
    }
    catch (e) {
        console.error('ERROR:', e);
        return;
    }
    // 服务器部署需要写上服务器ip，不能localhost
    http.createServer(app.callback()).listen(index_2.port, () => {
        console.log(`${index_2.webServerDoMain} ${index_2.port} server listen`);
    });
})();
//# sourceMappingURL=index.js.map