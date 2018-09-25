import mongoose = require('mongoose');
import { IUser } from './user';
/**
 * 用户模型
 * @param {IUser} acceptUser 被请求的用户
 * @param {IUser} User 发送聊天请求的用户
 * @param {any[]} acceptUserMsg 发送消息
 * @param {any[]} UserMsg 发送消息
 * @param {Date} time  时间
 **/
// 要做到客户发送一条数据，存储一条数据到数据库
export interface IChatOne extends mongoose.Document {
  acceptUser: IUser;
  user: IUser;
  Meta: IMeta[];
  create_at: Date;
  // 最后修改日期
  update_at: Date;
}
export interface IMeta {
  user: IUser;
  message: any;
  UserMsgDate: Date;
}
const chatOne_schema: mongoose.Schema = new mongoose.Schema({
  acceptUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  Meta: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }, // 发送信息的用户
      message: { type: Object, default: '' }, // 发送的消息
      UserMsgDate: { type: Date, default: Date.now } // 时间
    }
  ],
  create_at: {
    type: Date,
    default: Date.now
  },
  update_at: {
    type: Date,
    default: Date.now
  }
});
// 转化成普通 JavaScript 对象
chatOne_schema.set('toObject', { getters: true });
export default mongoose.model<IChatOne>('ChatOne', chatOne_schema);
