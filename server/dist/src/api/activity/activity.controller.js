"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../config/index");
const activity_1 = require("../../db/schema/activity");
class ActivityController {
    saveOrUpdate() {
        return async (ctx) => {
            // 让异步变同步
            const { body } = ctx.request;
            let activity = new activity_1.default(body);
            const _id = body.activity_id;
            console.log(_id);
            if (!global._.isEmpty(_id)) {
                // 有ID就update
                activity = await activity.update({ _id });
            }
            else {
                activity = await activity.save();
                console.log(activity);
            }
            ctx.body = {
                message: index_1.statusCode.success,
                activity
            };
        };
    }
}
exports.default = new ActivityController();
//# sourceMappingURL=activity.controller.js.map