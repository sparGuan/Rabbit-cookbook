import mongoose = require('mongoose');
import { IUser } from './user'
import { IDatavMeishichinaType } from './datavMeishichinaType'
/**
 * 实现业务：定时爬取美食天下数据到本地数据库
 */
export declare interface IDatavMeishichina extends mongoose.Document {
    type: IDatavMeishichinaType, // 类别 ====> 具体参照类别表
    href: string, // 版本控制器，已经爬取的子链接放进里面，就不再进行二次爬取
    big_image: string; // 大图片
    images: string[]; // 小图
    name: string; // 菜品名称
    taste: string; // 味道
    source: ISource; // 出处
    cook_time: string // 烹饪时间
    material: string; // 准备材料
    practice: string []; // 做法
    purchase_details: IStuff[] // 材料详细
}
export interface ISource {
  user: IUser; // 来自用户的分析
  website: string; // 来自网站的分享
  other: string; // 其他
  introduction: string // 引言
}
export interface IStuff {
  name: string; // 材料名称
  num: string; // 数量
  type: number; // 材料类型： 0主料，1辅料
  addr: string; // 材料距离当前位置最近距离
  price: string; // 材料价格
}

const datavMeishichina_schema: mongoose.Schema = new mongoose.Schema({
  type: { type: mongoose.Schema.Types.ObjectId, ref: 'DatavMeishichinaType', required: true, default: null },
  href: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  big_image: {
    type: String,
    trim: true
  },
  images: {
      type: Array,
      trim: true
  },
  name: {
      type: String,
      trim: true,
      unique: true,
      index: true
  },
  source: {
    type: Object,
    default: {}
  },
  taste: {
    type: String,
    default: ''
  },
  cook_time: {
    type: String,
    default: ''
  },
  material: {
    type: String,
    trim: true
  },
  practice: {
    type: Array,
    default: []
  },
  purchase_details: {
    type: Array,
    default: []
  }
},
{versionKey: false, timestamps: true}
)
// 转化成普通 JavaScript 对象
datavMeishichina_schema.set('toObject', { getters: true });
export default mongoose.model<IDatavMeishichina>('DatavMeishichina', datavMeishichina_schema);
