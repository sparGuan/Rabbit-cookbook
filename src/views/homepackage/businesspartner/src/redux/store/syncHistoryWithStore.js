// ========================================================
// 同步 history 配置
// ========================================================
import { browserHistory } from 'react-router'
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import { createBrowserHistory } from 'history';
// const browserHistory = useRouterHistory(createHashHistory)({
//   basename: '', // 相当于 rootPath
//   queryKey: false // 去除随机标识符
// })

export const historyMiddleware = routerMiddleware(browserHistory)

/**
 * @param  {Store}
 * @return {History} 增强版 history
 */
export default function (store) {
  return syncHistoryWithStore(
    createBrowserHistory(),
    store,
    { selectLocationState: (state) => state.router }
  )
}
