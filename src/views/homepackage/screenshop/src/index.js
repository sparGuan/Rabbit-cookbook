
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux'
import store, { history } from 'STORE'
import App from './App'
import "./index.css";
import { BrowserRouter, Route } from 'react-router-dom';
// register the app
function Main(props) {  
		return (
      <Provider store={store}>
        <BrowserRouter>
          <Route history={history} component={App} />
        </BrowserRouter>
      </Provider>
		);
}
AppRegistry.registerComponent('App', () => Main);
AppRegistry.runApplication('App', {
  initialProps: {},
  rootTag: document.getElementById('screenShop-app')
});
