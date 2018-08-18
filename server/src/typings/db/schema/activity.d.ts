import mongoose = require('mongoose');
/**
 * 用户模型
 * @param {String} bgActivity 首图背景
 * @param {String} spacingFirst 首图背景间隙
 * @param {String} titleBoxPic 标题图
 * @param {String} introduce 介绍内容
 * @param {Date} rule  规则
 * @param {Date} userId  用户ID
 * */
interface Activity extends mongoose.Document {
    bgActivity: string;
    spacingFirst: string;
    titleBoxPic: string;
    introduce: string;
    rule: string;
    userId: string;
    meta: IMeta;
}
export interface IMeta {
    views: number;
    likes: number;
    comments: number;
}
declare const _default: mongoose.PaginateModel<Activity>;
export default _default;
