/**
 * 作者：yujinjin9@126.com
 * 时间：2015-08-04
 * 描述：订单API接口
 */
import app from '../../app';
define(() =>{
	return {
		//上传更新活动业务
		getCityWeather: ajaxOptions => {
			return app.ajax(
				window.app.mui.extend(
					{
            url: 'http://api.map.baidu.com/telematics/v3/weather',
            dataType: "jsonp",
					},
					ajaxOptions
				)
			);
		},
	};
});
