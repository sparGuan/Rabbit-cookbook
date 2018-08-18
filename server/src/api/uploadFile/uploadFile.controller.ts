import DirExistUtils from '../../utils/DirExistUtils';
import { statusCode } from '../../config/index';
class UploadFile {
  public upload() {
    return async (ctx: any) => {
      // 让异步变同步
      // const tmpdir = os.tmpdir() //创建临时文件夹
      const files = ctx.request.files || {}; // koa-body 解析上传的图片
      const filePathsArray: string[] = await DirExistUtils.uploadFileCommon(files);
      ctx.body = {
        message: statusCode.success,
        filePathsArray
      };
    };
  }
}
export default new UploadFile() as any;
