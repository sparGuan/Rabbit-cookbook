
// ================================
// Action Type
// ================================
const TOP_CHANGE = 'TOP_CHANGE'
const SHOW_ARROW = 'SHOW_ARROW'

// ================================
// Action Creator
// ================================
/**
 * 
 * @param {number} displayAnyTop // 是否展示头部搜索框
 */
const displayAnyTopCreator = showType => ({
  type: TOP_CHANGE,
  showType
})
const displayArrow = showArrow => ({
  type: TOP_CHANGE,
  showArrow
})
/* default 导出所有 Actions Creator */
export default {
  displayAnyTopCreator,
  displayArrow
}


// ================================
// Action handlers for Reducer
// 本来更新 state 是 Reducer 的责任
// 但要把 ActionType 导出又引入实在太麻烦
// 且在 Reducer 中写 switch-case 实在太不优雅
// 故在此直接给出处理逻辑
// ================================
export const ACTION_HANDLERS = {
  [TOP_CHANGE]: (displayAnyTopControl, { showType }) => (
    { ...displayAnyTopControl, showType  }
  ), // 测试输出的状态test
  [SHOW_ARROW]: (displayAnyTopControl, { showArrow }) => (
    { ...displayAnyTopControl, showArrow  }
  ),
}
