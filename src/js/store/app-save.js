/**
 * 作者：yujinjin9@126.com
 * 时间：2017-01-19
 * app执行通用组件保存按钮方法
 */
export default {
	state: {
		saveMethod:() => false
	},
	mutations: {		
		updateSaveMethod(state, method) {
			state.saveMethod = method
		},
		saveModules(state) {
			state.saveMethod()		
		}
	},
	actions: {		
		updateSaveMethod({ commit }, method) {
			commit('updateSaveMethod',method)
		},
		saveModules({ commit }) {
			commit('saveModules')
		}
	}
}
