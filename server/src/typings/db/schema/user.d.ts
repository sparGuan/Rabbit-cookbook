import mongoose = require('mongoose');
/**
 * 用户模型
 * @param {String} name 昵称
 * @param {String} password 密码
 * @param {String} createTime 创建日期
 * @param {String} token 标记  将用户信息加以base64编码返回前台的认证
 * @param {Date} expiredTime  * expiredTime--失效时间
 * */
interface User extends mongoose.Document {
    friendIds: string[];
    tenancyName: string;
    nickName: string;
    openid: string;
    passWord: string;
    headImg: string;
    Mobile: boolean;
    token: string;
    createTime: Date;
    loginTime: Date;
    logoutTime: Date;
    expiredTime: number;
}
declare const _default: mongoose.PaginateModel<User>;
export default _default;
