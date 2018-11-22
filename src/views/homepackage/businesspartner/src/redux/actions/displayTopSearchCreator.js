
// ================================
// Action Type
// ================================
const SHOW_SEARCH = 'SHOW_SEARCH'

// ================================
// Action Creator
// ================================
/**
 * 
 * @param {boolean} displayTopSearch // 是否展示头部搜索框
 */
const displayTopSearchCreator = (displayTopSearch) => ({
  type: SHOW_SEARCH,
  payload: displayTopSearch
})
/* default 导出所有 Actions Creator */
export default {
  displayTopSearchCreator
}


// ================================
// Action handlers for Reducer
// 本来更新 state 是 Reducer 的责任
// 但要把 ActionType 导出又引入实在太麻烦
// 且在 Reducer 中写 switch-case 实在太不优雅
// 故在此直接给出处理逻辑
// ================================
export const ACTION_HANDLERS = {
  [SHOW_SEARCH]: (displayTopSearchControl, { payload: displayTopSearch }) => (
    { ...displayTopSearchControl, displayTopSearch }
  ), // 测试输出的状态test
}
