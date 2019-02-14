/**
 * 作者：yujinjin9@126.com
 * 时间：2015-08-04
 * 描述：订单API接口
 */
import app from '../../app';
define(() =>{
	return {
		// 保存一条足迹
		/**
		 * @param {object} 动态
		 */
		queryAllSongs: ajaxOptions => {
			return app.ajax(
				window.app.mui.extend(
					{
						url: '/api/music/queryAllSongs'
					},
					ajaxOptions
				)
			);
		},
		searchMusic: ajaxOptions =>  {
			return app.ajax(
				window.app.mui.extend(
					{
						url: '/api/music/searchMusic'
					},
					ajaxOptions
				)
			);
		},
		joinPlayList: ajaxOptions =>  {
			return app.ajax(
				window.app.mui.extend(
					{
						url: '/api/music/joinPlayList'
					},
					ajaxOptions
				)
			);
		}
	};
});
