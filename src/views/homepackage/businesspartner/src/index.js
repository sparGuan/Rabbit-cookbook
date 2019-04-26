
import { AppRegistry } from 'react-native';
import "./index.css";
import App from './App';
//  TODO: 事业合伙人模块
// 仿类似于爱合伙的人物巡查模式
// 并非资金方，应该是双方都是行业经验者
// 爱合伙方式的自动搜索项目，引用项目合伙人制度
// register the app
AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', {
  initialProps: {},
  rootTag: document.getElementById('businesspartner-app')
});
window.addEventListener('load', () => {
  let childDomain = document.domain;
  document.domain = childDomain;
}, false);