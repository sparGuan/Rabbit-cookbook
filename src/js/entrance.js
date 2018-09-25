import 'babel-polyfill'
require('es6-promise').polyfill()
import mui from './lib/mui'
import app from './app'
import globalService from './services/global-service'
import api from './services/api'
import log from './utils/log'
import utils from './utils/utils'
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import routers from './routers'
import vueApp from '../views/app'
import store from './store/'
import touch from 'vue-directive-touch'
import 'vue-layer-mobile/need/layer.css'
import layer from 'vue-layer-mobile';
import socketio from 'socket.io-client';
import VueSocketio from 'vue-socket.io';
Object.assign(app.Config, config);// 非常重要的合并，我去
window.app = Object.assign({}, app, { log, utils, mui, globalService, api })
const initVue = () => {
	Vue.use(Vuex)
	Vue.use(VueRouter)
	Vue.use(touch)
	Vue.use(layer)
	Vue.use(VueSocketio,  `${app.Config.webapiDomain}`, store);
	const [router, VueApp] = [
		routers.createRouter(VueRouter, store),
		Vue.extend(vueApp)
	]
	window.app.vueApp = new VueApp({ 
		router, 
		name: 'app', 
		store,
		sockets: {
			// 把它写在vuex里面去吧，然后监听vuex的数据变化，更新请求好友列表
			// 每次有新信息来的时候把它放进vuex里面去，让每个页面可以监听到
			message(val){
				// 重新更新用户信息				
				window.app.globalService.setUserInfo(val.acceptUser)
				this.$store.commit('SOCKET_USER_MESSAGE',val.sentUser)
			},
			// 接收请求的频道，加入频道进行通讯
			onChatOne_sent(chatOne,user) {
				// icon-huaban
				// 给setUser的头像增加一个new
				// user.isOnChat = true
				this.$store.commit('SOCKET_USER_MESSAGE',user)
			}
		}
	}).$mount(
		'#app'
	)
}
window.mui = mui.init({
	swipeBack: false, //关闭右滑关闭功能（默认就是false）
	keyEventBind: {
		backbutton: true //开启back按键监听（默认就是true）
	},
	gestureConfig: {
		tap: true, //默认为true
		doubletap: true, //默认为false
		longtap: true, //默认为false
		swipe: true, //默认为true
		drag: true, //默认为true
		hold: true, //默认为false，不监听
		release: true //默认为false，不监听
	},
	statusBarBackground: '#1981D8' //设置状态栏颜色,仅iOS可用
})

if (mui.os.plus) {
	app.Config.isApp = true
	mui.plusReady(() => {
		Object.assign(app.Config.device, {
			isAndroid: plus.os.name === 'Android', //是否在安卓环境内
			isIOS: plus.os.name === 'iOS', //是否在IOS环境内
			model: plus.device.model, //设备的型号
			imsi: plus.device.imsi, //设备的国际移动用户识别码 ,//Android - 2.2+ (支持): 如果设备没有插入SIM卡，则返回空数组。|iOS - 4.5+ (不支持): iOS设备不支持获取SIM卡信息，返回空数组。
			vendor: plus.device.vendor, // 设备的生产厂商
			uuid: plus.device.uuid, //设备的唯一标识
			//			resolutionHeight: plus.screen.resolutionHeight * plus.screen.scale, //设备屏幕高度分辨率
			//			resolutionWidth: plus.screen.resolutionWidtht * plus.screen.scale, //设备屏幕宽度分辨率，目前好像是空的
			//			scale: plus.screen.scale, //逻辑分辨率与实际分辨率的比例
			version: plus.os.version, //系统版本信息
			osName: plus.os.name //系统的名称
		})
		app.Config.version = plus.runtime.version
		app.Config.clientVersion = plus.runtime.innerVersion
		initVue()
	})
} else {
	mui.ready(() => {
		initVue()
	})
}

//require("../less/app.less"); //加载公共样式
//window.app = require("./app.js"); //加载公共样式,
//var Vue = require('vue');
//var VueRouter = require('vue-router');
//Vue.use(VueRouter);
//var router = require('./routers').createRouter(VueRouter);
//var App = Vue.extend(require('../views/app.vue'));
//new App({router: router, name: "app"}).$mount('#app');
