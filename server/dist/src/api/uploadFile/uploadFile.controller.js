"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DirExistUtils_1 = require("../../utils/DirExistUtils");
const index_1 = require("../../config/index");
const fs = require("fs");
const path = require("path");
class UploadFile {
    upload() {
        return async (ctx) => {
            // 让异步变同步
            // const tmpdir = os.tmpdir() //创建临时文件夹
            const files = ctx.request.files || {}; // koa-body 解析上传的图片
            const filePaths = [];
            for (const key in files) {
                // path
                const file = files[key];
                // 获取文件后缀
                if (!global._.isEmpty(file)) {
                    const ext = DirExistUtils_1.default.getUploadFileExt(file.name);
                    // 最终要保存到的文件夹目录
                    const dirName = DirExistUtils_1.default.getUploadDirName();
                    const dir = path.join(__dirname, '../../', `public/upload/${dirName}`);
                    // 检查文件夹是否存在如果不存在则新建文件夹
                    DirExistUtils_1.default.checkDirExist(dir);
                    // 获取文件名称
                    const fileName = DirExistUtils_1.default.getUploadFileName(ext);
                    const filePath = `${dir}/${fileName}`;
                    // 里面有内容 读取流打开
                    const reader = fs.createReadStream(file.path);
                    // filepath 目的地有了 等内容 写入流（先创建文件）
                    const writer = fs.createWriteStream(filePath);
                    reader.pipe(writer); // 将图片的内容pipe通过管道 放入创建的文件
                    filePaths.push(`${index_1.webSourceDoMain}/${filePath}`);
                }
            }
            ctx.body = {
                message: index_1.statusCode.success,
                filePaths
            };
        };
    }
}
exports.default = new UploadFile();
//# sourceMappingURL=uploadFile.controller.js.map