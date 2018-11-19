
import App from './App';
import React from 'react';
import ReactNative, { AppRegistry } from 'react-native';
import { Provider } from 'react-redux'
import store, { history } from 'STORE'
import { Router } from 'react-router'
import routes from 'ROUTE'
import "./index.css";
// register the app
function Main(props) {
		return (
    <Provider store={store}>
      <Router history={history} children={routes} />
    </Provider>
		);
}
AppRegistry.registerComponent('App', () => Main);
AppRegistry.runApplication('App', {
  initialProps: {},
  rootTag: document.getElementById('screenShop-app')
});
