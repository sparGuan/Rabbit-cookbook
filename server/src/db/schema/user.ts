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
  friends: IUser[]
  tenancyName: string
  nickName: string
  openid: string
  passWord: string
  headImg: string
  headBgImg: string
  sex: string
  Mobile: string
  createTime: Date
  updateTime: Date // 更新时间，作用于每次用户进入界面更新报废时长和更新当前位置
  currentPosition: ICurrentPosition, // 当前位置信息
  loginTime: Date
  logoutTime: Date
  expiredTime: number // 报废时长
  descPerson: string // 个人描述
}
interface ICurrentPosition {
  longitude: string,
  latitude: string
}
const user_schema: mongoose.Schema = new mongoose.Schema({
  friends: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  ],
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
    type: String,
    trim: true
  },
  Mobile: {
    type: String,
    trim: true
  },
  descPerson: {
    type: String,
    trim: true
  },
  currentPosition: {
    longitude: { type: String, trim: true },
    latitude: { type: String, trim: true }
  },
  createTime: { type: Date, default: Date.now },
  loginTime: { type: Date, default: Date.now },
  logoutTime: { type: Date, default: '' },
  updateTime: {type: Date, default: Date.now},
  expiredTime: Number
})
// 转化成普通 JavaScript 对象
user_schema.set('toObject', { getters: true })
export default mongoose.model<IUser>('User', user_schema)
