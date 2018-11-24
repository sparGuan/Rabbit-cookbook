import * as actions from 'ACTION'
import { bindActionCreators } from 'redux'
export default  dispatch  => {
  console.log(actions)
  return bindActionCreators(
      Object.assign({}, ...Object.keys(actions).map(key => ({[key]: actions[key]}))),
      dispatch
  );
}