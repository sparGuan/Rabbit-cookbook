/**
 * 作者：yujinjin9@126.com
 * 时间：2015-08-04
 * 描述：用户中心API接口
 * 所有业务命名规范》使用queryxxxinfo
 */
import app from '../../app';
define(() => {
	return {
		forgetPwd: ajaxOptions =>
			app.ajax(
				window.app.mui.extend(
					{
						url: '/api/forgetPwd'
					},
					ajaxOptions
				)
			),
		msgValid: ajaxOptions =>
			app.ajax(
				window.app.mui.extend(
					{
						url: '/api/msgValid'
					},
					ajaxOptions
				)
			),
		useMobileLogin: ajaxOptions =>
			app.ajax(
				window.app.mui.extend(
					{
						url: '/api/useMobileLogin'
					},
					ajaxOptions
				)
			),
		//登录用户
		login: ajaxOptions => {
			return app.ajax(
				window.app.mui.extend(
					{
						url: '/api/login'
					},
					ajaxOptions
				)
			);
		},
		//使用微信qq登录
		useWxOrQQLogin: ajaxOptions => {
			return app.ajax(
				window.app.mui.extend(
					{
						url: '/api/useWxOrQQLogin'
					},
					ajaxOptions
				)
			);
		},
		updateUserInfo: ajaxOptions => {
			return app.ajax(
				window.app.mui.extend(
					{
						url: '/api/updateUserInfo',
						cache: false,
						processData: false,
						contentType: false
					},
					ajaxOptions
				)
			);
		},
		// register注册
		register: ajaxOptions => {
			return app.ajax(
				window.app.mui.extend(
					{
						url: '/api/register'
					},
					ajaxOptions
				)
			);
		},
		//查询用户基本信息
		queryUserInfo: ajaxOptions => {
			return app.ajax(
				window.app.mui.extend(
					{
						url: '/api/info'
					},
					ajaxOptions
				)
			);
		}
	};
});
