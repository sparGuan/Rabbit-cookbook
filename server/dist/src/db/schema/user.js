"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const user_schema = new mongoose.Schema({
    friendIds: {
        type: Array
    },
    tenancyName: {
        type: String,
        trim: true
    },
    nickName: {
        type: String,
        trim: true
    },
    openid: {
        type: String,
        trim: true
    },
    passWord: {
        type: String,
        trim: true
    },
    headImg: {
        type: mongoose.Schema.Types.Mixed,
        trim: true
    },
    Mobile: {
        type: String,
        trim: true
    },
    token: {
        type: String,
        trim: true
    },
    createTime: { type: Date, default: Date.now },
    loginTime: { type: Date, default: Date.now },
    logoutTime: { type: Date, default: '' },
    expiredTime: Number
});
// 转化成普通 JavaScript 对象
user_schema.set('toObject', { getters: true });
exports.default = mongoose.model('User', user_schema);
//# sourceMappingURL=user.js.map