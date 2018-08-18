/**
 * 作者：yujinjin9@126.com
 * 时间：2017-01-19
 * app临时数据管理
 */
const menusData = Array.from(require('../data/menus.json'))
export default {
	state: {
		showNavbarTitle: true,// 是否显示头部标题
		showHeadSaveBtn: false, // 是否显示头部按钮
		NavType: '',
		navbarTitle: '', //app的导航页标题
		isShowHead: true, //是否显示app 的头部
		isShowFoot: true, //是否显示foot栏
		isShowBack: true, //是否显示返回按钮
		isConnectionHub: false, //是否连接hubs
		locationInfo: {},
		keepLivesConfig: {
			isReFlashActivityInfoList: true
		} // 缓存列表---》用于是否已经被访问过
	},
	mutations: {
		updateKeepLivesConfig(state, keepLivesConfig) {
			state.keepLivesConfig = app.mui.extend(state.updateKeepLivesConfig,keepLivesConfig)
			console.log(state.keepLivesConfig)
		},
		updateLocationInfo(state, locationInfo) {
			state.locationInfo = locationInfo
		},
		updateHeadSaveBtn(state,isHeadSaveBtn) {
			state.showHeadSaveBtn = isHeadSaveBtn
		},
		updateNavbarTitle(state, { navbarTitle = '首页', NavType }) {
			let arr = []
			for (let menu of menusData) {
				arr.push(menu.name)
			}
			state.NavType = NavType
			state.showNavbarTitle = arr.includes(navbarTitle)
			// false是显示头部标题状态，因此app.vue使用了非判断
			state.navbarTitle = navbarTitle
		},
		updateNavbarStatus(
			state,
			{ isShowHead = true, isShowFoot = true, isShowBack = true } = {}
		) {
			if (state.isShowHead != isShowHead) {
				state.isShowHead = isShowHead
			}
			if (state.isShowFoot != isShowFoot) {
				state.isShowFoot = isShowFoot
			}
			if (state.isShowBack != isShowBack) {
				state.isShowBack = isShowBack
			}
		},
		updateConnectionHubStatus(state, isConnectionHub) {
			state.isConnectionHub = isConnectionHub
		},
		updateFooterStatu(state, FooterStatu) {
			state.isShowFoot = FooterStatu
		}
	},
	actions: {
		updateKeepLivesConfig({ commit }, keepLivesConfig) {
			commit('updateKeepLivesConfig', keepLivesConfig)
		},
		updateLocationInfo({ commit }, locationInfo) {
			commit('updateLocationInfo', locationInfo)
		},
		updateHeadSaveBtn({ commit }, isHeadSaveBtn) {
			commit('updateHeadSaveBtn', isHeadSaveBtn)
		},
		updateNavbarTitle({ commit }, { navbarTitle, NavType }) {
			commit('updateNavbarTitle', { navbarTitle, NavType })
		},
		updateNavbarStatus({ commit }, navbarStatusObject) {
			commit('updateNavbarStatus', navbarStatusObject)
		},
		updateConnectionHubStatus({ commit }, isConnectionHub) {
			commit('updateConnectionHubStatus', isConnectionHub)
		},
		updateFooterStatu({ commit }, FooterStatu) {
			commit('updateFooterStatu', FooterStatu)
		}
	}
}
