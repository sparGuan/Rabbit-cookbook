import createReducer from 'UTIL/createReducer'
import { ACTION_HANDLERS } from 'ACTION/displayTopSearch' // 注入action里面的user函数
import initState from 'STORE/initState' // 注入所需的state
console.log(initState)
export default createReducer(initState.displayTopSearch, ACTION_HANDLERS)

