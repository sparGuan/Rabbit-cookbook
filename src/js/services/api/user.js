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
						url: '/api/login/forgetPwd'
					},
					ajaxOptions
				)
			),
		msgValid: ajaxOptions =>
			app.ajax(
				window.app.mui.extend(
					{
						url: '/api/login/msgValid'
					},
					ajaxOptions
				)
			),
		useMobileLogin: ajaxOptions =>
			app.ajax(
				window.app.mui.extend(
					{
						url: '/api/login/useMobileLogin'
					},
					ajaxOptions
				)
			),
		//登录用户
		login: ajaxOptions => {
			return app.ajax(
				window.app.mui.extend(
					{
						url: '/api/login/login'
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
						url: '/api/login/useWxOrQQLogin'
					},
					ajaxOptions
				)
			);
		},
		updateUserInfo: ajaxOptions => {
			return app.ajax(
				window.app.mui.extend(
					{
						url: '/api/login/updateUserInfo',
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
						url: '/api/login/register'
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
						url: '/api/login/info'
					},
					ajaxOptions
				)
			);
		}
	};
});
