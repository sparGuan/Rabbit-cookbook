"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../config/index");
class activity {
    constructor() { }
    save() {
        return async (ctx, next) => {
            // 让异步变同步
            ctx.body = {
                message: index_1.statusCode.success
            };
        };
    }
}
exports.default = new activity();
//# sourceMappingURL=activity.controller.js.map