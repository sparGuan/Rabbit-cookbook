import mongoose = require('mongoose');
import { db } from '../connection';
import { IUser } from './user';
/**
 * 用户模型
 * @param {String} uploadBgFile 首图背景
 * @param {String} bgBanner 首图背景间隙-->切裁背景图
 * @param {String} uploadBoxPic 标题图
 * @param {String} introduce 介绍内容
 * @param {user} IUser  规则
 * @param {Date} userId  用户ID
 **/
export interface ISocket extends mongoose.Document {
  id: string;
  ip: string;
  os: string;
  environment: string;
  user: IUser;
  create_at: Date;
  // 最后修改日期
  update_at: Date;
}
const socket_schema: mongoose.Schema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    index: true
  },
  ip: {
    type: String
  },
  os: {
    type: String,
    default: ''
  },
  environment: {
    type: String,
    default: ''
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  // 发布日期
  // 发布日期
  create_at: { type: Date, default: Date.now },
  // 最后修改日期
  // 最后修改日期
  update_at: { type: Date, default: Date.now }
});
// 转化成普通 JavaScript 对象
socket_schema.set('toObject', { getters: true });
export default mongoose.model<ISocket>('Socket', socket_schema);
