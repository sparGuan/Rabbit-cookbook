import mongoose = require('mongoose');
import { IUser } from './user'
/**
 * 实现业务：定时爬取数据到本地数据库
 */
export declare interface IDatav extends mongoose.Document {
    big_image: string; // 大图片
    images: string[]; // 小图
    name: string; // 菜品名称
    taste: string; // 味道
    source: ISource []; // 出处
    cook_time: number // 烹饪时间
    material: string; // 准备材料
    practice: string; // 做法
    purchase_details: IStuff[] // 材料详细
}
export interface ISource {
  user: IUser; // 来自用户的分析
  website: string; // 来自网站的分享
  other: string; // 其他
}
export interface IStuff {
  name: string; // 材料名称
  num: string; // 数量
  type: number; // 材料类型： 0主料，1辅料
  addr: string; // 材料距离当前位置最近距离
  price: string; // 材料价格
}

const datav_schema: mongoose.Schema = new mongoose.Schema({
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
      trim: true
  },
  source: {
    type: Array,
    trim: true
  },
  taste: {
    type: String,
    default: ''
  },
  cook_time: {
    type: Number,
    default: 0
  },
  material: {
    type: String,
    trim: true
  },
  practice: {
    type: String,
    trim: true
  },
  purchase_details: {
    type: Array,
    default: []
  }
},
{versionKey: false, timestamps: true}
)
// 转化成普通 JavaScript 对象
datav_schema.set('toObject', { getters: true });
export default mongoose.model<IDatav>('Datav', datav_schema);
