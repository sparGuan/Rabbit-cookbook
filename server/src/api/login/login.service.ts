import DirExistUtils from '../../utils/DirExistUtils';
import getDateAfter from '../../utils/getDateAfter';
import User, { IUser } from '../../db/schema/user';
import { qsms, statusCode } from '../../config/index';
const bluebird = require('bluebird');
const { isValid } = require('mongoose').Types.ObjectId;
const bcrypt = bluebird.promisifyAll(require('bcryptjs'), { suffix: '$' });
import Qsms = require('qcloudsms_js');
import formidable = require('formidable');
export default class LoginService {
  private qsms: any;
  private user: IUser;
  private userInfo: any;
  private saltRounds = 5;
  private message: string;
  private valid: string;
  constructor() {
    this.qsms = new Qsms(qsms.appid, qsms.appkey);
  }
  public async msgValidService(body: any) {
    try {
      this.user = (await User.findOne({ Mobile: body.Mobile })) as IUser;
      // 如果是注册用户就要进入该判断
      if (!global._.isEmpty(this.user) && body.register === true) {
        // 如果存在

        return this.message = '该手机号已经被注册';
      }
      this.valid = global._.random(999999);
      const smsType = 0; // Enum{0: 普通短信, 1: 营销短信}
      const ssender = this.qsms.SmsSingleSender();
      await ssender.send(
        smsType,
        86,
        body.Mobile,
        `您的验证码${this.valid}，此验证码10分钟内有效，请勿向他人泄露`,
        '',
        '',
        () => ({})
      );
      return this.valid
    } catch (error) {
      throw error
    }
  }
}
