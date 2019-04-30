import mongoose = require('mongoose');
/**
 * 实现业务：存储爬取的美食天下的类别
 */
export declare interface IDatavMeishichinaType extends mongoose.Document {
    name: string; // 类别名称
    href: string // 趴回来的类别的href
}

const datav_meishichina_type_schema: mongoose.Schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    index: true
  },
  href: {
    type: String,
    trim: true,
    unique: true,
    index: true
  }
},
{versionKey: false, timestamps: true}
)
// 转化成普通 JavaScript 对象
datav_meishichina_type_schema.set('toObject', { getters: true });
export default mongoose.model<IDatavMeishichinaType>('DatavMeishichinaType', datav_meishichina_type_schema);
