// 数据库连接
import mongoose = require('mongoose')
import { connexionString } from '../config/index'
const bluebird = require('bluebird')
// 注意下面这句
export const db = mongoose
export default async () => new Promise((resolve, reject) => {
    mongoose.connect(connexionString, {
        useMongoClient: true
    }, (error: any) => {
        if (error) {
            (() => {
                console.log('fail to connect mongodb')
                resolve()
            })()
            reject(error.message)
        } else {
            (() => {
                console.log('success to connect mongodb')
                mongoose.Promise = bluebird;
                resolve()
            })()
        }
    })
})
