import createReducer from 'UTIL/createReducer'
import { ACTION_HANDLERS } from 'ACTION/displayTopSearchCreator' // 注入action里面的user函数
import initState from 'STORE/initState' // 注入所需的action
export default createReducer(initState.displayTopSearch, ACTION_HANDLERS)

