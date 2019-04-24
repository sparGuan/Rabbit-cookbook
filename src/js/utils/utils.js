/**
 * 作者：yujinjin9@126.com
 * 时间：2017-01-19
 * 描述：站点页面表单验证框架工具类
 */
const _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
export default {
  /**
   * [isMobile 判断平台]
   * @param test: 0:iPhone    1:Android
   */
  ismobile(test) {
    const u = navigator.userAgent,
      app = navigator.appVersion
    if (
      /AppleWebKit.*Mobile/i.test(navigator.userAgent) ||
      /MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(
        navigator.userAgent
      )
    ) {
      if (window.location.href.indexOf('?mobile') < 0) {
        try {
          if (/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)) {
            return '0'
          } else {
            return '1'
          }
        } catch (e) {}
      }
    } else if (u.indexOf('iPad') > -1) {
      return '0'
    } else {
      return '1'
    }
  },
  // 日期格式化
  dateFormat(date, fmt) {
    // TODO: 没有经过测试
    if (!date || !date instanceof Date) {
      return ''
    }
    var o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds(), // 毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o)
      if (new RegExp('(' + k + ')').test(fmt))
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    return fmt
  },
  /**
   * 将数值四舍五入(保留2位小数)后格式化成金额形式
   *
   * @param num 数值(Number或者String)
   * @param digit 保留小数点几位
   * @return 金额格式的字符串,如'1,234,567.45'
   * @type String
   */
  // 货币格式化
  dateCurrency(num, digit) {
    num = num.toString().replace(/\$|\,/g, '')
    if (isNaN(num)) num = '0'
    if (typeof digit != 'number' || digit < 0) {
      digit = 0
    }
    // 最大支持11位小数
    if (digit > 11) {
      return
    }
    // 绝对值
    var sign = num == (num = Math.abs(num)),
      cents = null
    num = Math.floor(num * Math.pow(10, digit) + 0.50000000001)
    if (digit > 0) {
      // 小数位
      cents = num % Math.pow(10, digit)
      cents = ('00000000000' + num).substr(-digit)
    }
    num = Math.floor(num / Math.pow(10, digit)).toString()
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
      num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3))
    if (cents) {
      return (sign ? '' : '-') + num + '.' + cents
    } else {
      return (sign ? '' : '-') + num
    }
  },

  parseUrl(url) {
    if (!url) {
      return
    }
    var _a_el = document.createElement('a')
    _a_el.href = url
    return {
      protocol: _a_el.protocol.replace(':', ''), // 协议
      host: _a_el.hostname, // 域名
      port: _a_el.port,
      query: (function () {
        if (_a_el.search) {
          return _a_el.search
        }
        // 兼容http://xxxx/#/id=xxx这种格式
        if (url.indexOf('?') != -1) {
          return url.substring(url.indexOf('?'))
        }
        return ''
      })(),
      params: (function () {
        var ret = {},
          seg = _a_el.search
        // 兼容http://xxxx/#/id=xxx这种格式
        if (!seg && url.indexOf('?') != -1) {
          seg = url.substring(url.indexOf('?'))
        }
        seg = seg.replace(/^\?/, '').split('&')
        var len = seg.length,
          i = 0,
          s
        for (; i < len; i++) {
          if (!seg[i]) {
            continue
          }
          s = seg[i].split('=')
          ret[s[0]] = s[1]
        }
        return ret
      })(), // 参数对象
      file: (_a_el.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
      hash: _a_el.hash.replace('#', ''),
      path: _a_el.pathname.replace(/^([^\/])/, '/$1'),
      relative: (_a_el.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
      segments: _a_el.pathname.replace(/^\//, '').split('/')
    }
  },
  contains(arr, obj) {
    var i = arr.length
    while (i--) {
      if (arr[i] === obj) {
        return true
      }
    }
    return false
  },
  generateGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  },

  // 本地存储
  localStorage(key, value) {
    if (arguments.length === 0) {
      app.log.warn('没有参数')
      return
    }
    if (app.isApp) {
      if (arguments.length === 1 || typeof value === 'undefined') {
        return plus.storage.getItem(key)
      } else if (value === null || value === '') {
        plus.storage.removeItem(key)
      } else if (typeof value === 'object') {
        plus.storage.setItem(key, JSON.stringify(value))
      } else {
        plus.storage.setItem(key, value)
      }
    } else {
      if (!window || !window.localStorage) {
        app.mui.alert('您开启了秘密浏览或无痕浏览模式，请关闭!')
        return
      }
      if (arguments.length === 1 || typeof value === 'undefined') {
        return window.localStorage.getItem(key)
      } else if (value === null || value === '') {
        window.localStorage.removeItem(key)
      } else if (typeof value === 'object') {
        window.localStorage.setItem(key, JSON.stringify(value))
      } else {
        window.localStorage.setItem(key, value)
      }
    }
  }, // ,
  //  	isObject(value) {
  //     return value === Object(value)
  // 	},
  //   isArray(value) {
  //     return Array.isArray(value)
  // 	},
  //   makeArrayKey(key) {
  //     if (key.length > 2 && key.lastIndexOf('[]') === key.length - 2) {
  //         return key
  //     } else {
  //         return key + '[]'
  //     }
  // 	},
  // 	/**
  //  * 格式化formdata
  //  * @param {*} obj
  //  * @param {*} resultArr
  //  * @param {*} pre
  //  */
  // 	objectToFormData (obj, resultArr, pre) {
  // 		resultArr = resultArr || []
  // 		Object.keys(obj).forEach(function (prop) {
  // 				var key = pre ? (pre + '.' + prop) : prop
  // 				if (isObject(obj[prop]) && !isArray(obj[prop])) {
  // 						objectToFormData(obj[prop], resultArr, key)
  // 				} else if (isArray(obj[prop])) {
  // 						obj[prop].forEach(function (value, i) {
  // 								var arrayKey = key + '[' + i + ']'
  // 								if (isObject(value)) {
  // 										objectToFormData(value, resultArr, arrayKey)
  // 								} else {
  // 										resultArr.push(arrayKey + "=" + value)
  // 								}
  // 						})
  // 				} else {
  // 						(obj[prop]!==""&&obj[prop]!==null) ? resultArr.push(key + "=" + obj[prop]) : null
  // 				}
  // 		})

  // 		return resultArr.join("&")
  // 	}
  /** 
   * 获取当前坐标 => 参考以下demo
   * 
  	
   * @param {Function} MapPoint 回调函数，返回position
   */
  // MapPoint(position) {
  // 	const Lon = position.coords.longitude;   //获取经度
  // 	const Lat = position.coords.latitude;  //获取纬度
  // 	const address = "当前地址：" + position.address.province + "," + position.address.city + "," + position.address.district + "," + position.address.street + "," + position.address.streetNum
  // 	alert(Lon + "," + Lat)
  // 	alert(address)
  // },
  getlocation(MapPoint) {
    mui.plusReady(() => {
      // 成功进入第一个回调，失败进入第二个回调
      plus.geolocation.getCurrentPosition(MapPoint, e => {
        mui.toast('error:' + e.message)
      })
    })
  },
  isVerifyPhone(val) {
    if (!/^1[34578]\d{9}$/.test(val)) {
      return false
    } else {
      return true
    }
  },
  isVerifyEmail(val) {
    if (!/^1[34578]\d{9}$/.test(val)) {
      return false
    } else {
      return true
    }
  },
  isVerifyIDNumber(val) {
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if (!reg.test(val)) {
      return false
    } else {
      return true
    }
  },
  base64Encode(input) {
    var output = ''
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4
    var i = 0
    input = this._utf8_encode(input)
    while (i < input.length) {
      chr1 = input.charCodeAt(i++)
      chr2 = input.charCodeAt(i++)
      chr3 = input.charCodeAt(i++)
      enc1 = chr1 >> 2
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
      enc4 = chr3 & 63
      if (isNaN(chr2)) {
        enc3 = enc4 = 64
      } else if (isNaN(chr3)) {
        enc4 = 64
      }
      output = output +
      _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
      _keyStr.charAt(enc3) + _keyStr.charAt(enc4)
    }
    return output
  },
  _utf8_encode(string) {
    string = string.replace(/\r\n/g, '\n')
    var utftext = ''
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n)
      if (c < 128) {
        utftext += String.fromCharCode(c)
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192)
        utftext += String.fromCharCode((c & 63) | 128)
      } else {
        utftext += String.fromCharCode((c >> 12) | 224)
        utftext += String.fromCharCode(((c >> 6) & 63) | 128)
        utftext += String.fromCharCode((c & 63) | 128)
      }
    }
    return utftext
  }
}
