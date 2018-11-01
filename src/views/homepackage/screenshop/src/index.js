
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux'
import store, { history } from 'STORE'
import { Router } from 'react-router'
import routes from 'ROUTE'
import "./index.css";
console.log(routes)
// register the app
function Main(props) {
		return (
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
		);
}
AppRegistry.registerComponent('App', () => Main);
AppRegistry.runApplication('App', {
  initialProps: {},
  rootTag: document.getElementById('screenShop-app')
});
