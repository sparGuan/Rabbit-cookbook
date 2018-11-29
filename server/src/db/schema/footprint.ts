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
  title: string; // 足迹标题
  album: string []; // 足迹相册
  user: IUser; // 发布的用户
  comment: string; // 存在评论的足迹
  create_at: Date;
  // 最后修改日期
  update_at: Date;
  // 链接类型 ===》 图文链接或者视频链接 ===> 获取的不一样 ===》 因为要展示的样式不一样
  linkType: number;
  link: string; // 跳转链接打开内页
  footprintType: string; // 足迹类型 0动态发布 1 活动发布 2 QQ随机看点 3 官方发布 4广告发布
  insidePagesId: string// 内页ID ===> 作用于查找相对的内页
}
// 自增ID初始化
// 1. 是否是动态发布
// 2. 是否是活动发布出来的足迹
// 3. 是否是广告发布
// 4. 是否是官方发布
// 5. 少于10条足迹，从QQ看点随机搜索10条 ===》 难度 3star
autoIncrement.initialize(db.connection);
const footprint_schema: mongoose.Schema = new mongoose.Schema({
  title: {
    type: String,
    trim: true
  },
  album: {
    type: Array,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comment: {
    type: String,
    trim: true
  },
  // 发布日期
  // 发布日期
  create_at: { type: Date, default: Date.now },
  // 最后修改日期
  update_at: { type: Date, default: Date.now },
  // 其他元信息
  linkType: {
    type: String,
    trim: true
  },
  link: {
    type: String,
    trim: true
  },
  footprintType: {
    type: String,
    trim: true
  },
  insidePagesId: {
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
