    /**
 * 作者：spar
 * 时间：2019-03-12
 * 描述：授权
 */
import app from '../../app';

define(() =>{
	return {
		// 保存用户认证信息
		saveAuthentication: ajaxOptions => {
			return app.ajax(
				window.app.mui.extend(
					{
						url: '/api/auth/saveAuthentication'
					},
					ajaxOptions
				)
			);
    }
	};
});
