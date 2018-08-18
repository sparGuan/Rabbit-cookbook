"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uploadFile_controller_1 = require("./uploadFile.controller");
const koaBody = require("koa-body")({
    multipart: true //, // 支持文件上传
    //encoding: "zip"		
});
exports.default = (Router) => {
    for (let reqMethod of Object.getOwnPropertyNames(Object.getPrototypeOf(uploadFile_controller_1.default))) {
        // 不是构造器所有的非静态方法作为post
        if (reqMethod !== "constructor") {
            Router.post(`/${reqMethod}`, koaBody, uploadFile_controller_1.default[reqMethod].apply(uploadFile_controller_1.default));
        }
    }
    return Router;
};
//# sourceMappingURL=index.js.map