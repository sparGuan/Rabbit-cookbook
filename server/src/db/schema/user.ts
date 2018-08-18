import mongoose = require('mongoose')

/**
 * 用户模型
 * @param {String} name 昵称
 * @param {String} password 密码
 * @param {String} createTime 创建日期
 * @param {String} token 标记  将用户信息加以base64编码返回前台的认证
 * @param {Date} expiredTime  * expiredTime--失效时间
 * */
export interface IUser extends mongoose.Document {
  friendIds: string[]
  tenancyName: string
  nickName: string
  openid: string
  passWord: string
  headImg: string
  headBgImg: string
  sex: number
  Mobile: boolean
  createTime: Date
  loginTime: Date
  logoutTime: Date
  expiredTime: number
  descPerson: string
}
const user_schema: mongoose.Schema = new mongoose.Schema({
  friendIds: {
    type: Array
  },
  tenancyName: {
    type: String,
    trim: true
  },
  nickName: {
    type: String,
    trim: true
  },
  openid: {
    type: String,
    trim: true
  },
  passWord: {
    type: String,
    trim: true
  },
  headImg: {
    type: mongoose.Schema.Types.Mixed,
    trim: true
  },
  headBgImg: {
    type: mongoose.Schema.Types.Mixed,
    trim: true
  },
  sex: {
    type: Number
  },
  Mobile: {
    type: String,
    trim: true
  },
  descPerson: {
    type: String,
    trim: true
  },
  createTime: { type: Date, default: Date.now },
  loginTime: { type: Date, default: Date.now },
  logoutTime: { type: Date, default: '' },
  expiredTime: Number
})
// 转化成普通 JavaScript 对象
user_schema.set('toObject', { getters: true })
export default mongoose.model<IUser>('User', user_schema)
