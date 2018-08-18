"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const connection_1 = require("../connection");
const mongoosePaginate = require("mongoose-paginate"); //翻页插件
const autoIncrement = require("mongoose-auto-increment"); // id自增插件
// 自增ID初始化
autoIncrement.initialize(connection_1.db.connection);
const activity_schema = new mongoose.Schema({
    bgActivity: {
        type: String,
        trim: true
    },
    spacingFirst: {
        type: String,
        trim: true
    },
    titleBoxPic: {
        type: String,
        trim: true
    },
    introduce: {
        type: String,
        trim: true
    },
    rule: {
        type: String,
        trim: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true
    },
    // 发布日期
    // 发布日期
    create_at: { type: Date, default: Date.now },
    // 最后修改日期
    // 最后修改日期
    update_at: { type: Date, default: Date.now },
    // 其他元信息
    meta: {
        views: { type: Number, default: 0 },
        likes: { type: Number, default: 0 },
        comments: { type: Number, default: 0 } //评论数
    }
});
// 转化成普通 JavaScript 对象
activity_schema.set('toObject', { getters: true });
// 翻页 + 自增ID插件配置
activity_schema.plugin(mongoosePaginate);
activity_schema.plugin(autoIncrement.plugin, {
    model: 'Activity',
    field: 'id',
    startAt: 1,
    incrementBy: 1
});
exports.default = mongoose.model("Activity", activity_schema);
//# sourceMappingURL=activity.js.map