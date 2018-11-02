import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import store from 'STORE'
import test from 'REDUCER/test'

// ================================
// 同步的 Reducers（即应用初始化所必需的）
// ================================
const syncReducers = {
  router: routerReducer,
  test: test // 注入userData ====>必须的情况下
}

// ================================
// 异步加载的 Reducers（Code Splitting 按需加载的）
// ================================
const asyncReducers = {}

/**
 * @return {Function} rootReducer
 */
export function createRootReducer() {
  return combineReducers({
    ...syncReducers,
    ...asyncReducers
  })
}

/**
 * 按需加载时，立即注入对应的 Reducer
 * @param  {String}   key
 * @param  {Function} reducer
 */
export function injectReducer(key, reducer) {
  asyncReducers[key] = reducer
  store.replaceReducer(createRootReducer()) // 替换当前的 rootReducer
}