import mongoose = require('mongoose');
import { IUser } from './user'
/**
 * 实现业务：用户音乐库
 *  关注用户发表
 */
export declare interface IMusic extends mongoose.Document {
  user: IUser; // 用户
  // 最后修改日期
  update_at: Date;
  // 歌单信息元
  play_list: IMeta [];
}
// 歌单信息元
export interface IMeta {
  musicId: string; // 歌曲的id
  src: string; // vedio路径
  imageurl: string; // 图片路径
  name: string; // 歌名
  singer: string; // 歌手
}
const music_schema: mongoose.Schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  play_list: [
    {
      musicId: {type: String, trim: true, require: true},
      src: { type: String, trim: true, require: true }, // 浏览数
      imageurl: { type: String, trim: true, require: true }, // 喜欢数
      name: {type: String, trim: true, require: true},
      singer: { type: String, trim: true, require: true } // 评论数
    }
  ],
  // 发布日期
  create_at: { type: Date, default: Date.now },
  // 最后修改日期
  update_at: { type: Date, default: Date.now }
})
// 转化成普通 JavaScript 对象
music_schema.set('toObject', { getters: true });
export default mongoose.model<IMusic>('Music', music_schema);
