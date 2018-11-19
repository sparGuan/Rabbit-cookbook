
// ================================
// Action Type
// ================================
const TEST = 'this is test'

// ================================
// Action Creator
// ================================
const test = () => null
/* default 导出所有 Actions Creator */
export default {
  test
}


// ================================
// Action handlers for Reducer
// 本来更新 state 是 Reducer 的责任
// 但要把 ActionType 导出又引入实在太麻烦
// 且在 Reducer 中写 switch-case 实在太不优雅
// 故在此直接给出处理逻辑
// ================================
export const ACTION_HANDLERS = {
  [TEST]: () => null, // 测试输出的状态test
}
