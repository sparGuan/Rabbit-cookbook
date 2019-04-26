import mongoose = require('mongoose');
import { db } from '../connection';
import { IUser } from './user';
/**
 * 用户模型
 * @param {String} id id
 * @param {String} ip ip
 * @param {String} os 型号
 * @param {String} environment 环境
 **/
export interface ISocket extends mongoose.Document {
    id: string;
    user: IUser; // 每一个用户对应多条动态
    ip: string;
    os: string;
    environment: string;
    create_at: Date;
    // 最后修改日期
    update_at: Date;
}
const socket_schema: mongoose.Schema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        index: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        ref: 'User'
    },
    ip: {
        type: String
    },
    os: {
        type: String,
        default: ''
    },
    environment: {
        type: String,
        default: ''
    },
},
{versionKey: false, timestamps: true}
);
// 转化成普通 JavaScript 对象
socket_schema.set('toObject', { getters: true });
export default mongoose.model<ISocket>('Socket', socket_schema);
