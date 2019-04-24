import mongoose = require('mongoose');
import { ISocket } from './socket';
/**
 * 用户模型
 * @param {String} name 昵称
 * @param {String} password 密码
 * @param {String} createTime 创建日期
 * @param {String} token 标记  将用户信息加以base64编码返回前台的认证
 * @param {Date} expiredTime  * expiredTime--失效时间
 * */
export interface IUser extends mongoose.Document {
    friends: IUser[]; // 所有的好友
    requestList: IUser[]; // 请求列表
    tenancyName: string;
    nickName: string;
    token: string;
    openid: string;
    passWord: string;
    headImg: string;
    headBgImg: string;
    sex: string;
    age: number;
    Mobile: string;
    createTime: Date;
    updateTime: Date; // 更新时间，作用于每次用户进入界面更新报废时长和更新当前位置
    loginTime: Date;
    logoutTime: Date;
    expiredTime: number; // 报废时长
    descPerson: string; // 个人描述
    location: number[];
    socket: ISocket; // 用户自己的socket，判断是否在线 -->socket为空代表已经不在线了
}

const user_schema: mongoose.Schema = new mongoose.Schema({
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    requestList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    tenancyName: {
        type: String,
        trim: true,
    },
    nickName: {
        type: String,
        trim: true,
    },
    token: {
        type: String,
        trim: true,
    },
    openid: {
        type: String,
        trim: true,
    },
    passWord: {
        type: String,
        trim: true,
        select: false,
    },
    headImg: {
        type: mongoose.Schema.Types.Mixed,
        trim: true,
    },
    headBgImg: {
        type: mongoose.Schema.Types.Mixed,
        trim: true,
    },
    sex: {
        type: String,
        trim: true,
    },
    age: {
        type: Number,
        trim: true,
    },
    Mobile: {
        type: String,
        trim: true,
        index: { unique: true },
    },
    descPerson: {
        type: String,
        trim: true,
    },
    location: {
        type: [Number],
        index: '2dsphere',
    },
    socket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Socket',
    },
    createTime: { type: Date, default: Date.now },
    loginTime: { type: Date, default: Date.now },
    logoutTime: { type: Date, default: '' },
    updateTime: { type: Date, default: Date.now },
    expiredTime: Number,
});
// 转化成普通 JavaScript 对象
user_schema.set('toObject', { getters: true });
export default mongoose.model<IUser>('User', user_schema);
