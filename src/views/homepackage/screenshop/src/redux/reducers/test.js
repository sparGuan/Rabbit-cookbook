import createReducer from 'UTIL/createReducer'
import { ACTION_HANDLERS } from 'ACTION/test' // 注入action里面的user函数
import initState from 'STORE/initState' // 注入所需的action
console.log(ACTION_HANDLERS)
console.log(initState.test  )
export default createReducer(initState.test, ACTION_HANDLERS)

