/**
 * 作者：as15099883651@136.com
 * 时间：2018-6-7
 * 描述：APP 全局业务逻辑
 * 用户信息存取
 * 更新软件
 */
export default {
	//判断当前用户信息是否登录
	isLogin() {
		if (this.getLoginUserInfo().token) {
			// 在此处更新登录信息：token，时间，位置信息
			return true
		}
		return false
	},
	//获取站点本地存储信息
	// 这个是获取旧的用户信息
	getSiteLocalStorage() {
		let _site_local_storage = app.utils.localStorage("siteLocalStorage");
		if (_site_local_storage) {
			try {
				_site_local_storage = JSON.parse(_site_local_storage);
			} catch (e) {
				app.log.error(e);
			}
		}
		if (
			_site_local_storage == null ||
			typeof _site_local_storage != "object"
		) {
			_site_local_storage = {};
		}
		return _site_local_storage;
	},
	//获取启动项标志
	getStartFlag() {
		//如果不是app始终返回true
		if (!app.Config.isApp) {
			return true
		}
		const _site_local_storage = app. globalService.getSiteLocalStorage()
		if (_site_local_storage.startInfo) {
			return (
				_site_local_storage.startInfo.flag === true &&
				_site_local_storage.startInfo.version ===
					app.Config.startVersion
			)
		}
		return false
	},

	//设置启动项标志
	setStartFlag(flag) {
		const _site_local_storage = app. globalService.getSiteLocalStorage()
		if (
			_site_local_storage.startInfo == null ||
			typeof _site_local_storage.startInfo != 'object'
		) {
			_site_local_storage.startInfo = {}
		}
		Object.assign(_site_local_storage.startInfo, {
			flag: flag,
			version: app.Config.startVersion
		})
		app.utils.localStorage(
			'siteLocalStorage',
			JSON.stringify(_site_local_storage)
		)
	},

	//获取用户登录的Token信息
	getLoginUserInfo() {	
		const [_currentTime, _userInfo] = [
			new Date().getTime(),
			app.globalService.getSiteLocalStorage().userInfo || {}
		]
		if (_userInfo.expiredTime && _userInfo.expiredTime - _currentTime > 0) {
			return _userInfo
		} else {
			app.globalService.setUserInfo({})
			return {}
		}
	},

	//退出登录
	logOut() {
		app.globalService.setUserInfo({})
	},

	//设置用户信息
	// tenancyName
	// token 将用户信息加以base64编码返回前台的认证
	// openid
	// expiredTime
	setUserInfo({
		_id,
		socketId,
		nickName,
		sex,
		friends,
		requestList,
		descPerson,
		headBgImg,
		openid, // 三方登录id
		tenancyName, // 第三方登录名称
		token, // 将用户信息加以base64编码返回前台的认证
		location,
		updateTime,
		Mobile, // 用户名或者邮箱
		headImg,// 头像
		expiredTime = -1 // 是否过期 -- 过期时间的意思是从数据库里面获取一个过期时间，如果有就获取，如果没有就生成一个，算是第一次登录
	}) {
		console.log(_id)
		if (expiredTime > 0) {
			// 如果登录没有过期
			const _site_local_storage = app.globalService.getSiteLocalStorage()
			if (
				_site_local_storage.userInfo === null ||
				typeof _site_local_storage.userInfo !== 'object'
			) {
				_site_local_storage.userInfo = {}
			}
			if (friends ) {
				friends.forEach( item => {
					if (typeof item === 'object') {
						item.headImg = app.getResourceUrl(item.headImg)
					}
				})
			}
			if (requestList && requestList.length > 0) {
				requestList.forEach(element => {
					if (element.headImg) {
						element.headImg = app.getResourceUrl(element.headImg )
					} else {
						element.headImg = require('@/imgs/userCenter/touxiangDefault.png')
					}
				});
			}
			expiredTime = new Date().getTime() + (expiredTime - 60) * 1000 // 重新设置一个登录过期时间
			const userInfo = _site_local_storage.userInfo = Object.assign(_site_local_storage.userInfo, {
				_id,
				socketId,
				nickName,
				sex,
				descPerson,
				headBgImg: app.getResourceUrl(headBgImg),
				openid,
				friends,
				requestList,
				tenancyName,
				token,
				Mobile,
				location,
				updateTime,
				expiredTime,
				headImg: app.getResourceUrl(headImg),
				version: app.Config.innerVersion // 版本号
			})
			console.log(userInfo)
			app.utils.localStorage(
				'siteLocalStorage',
				JSON.stringify(_site_local_storage)
			)
			return userInfo
		} else {
			// 如果登录过期了
			//如果登录过期就清空缓存数据
			app.utils.localStorage('siteLocalStorage', '{}')
		}
	},

	//app更新升级 TODO: 需要根据实际的业务数据调整 by yujinjin
	updateApp() {
		//mui.os.plus && !mui.os.stream && mui.plusReady(update);
		app.ajax({
			url: '', //更新URL
			data: {
				appid: plus.runtime.appid,
				version: plus.runtime.version,
				imei: plus.device.imei
			},
			success: function(data) {
				if (data.status) {
					plus.nativeUI.confirm(
						data.note,
						function(event) {
							if (0 == event.index) {
								plus.runtime.openURL(data.url)
							}
						},
						data.title,
						['立即更新', '取　　消']
					)
				}
			}
		})
	}
}
