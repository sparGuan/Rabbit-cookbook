/**
 * 作者：yujinjin9@126.com
 * 时间：2015-08-04
 * 描述：订单API接口
 */
import app from '../../app';
define(() =>{
	return {
		//上传更新活动业务
		loadPeopleNearBy: ajaxOptions => {
			return app.ajax(
				window.app.mui.extend(
					{
						url: '/api/friend/loadPeopleNearBy'
					},
					ajaxOptions
				)
			);
		},
		//查询用户基本信息
		addNewFriend: ajaxOptions => {
			return app.ajax(
				window.app.mui.extend(
					{
						url: '/api/friend/addNewFriend'
					},
					ajaxOptions
				)
			);
		},
		searchNewFriends: ajaxOptions => {
			return app.ajax(
				window.app.mui.extend(
					{
						url: '/api/friend/searchNewFriends'
					},
					ajaxOptions
				)
			);
		}
	};
});
