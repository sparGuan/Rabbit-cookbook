import createReducer from 'UTIL/createReducer'
import { ACTION_HANDLERS } from 'ACTION/user'
import initState from 'STORE/initState' // 注入所需的action

export default createReducer(initState.userData, ACTION_HANDLERS)
