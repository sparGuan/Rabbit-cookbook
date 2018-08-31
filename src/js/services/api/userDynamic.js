/**
 * 作者：yujinjin9@126.com
 * 时间：2015-08-04
 * 描述：订单API接口
 */
import app from '../../app';
define(() =>{
	return {
		//上传更新活动业务
		saveDynamic: ajaxOptions => {
			return app.ajax(
				window.app.mui.extend(
					{
						url: '/api/dynamic/saveDynamic',
						cache: false,
						processData: false,
						contentType: false
					},
					ajaxOptions
				)
			);
		},
		//查询用户基本信息
		// queryUserActivityInfo: ajaxOptions => {
		// 	return app.ajax(
		// 		window.app.mui.extend(
		// 			{
		// 				url: '/api/queryUserActivityInfo'
		// 			},
		// 			ajaxOptions
		// 		)
		// 	);
		// }
	};
});
