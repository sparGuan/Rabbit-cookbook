import mongoose = require('mongoose');
import { db } from '../connection';
import { IUser } from './user';
import { IDynamic } from './dynamic'
/**
 * 用户模型 ===》 动态----> 点赞之后的逻辑判断处理
 * @param {String} dynamic // 被处理过的动态Id
 * @param {number} type 0 已经被赞过了  1 已经被发送到足迹
 * @param {String} acceptUserId 处理人 ===》 是谁实施了这篇文章的操作
 * @param {Time} 时间
 **/
export interface IDynSingleDie extends mongoose.Document {
  dynamic: IDynamic;
  user: IUser;
  acceptUser: IUser;
  type: number;
  create_at: Date;
}
const dynSingleDie_schema: mongoose.Schema = new mongoose.Schema({
  dynamic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dynamic'
  },
  type: {
    type: Number,
    default: ''
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  acceptUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  // 创建日期
  create_at: { type: Date, default: Date.now }
});
// 转化成普通 JavaScript 对象
dynSingleDie_schema.set('toObject', { getters: true });
export default mongoose.model<IDynSingleDie>('DynSingleDie', dynSingleDie_schema);
