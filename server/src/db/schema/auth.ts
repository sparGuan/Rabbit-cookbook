import mongoose = require('mongoose');
import { IUser } from './user';
/**
 * 用户模型
 * 完成业务： 认证用户身份信息
 * 1. 保存认证
 * 2. 审核
 * 3. 完成认证（成为会员）
 * 4. 高级会员
 * @param {String} handHeldIDCard 手持身份证照片
 * @param {String} iDNumber 身份证号
 * @param {String} bankCardNumber 银行卡号 标题图
 * @param {String} Mobile 手机号
 * @param {Number} status  认证状态 0 提交认证 1  审核中 2 成为会员 3 高级会员
 * @param {User}   user  认证用户
 **/
export interface IAuth extends mongoose.Document {
    handHeldIDCard: string;
    iDNumber: string;
    bankCardNumber: string;
    Mobile: string;
    status: string;
    userId: IUser;
    create_at: Date;
    // 最后修改日期
    update_at: Date;
    // 其他元信息
}
const auth_schema: mongoose.Schema = new mongoose.Schema({
    handHeldIDCard: {
        type: String,
        trim: true, // ,
        // require: true,
        // default: ''
    },
    iDNumber: {
        type: String,
        required: true,
        default: '',
    },
    bankCardNumber: {
        type: String,
        required: true,
        default: '',
    },
    Mobile: {
        type: String,
        required: true,
        default: '',
    },
    status: {
        type: Number,
        required: true,
        default: 0,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // 发布日期
    // 发布日期
    create_at: { type: Date, default: Date.now },
    // 最后修改日期
    // 最后修改日期
    update_at: { type: Date, default: Date.now },
});
// 转化成普通 JavaScript 对象
auth_schema.set('toObject', { getters: true });
export default mongoose.model<IAuth>('Auth', auth_schema);
