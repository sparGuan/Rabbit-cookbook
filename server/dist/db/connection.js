"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 数据库连接
const mongoose = require("mongoose");
const index_1 = require("../config/index");
exports.db = mongoose;
exports.default = async () => new Promise((resolve, reject) => {
    mongoose.connect(index_1.connexionString, {
        useMongoClient: true
    }, (error) => {
        if (error) {
            (() => {
                console.log('fail to connect mongodb');
                resolve();
            })();
            reject(error.message);
        }
        else {
            (() => {
                console.log('success to connect mongodb');
                resolve();
            })();
        }
    });
});
//# sourceMappingURL=connection.js.map