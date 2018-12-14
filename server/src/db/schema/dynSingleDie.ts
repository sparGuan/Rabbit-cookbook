import mongoose = require('mongoose');
import { db } from '../connection';
import { IUser } from './user';
import { IDynamic } from './dynamic'
import { IActivity } from './activity'
/**
 * 1.0 用户模型 ===》 动态----> 点赞之后的逻辑判断处理
 * 2.0 增加活动点赞和分享到足迹业务
 * @param {String} dynamic // 被处理过的动态Id
 * @param {number} type 0 已经被赞过了  1 已经被发送到足迹
 * @param {String} acceptUserId 处理人 ===》 是谁实施了这篇文章的操作
 * @param {Time} 时间
 **/
export interface IDynSingleDie extends mongoose.Document {
  dynamic: IDynamic;
  activity: IActivity;
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
  activity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity'
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
