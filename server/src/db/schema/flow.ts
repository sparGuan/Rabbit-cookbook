import mongoose = require('mongoose');
import { IUser } from './user'
/**
 * 实现业务：关注
 *  关注用户发表
 */
export declare interface IFlow extends mongoose.Document {
  user: IUser; // 用户
  acceptUser: IUser; // 我关注的用户
  create_at: Date;
  // 最后修改日期
  update_at: Date;
  // 链接类型 ===》 图文链接或者视频链接 ===> 获取的不一样 ===》 因为要展示的样式不一样
  sourceDataType: number; // 数据类型 0:用户转发到分享大厅的关注<动态关注> ===>关注的数据类型
  sourceDataId: string // 该数据类型id ====》 关注的数据类型的id
}
const flow_schema: mongoose.Schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  acceptUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  // 发布日期
  create_at: { type: Date, default: Date.now },
  // 最后修改日期
  update_at: { type: Date, default: Date.now },
  // 其他元信息
  sourceDataType: {
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
flow_schema.set('toObject', { getters: true });
export default mongoose.model<IFlow>('Flow', flow_schema);
