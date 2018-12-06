import mongoose = require('mongoose');
import { db } from '../connection';
import mongoosePaginate = require('mongoose-paginate'); // 翻页插件
import autoIncrement = require('mongoose-auto-increment'); // id自增插件
import { IUser } from './user';
/**
 * 用户模型
 * @param {String} uploadBgFile 首图背景
 * @param {String} bgBanner 首图背景间隙-->切裁背景图
 * @param {String} uploadBoxPic 标题图
 * @param {String} introduce 介绍内容
 * @param {Date} rule  规则
 * @param {Date} userId  用户ID
 **/
export interface IActivity extends mongoose.Document {
  bgBanner: string;
  uploadBoxPic: string;
  ruleBg: string;
  introduce: string;
  rule: string;
  userId: IUser;
  create_at: Date;
  // 最后修改日期
  update_at: Date;
  // 其他元信息
  meta: IMeta;
}
export interface IMeta {
  views: number;
  likes: number;
  comments: number;
}
// 自增ID初始化
autoIncrement.initialize(db.connection);
const activity_schema: mongoose.Schema = new mongoose.Schema({
  bgBanner: {
    type: String,
    trim: true
  },
  uploadBoxPic: {
    type: String,
    trim: true
  },
  ruleBg: {
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
    trim: true,
    ref: 'User'
  },
  // 发布日期
  // 发布日期
  create_at: { type: Date, default: Date.now },
  // 最后修改日期
  // 最后修改日期
  update_at: { type: Date, default: Date.now },
  // 其他元信息
  meta: {
    views: { type: Number, default: 0 }, // 浏览数
    likes: { type: Number, default: 0 }, // 喜欢数
    comments: { type: Number, default: 0 } // 评论数
  }
});
// 转化成普通 JavaScript 对象
activity_schema.set('toObject', { getters: true });
// 翻页 + 自增ID插件配置
activity_schema.plugin(mongoosePaginate);
activity_schema.plugin(autoIncrement.plugin, {
  model: 'Activity',
  field: 'id',
  startAt: 4,
  incrementBy: 1
});
export default mongoose.model<IActivity>('Activity', activity_schema);
