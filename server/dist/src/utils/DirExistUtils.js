"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description 判断文件夹是否存在 如果不存在则创建文件夹
 * 操作文件的utils
 */
const fs = require("fs");
const path = require("path");
const index_1 = require("../config/index");
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
    uploadFileCommon(files, filePaths) {
        for (const key in files) {
            // path
            const file = files[key];
            // 获取文件后缀
            if (!global._.isEmpty(file)) {
                const ext = this.getUploadFileExt(file.name);
                // 最终要保存到的文件夹目录
                const dirName = this.getUploadDirName();
                const dir = path.join(__dirname, '../../', `public/upload/${dirName}`);
                // 检查文件夹是否存在如果不存在则新建文件夹
                this.checkDirExist(dir);
                // 获取文件名称
                const fileName = this.getUploadFileName(ext);
                const filePath = `${dir}/${fileName}`;
                // 里面有内容 读取流打开
                const reader = fs.createReadStream(file.path);
                // filepath 目的地有了 等内容 写入流（先创建文件）
                const writer = fs.createWriteStream(filePath);
                reader.pipe(writer); // 将图片的内容pipe通过管道 放入创建的文件
                filePaths.push(`${index_1.webSourceDoMain}/${filePath}`);
            }
        }
        return filePaths;
    }
}
exports.default = DirExist;
//# sourceMappingURL=DirExistUtils.js.map