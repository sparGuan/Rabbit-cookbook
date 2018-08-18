"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description 判断文件夹是否存在 如果不存在则创建文件夹
 * 操作文件的utils
 */
const fs = require('fs');
class DirExist {
    checkDirExist(p) {
        if (!fs.existsSync(p)) {
            fs.mkdirSync(p);
        }
    }
    getUploadDirName() {
        const date = new Date();
        let month = date.getMonth() + 1;
        let monthStr = month.toString().length > 1 ? month.toString() : `0${month}`;
        const dir = `${date.getFullYear()}${monthStr}${date.getDate()}`;
        return dir;
    }
    getUploadFileExt(name) {
        let ext = name.split('.');
        return ext[ext.length - 1];
    }
    getUploadFileName(ext) {
        return `${Date.now()}${Math.random() * 10000}.${ext}`;
    }
}
exports.default = new DirExist();
//# sourceMappingURL=DirExistUtils.js.map