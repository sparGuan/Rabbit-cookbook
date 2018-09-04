import mongoose = require('mongoose')
import { IUser } from './user'
/**
 * 评论模型
 * @param {String} user 发表评论的用户
 * @param {String} content 评论内容
 * @param {Date} createTime 创建日期
 * */
export interface IDynamicComment extends mongoose.Document {
  user: IUser
  content: string
  createTime: Date
}
const dynamic_comment_schema: mongoose.Schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String,
    trim: true
  },
  createTime: { type: Date, default: Date.now }
})
// 转化成普通 JavaScript 对象
dynamic_comment_schema.set('toObject', { getters: true })
export default mongoose.model<IDynamicComment>('DynamicComment', dynamic_comment_schema)
