/**
 * 作者：yujinjin9@126.com
 * 时间：2015-08-04
 * 描述：订单API接口
 */
import app from '../../app';
define(() =>{
	return {
		/**
		 * @param {object} 美食
		 */
		queryDavavMeishiChinaList: ajaxOptions => {
			return app.ajax(
				window.app.mui.extend(
					{
						url: '/api/datav/queryDavavMeishiChinaList'
					},
					ajaxOptions
				)
			);
    },
    /**
		 * @param {object} 美食分类
		 */
		queryDatavMeishichinaTypeList: ajaxOptions => {
			return app.ajax(
				window.app.mui.extend(
					{
						url: '/api/datav/queryDatavMeishichinaTypeList'
					},
					ajaxOptions
				)
			);
    },
    /**
		 * @param {object} 美食搜索
		 */
		querySearchDatavMeishichina: ajaxOptions => {
			return app.ajax(
				window.app.mui.extend(
					{
						url: '/api/datav/querySearchDatavMeishichina'
					},
					ajaxOptions
				)
			);
		}
	};
});
