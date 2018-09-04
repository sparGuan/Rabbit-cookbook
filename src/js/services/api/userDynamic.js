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
		// 保存该条动态下的评论
		saveDynamicComment: ajaxOptions => {
			return app.ajax(
				window.app.mui.extend(
					{
						url: '/api/dynamic/saveDynamicComment'
					},
					ajaxOptions
				)
			);
		},
	//	查询当前用户以及所有朋友发表的最新动态数据
		queryUserAndFriendsDynamic: ajaxOptions => {
			return app.ajax(
				window.app.mui.extend(
					{
						url: '/api/dynamic/queryUserAndFriendsDynamic'
					},
					ajaxOptions
				)
			);
		}
	};
});
