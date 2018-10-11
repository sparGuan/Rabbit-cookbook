import { resolve } from 'bluebird';
const axios = require('axios');
import { wx } from '../config/index';
const jsSHA = require('jssha');
const crypto = require('crypto')
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
  public createTimeStamp(): number {
    return Date.now()
  }
  // 计算签名方法
  /**
   * @description 实现传入参数返回签名
   * @param {ticket} String ticket
   * @param {noncestr} String noncestr
   * @param {ts} String 时间戳
   * @param {url} String 再传入调用该函数的url
   * 最终生成签名
   */// 计算签名
  // 调用方式// const signature = calcSignature(ticket, noncestr, timestamp, url);
  public async calcSignature(
    ticket: any,
    noncestr: string,
    ts: number,
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
      // const shaObj = await new jsSHA(str, 'TEXT');
      // return shaObj.getHash('SHA-1', 'HEX');
      const signature = await this.sha1(str)
      console.log(signature)
      return signature
  }
  public async sha1(str: string) {
    const md5sum = await crypto.createHash("sha1");
    await md5sum.update(str);
    return md5sum.digest("hex");    
  }
  /**
   *  @param nonce,timestamp,signature 如果微信发过来的跟自己的匹配的上的话
   *  输出
   */
  public async validateToken(query: any) {    
    // console.log("*** URL:" + req.url);
    // console.log(query);
    const echostr = query.echostr;
    const signature = query.signature;    
    const timestamp = query['timestamp'];
    const nonce = query.nonce;
    const oriArray = new Array();
    oriArray[0] = nonce;
    oriArray[1] = timestamp;
    oriArray[2] = wx.token; //微信开发者中心页面里填的token
    oriArray.sort();
    const original = oriArray.join('');
    console.log("Original str : " + original);
    console.log("Signature : " + signature);
    const scyptoString = await this.sha1(original);
    if (signature === scyptoString) {
      // 返回铭文
      return echostr
    } else {
        return signature
    }
  }
}
export default new WxConfigUtil();
