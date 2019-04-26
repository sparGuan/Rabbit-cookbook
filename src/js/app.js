/**
 * 作者：as15099883651@163.com
 * 时间：2018/6/7
 * 描述：app 核心框架
 *
 */
const site = {
  Config: {
    resourecePath: '', // 资源服务路径
    serverPath: '', // 服务路径
    version: '', // app版本
    releaseTime: '', // 发布时间
    isDebug: true, // 是否是前端调试状态
    innerVersion: '999.999.999', // 获得当前终端的版本号
    startVersion: '0.1.1', // app启动动画版本号
    isInsideApp: false, // 是否在APP应用环境内
    isWeiXin: false, // 是否在微信环境内
    isApp: false, // 是否是在app内
    device: {
      isAndroid: false, // 是否在安卓环境内
      isIOS: false, // 是否在IOS环境内
      model: null, // 设备的型号
      imsi: null, // 设备的国际移动用户识别码 ,//Android - 2.2+ (支持): 如果设备没有插入SIM卡，则返回空数组。|iOS - 4.5+ (不支持): iOS设备不支持获取SIM卡信息，返回空数组。
      vendor: null, // 设备的生产厂商
      uuid: null, // 设备的唯一标识
      resolutionHeight: null, // 设备屏幕高度分辨率
      resolutionWidth: null, // 设备屏幕宽度分辨率
      scale: null, // 逻辑分辨率与实际分辨率的比例
      version: null, // 系统版本信息
      osName: null // 系统的名称
    } // 设备信息
  },
  initApp() {
    // 获取当前环境
    if (window.navigator && window.navigator.userAgent) {
      let ua = window.navigator.userAgent.toLocaleLowerCase()
      site.Config.isWeiXin =
        ua.match(/MicroMessenger/i) == 'micromessenger'
    }
  },
  // 重写ajax定义的方法，主要用于自己业务逻辑上的处理
  ajax(options) {
    let _url = null
    if (
      app.Config.isApp &&
      plus.networkinfo.getCurrentType() ===
      plus.networkinfo.CONNECTION_NONE
    ) {
      app.mui.toast(
        '<a href="javascript:void(0);" style="text-decoration: underline;color: #FFF;" onclick="window.location.reload();">亲~网络连接不上，请检测网络。点此刷新重试</a>',
        { duration: '8000', type: 'div' }
      )
      return
    }
    if (typeof options === 'string') {
      _url = options
    } else if (typeof options !== 'object' || !options.url) {
      app.mui.alert('接口参数错误！')
      return
    } else {
      _url = options.url
      delete options.url
    }
    let _default = {
      type: 'POST',
      dataType: 'json',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      //	processData: true, //是否自动处理data数据
      async: true,
      timeout: 20000,
      auth: false, // 是否验证当前API接口的登录权限
      authFailCallbackFun: null, // 验证失败的回调函数
      successFunData: true, // 是否验证成功回调函数的数据
      showLoading: false // 是否显示加载
    }
    let _options = app.mui.extend(true, {}, options, _default)
    if (!_options.data) {
      _options.data = {}
    }
    if (_url.lastIndexOf('.json') > -1) {
      _options.type = 'GET'
    }
    if (_options.type.toUpperCase() === 'GET') {
      // 如果是get旧增加序列号
      _options.headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      _url += '&rnd=' + (+new Date() + '')
      _options.data = _options.data || {}
    }
    if (
      !_url.match(/^(?:http|ftp|https):\/\//) &&
      _url.lastIndexOf('.json') == -1
    ) {
      // 如果传的url含有 http://说明是个绝对路径，就不用拼了
      _url = app.Config.webapiDomain + _url
    }
    if (
      _default.processData &&
      typeof _options.data === 'object' &&
      _options.type.toUpperCase() === 'POST'
    ) {
      _options.data = JSON.stringify(_options.data)
    } else {
      delete _options.headers
    }
    // if (_options.auth === true && !app.globalService.isLogin()) {
    // 	if (typeof _options.authFailCallbackFun === 'function') {
    // 		_options.authFailCallbackFun()
    // 	}
    // 	return
    // }
    // 成功
    _options.success = (data, textStatus) => {
      if (_options.showLoading === true) {
        // router.app.$emit('vHideLoad')
      }
      let _data = data
      if (_options.successFunData === true) {
        // 兼容高德地图天气预报API
        if (data.status === '1') {
          options.success(_data)
          return
        }
        // message有东西证明是成功
        // error有东西证明是失败
        // 啥都没有返回证明是非法入侵
        if (data.message || data.error_code === 0) {
          if (typeof options.success === 'function') {
            options.success(_data)
          }
        } else if (data.error) {
          app.mui.alert(data.error.message, '错误提示')
          return
        } else {
          app.mui.toast('非法入侵！')
          return
        }
      }
    }
    // 完成
    _options.complete = (data, textStatus) => {
      if (_options.showLoading === true) {
        _options.showLoading = false
      // router.app.$emit('vHideLoad')
      }
      if (typeof options.complete === 'function') {
        options.complete(data, textStatus)
      }
    }
    _options.error = (xhr, error) => {
      app.log.debug(xhr, error)
      if (typeof options.error === 'function') {
        options.error(xhr, error)
      } else if (xhr.response) {
        let responseJSON = null
        try {
          responseJSON = JSON.parse(xhr.response)
        } catch (e) {}
        if (
          responseJSON &&
          responseJSON.__abp &&
          responseJSON.unAuthorizedRequest
        ) {
          // app.mui.toast('<a href="javascript:void(0);" style="text-decoration: underline;color: #FFF;" onclick="window.location.reload();">亲~登录过期了。点此重新登录</a>', {duration: 8000, type:'div'})
          app.mui.confirm(
            '亲~登录过期了！',
            null,
            ['想再看看', '去登录'],
            function (e) {
              if (e.index === 1) {
                app.vueApp.$router.push({ name: 'login' })
              }
            }
          )
        } else if (
          responseJSON &&
          responseJSON.__abp &&
          responseJSON.error &&
          responseJSON.error.message
        ) {
          app.mui.toast(responseJSON.error.message)
        }
      } else {
        alert(error)
        alert(JSON.stringify(error))
        app.mui.toast(
          '<a href="javascript:void(0);" style="text-decoration: underline;color: #FFF;" onclick="window.location.reload();">亲~服务出错了。点此刷新重试</a>',
          { duration: 8000, type: 'div' }
        )
      }
    }
    // 发送之前
    _options.beforeSend = xhr => {
      // xhr.setRequestHeader("ClientVersion", app.Config.innerVersion)
      let _token = app.globalService.getLoginUserInfo().token
      if (_token) {
        xhr.setRequestHeader('Authorization', _token)
      }
      if (_options.showLoading === true) {
        // router.app.$emit('vShowLoad')
      }
      if (typeof options.beforeSend === 'function') {
        options.beforeSend(xhr)
      }
    }
    console.log(_options.data)
    app.mui.ajax(_url, _options)
  },
  // 获取图片地址，如果地址带有 http://那么就认为是绝对地址，然后直接返回
  getResourceUrl(url) {
    const re = new RegExp('^(https://|http://)')
    if (url) {
      if (url.indexOf('src/imgs') > -1) {
        return url
      }
      if (url && re.test(url)) {
        console.log(url)
        return url
      }
      // 全站统一配置
      if (window.abp) {
        return app.Config.imageDomain + url
      }
      return app.Config.imageDomain + url
    }
  }
}
site.initApp()
module.exports = site
