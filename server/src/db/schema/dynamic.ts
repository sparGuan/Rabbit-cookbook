import mongoose = require('mongoose');
import { db } from '../connection';
import mongoosePaginate = require('mongoose-paginate'); // 翻页插件
import autoIncrement = require('mongoose-auto-increment'); // id自增插件
/**
 * 动态发布模型
 * @param {String} speech 言论
 * @param {Array<string>} album  相册
 * @param {String} userId  用户ID
 **/
export interface IDynamic extends mongoose.Document {
  speech: string;
  album: string [];
  userId: string;
  // 其他元信息
  meta: IMeta;
}
export interface IMeta {
  totalPosts: number, // 帖子数
  totalCollection: number, // 收藏数
  totalShare: number, // 分享数
  totalDays: number, // 在线天数
  totalPraise: number // 赞数
}
// 自增ID初始化
autoIncrement.initialize(db.connection);
const dynamic_schema: mongoose.Schema = new mongoose.Schema({
  speech: {
    type: String,
    trim: true
  },
  album: {
    type: Array,
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    trim: true
  },
  mobileType: {
    type: Array,
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
    totalPosts: {type: Number, default: 0}, // 帖子数
    totalCollection: {type: Number, default: 0}, // 收藏数
    totalShare: {type: Number, default: 0}, // 分享数
    totalDays: {type: Number, default: 0}, // 在线天数
    totalPraise: {type: Number, default: 0} // 赞数
  }
});
// 转化成普通 JavaScript 对象
dynamic_schema.set('toObject', { getters: true });
// 翻页 + 自增ID插件配置
dynamic_schema.plugin(mongoosePaginate);
dynamic_schema.plugin(autoIncrement.plugin, {
  model: 'dynamic',
  field: 'id',
  startAt: 4,
  incrementBy: 1
});
export default mongoose.model<IDynamic>('dynamic', dynamic_schema);
