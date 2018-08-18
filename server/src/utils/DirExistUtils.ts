/**
 * @description 判断文件夹是否存在 如果不存在则创建文件夹
 * 操作文件的utils
 */
import fs = require('fs');
import path = require('path');
class DirExistUtils {
  public checkDirExist(p: string) {
    if (!fs.existsSync(p)) {
      fs.mkdirSync(p);
    }
  }
  public getUploadDirName(): string {
    const date = new Date();
    const month: number = (date.getMonth() as number) + 1;
    const monthStr: string =
      month.toString().length > 1 ? month.toString() : `0${month}`;
    const dir = `${date.getFullYear()}${monthStr}${date.getDate()}`;
    return dir;
  }
  public getUploadFileExt(name: string): string {
    return name.substring(name.lastIndexOf('.') + 1);
  }
  public getUploadFileName(ext: string): string {
    return `${Date.now()}${(Math.random() as number) * 10000}.${ext}`;
  }
  /**
   * 返回对象路径的上传文件方法
   * @param {File} files
   * @param {string}
   */
  public async uploadFileCommon(files: any): Promise<any> {
    const filePaths: any = {};
    for (const key in files) {
      // path
      const file = files[key];
      // 获取文件后缀
      if (!global._.isEmpty(file)) {
        const ext = this.getUploadFileExt(file.name);
        // 最终要保存到的文件夹目录
        const dirName = this.getUploadDirName();
        const dir = path.join(
          __dirname,
          '../../',
          `src/public/upload/${dirName}`
        );
        // 检查文件夹是否存在如果不存在则新建文件夹
        this.checkDirExist(dir);
        // 获取文件名称
        const fileName = this.getUploadFileName(ext);
        const filePath = `${dir}/${fileName}`;
        const uploadPath = `${dirName}/${fileName}`; // 反向代理服务器路径
        // 里面有内容 读取流打开
        const reader = await fs.createReadStream(file.path);
        // filepath 目的地有了 等内容 写入流（先创建文件）
        const writer = await fs.createWriteStream(filePath);
        await reader.pipe(writer); // 将图片的内容pipe通过管道 放入创建的文件
        filePaths[key] = uploadPath
      }
    }
    return filePaths;
  }
}
export default new DirExistUtils();
