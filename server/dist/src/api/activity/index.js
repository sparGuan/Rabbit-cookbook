"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const activity_controller_1 = require("./activity.controller");
exports.default = (Router) => {
    for (const reqMethod of Object.getOwnPropertyNames(Object.getPrototypeOf(activity_controller_1.default))) {
        // 不是构造器所有的非静态方法作为post
        if (reqMethod !== 'constructor') {
            Router.post(`/${reqMethod}`, activity_controller_1.default[reqMethod].apply(activity_controller_1.default));
        }
    }
    return Router;
};
//# sourceMappingURL=index.js.map