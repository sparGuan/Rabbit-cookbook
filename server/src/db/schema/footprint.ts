import mongoose = require('mongoose');
import { db } from '../connection';
import mongoosePaginate = require('mongoose-paginate'); // 翻页插件
import autoIncrement = require('mongoose-auto-increment'); // id自增插件
import { IUser } from './user'
/**
 * 实现业务：足迹
 * 足迹列表不存在赞 分享等操作，内页存在
 */
export declare interface IFootprint extends mongoose.Document {
  user: IUser; // 发布的用户
  create_at: Date;
  // 最后修改日期
  update_at: Date;
  // 链接类型 ===》 图文链接或者视频链接 ===> 获取的不一样 ===》 因为要展示的样式不一样
  linkType: number; // 2：有视频的类型; 0：单图文的类型; 1：纯文本的类型; 3：多图文灯箱的类型
  footprintType: number; // 足迹类型 0动态发布 1 活动发布  3 官方发布 4广告发布 --区别于不同的类型获取不同的数据结构
  sourceDataId: string// 内页ID ===> 作用于查找相对的内页 --->判断类型去获取Id，知道是哪张表
}
// 自增ID初始化
// 1. 是否是动态发布
// 2. 是否是活动发布出来的足迹
// 3. 是否是广告发布
// 4. 是否是官方发布
autoIncrement.initialize(db.connection);
const footprint_schema: mongoose.Schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  // 发布日期
  create_at: { type: Date, default: Date.now },
  // 最后修改日期
  update_at: { type: Date, default: Date.now },
  // 其他元信息
  linkType: {
    type: Number,
    trim: true
  },
  footprintType: {
    type: Number,
    trim: true
  },
  sourceDataId: {
    type: String,
    trim: true
  }
})
// 转化成普通 JavaScript 对象
footprint_schema.set('toObject', { getters: true });
// 翻页 + 自增ID插件配置
footprint_schema.plugin(mongoosePaginate);
footprint_schema.plugin(autoIncrement.plugin, {
  model: 'footprint',
  field: 'id',
  startAt: 1,
  incrementBy: 1
});
export default mongoose.model<IFootprint>('Footprint', footprint_schema);
