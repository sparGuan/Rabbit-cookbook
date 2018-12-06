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
		saveFootprint: ajaxOptions => {
			return app.ajax(
				window.app.mui.extend(
					{
						url: '/api/footprint/saveFootprint'
					},
					ajaxOptions
				)
			);
		},
		//查询用户基本信息
		queryFootPrintList: ajaxOptions => {
			return app.ajax(
				window.app.mui.extend(
					{
						url: '/api/footprint/queryFootPrintList'
					},
					ajaxOptions
				)
			);
		}
	};
});
