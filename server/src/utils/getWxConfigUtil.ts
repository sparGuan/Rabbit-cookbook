import { resolve } from 'bluebird';
const axios = require('axios');
const jsSHA = require('jssha')
import { wx } from '../config/index';

/**
 * @default 获取微信js-sdk的token和ticket
 */
class WxConfigUtil {	
	async getToken() {
		return await axios
			.get(
				`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${wx.appId}&secret=${wx.secret}`
			)
			.then((res: any) => {
				resolve(res);
				// 这个异步回调里可以获取access_token
			})
			.catch((error: any) => {
				console.log(error);
			});
	}
	async getTicket(token: any) {
		return await axios.get(
			`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${token}&type=jsapi`
		).then((res: any) => {
			resolve(res);
			// 这个异步回调里可以获取access_token
		});
  }
   // noncestr
   createNonceStr ():string {
    return Math.random().toString(36).substr(2, 15);
  };

  // timestamp
  createTimeStamp ():string {
    return String(new Date().getTime() / 1000);
	};
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
	calcSignature  (ticket: any, noncestr: string, ts: string, url: string) {
		var str = 'jsapi_ticket=' + ticket + '&noncestr=' + noncestr + '&timestamp='+ ts +'&url=' + url;
		const shaObj = new jsSHA(str, 'TEXT');
		return shaObj.getHash('SHA-1', 'HEX');
	}
}
export default new WxConfigUtil()
