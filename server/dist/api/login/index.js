"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login_controller_1 = require("./login.controller");
exports.default = (Router) => {
    for (let reqMethod of Object.getOwnPropertyNames(Object.getPrototypeOf(login_controller_1.default))) {
        // 不是构造器所有的非静态方法作为post
        if (reqMethod !== 'constructor') {
            Router.post(`/${reqMethod}`, login_controller_1.default[reqMethod].apply(login_controller_1.default));
        }
    }
    return Router;
};
//# sourceMappingURL=index.js.map