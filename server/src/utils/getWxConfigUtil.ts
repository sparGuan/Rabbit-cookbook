import { resolve } from 'bluebird';
const axios = require('axios');
import { wx } from '../config/index';
const bluebird = require('bluebird');
const bcrypt = bluebird.promisifyAll(require('bcryptjs'), { suffix: '$' });
/**
 * @default 获取微信js-sdk的token和ticket
 */
class WxConfigUtil {
  private access_token = '';
  private ticket = '';
  private saltRounds = 5;
  public async getToken() {
    await axios
      .get(
        `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${
          wx.appId
        }&secret=${wx.secret}`
      )
      .then((res: any) => {
        this.access_token = res.data.access_token;
        resolve();
        // 这个异步回调里可以获取access_token
      })
      .catch((error: any) => {
        console.log(error);
      });
    if (!global._.isEmpty(this.access_token)) {
      return this.access_token;
    } else {
      return '';
    }
  }
  public async getTicket(token: any) {
    await axios
      .get(
        `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${token}&type=jsapi`
      )
      .then((res: any) => {
        this.ticket = res.data.ticket;
        resolve();
        // 这个异步回调里可以获取access_token
      });
    if (!global._.isEmpty(this.ticket)) {
      return this.ticket;
    } else {
      return '';
    }
  }
  // noncestr
  public createNonceStr(): string {
    return Math.random()
      .toString(36)
      .substr(2, 15);
  }

  // timestamp
  public createTimeStamp(): string {
    return String(new Date().getTime() / 1000);
  }
  // 计算签名方法
  /**
   * @description 实现传入参数返回签名
   * @param {ticket} String ticket
   * @param {noncestr} String noncestr
   * @param {ts} String 时间戳
   * @param {url} String 再传入调用该函数的url
   * 最终生成签名
   */
  // 调用方式// var signature = calcSignature(ticket, noncestr, timestamp, url);
  public async calcSignature(
    ticket: any,
    noncestr: string,
    ts: string,
    url: string
  ) {
    const str =
      'jsapi_ticket=' +
      ticket +
      '&noncestr=' +
      noncestr +
      '&timestamp=' +
      ts +
      '&url=' +
      url;
    const salt = await bcrypt.genSalt$(this.saltRounds);
    const saltObj = await bcrypt.hash$(str, salt);
    return saltObj;
  }
}
export default new WxConfigUtil();
