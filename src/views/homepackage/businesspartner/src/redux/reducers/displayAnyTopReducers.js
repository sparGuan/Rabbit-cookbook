import createReducer from 'UTIL/createReducer'
import { ACTION_HANDLERS } from 'ACTION/displayAnyTop' // 注入action里面的user函数
import initState from 'STORE/initState' // 注入所需的state
export default createReducer(initState.displayAnyTop, ACTION_HANDLERS)

