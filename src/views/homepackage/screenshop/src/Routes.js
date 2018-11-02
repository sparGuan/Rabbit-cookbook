
/*
   Root, Router 配置
   组件匹配
*/
import React from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import store, { history } from 'STORE'
import AppDetilPage from './vendor/AppDetilPage';
import NotFound from './404';
import App from './App';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({
	typography: {
		useNextVariants: true
	},
	palette: {
		common: { black: '#000', white: 'rgba(255,255,255,1)' },
		background: { paper: 'rgba(255, 255, 255, 1)', default: '#fafafa' },
		primary: {
			light: 'rgba(154, 79, 220, 0.69)',
			main: 'rgba(255, 255, 255, 1)',
			dark: 'rgba(220, 221, 231, 0.63)',
			contrastText: 'rgba(74, 74, 74, 1)'
		},
		secondary: {
			light: 'rgba(144, 19, 254, 1)',
			main: 'rgba(166, 104, 238, 0.75)',
			dark: 'rgba(231, 59, 137, 1)',
			contrastText: '#fff'
		},
		error: {
			light: '#e57373',
			main: '#f44336',
			dark: '#d32f2f',
			contrastText: '#fff'
		},
		text: {
			primary: 'rgba(3, 3, 3, 0.77)',
			secondary: '#666',
			disabled: '#999',
			hint: '#f8f8f8'
		}
	}
});

let DevTools
if (__DEV__ && __COMPONENT_DEVTOOLS__) {
  // 组件形式的 Redux DevTools
  DevTools = require('./DevTools').default
}
const Root = () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
          <BrowserRouter>
            {/* 挂载所有路由  */}
            <Switch>
              <Route
                history={history}
                path="/"
                render={props => (
                  <Switch>
                      <Route path="/" exact component={App} />
                      <Route path="/notFound" component={NotFound} />
                      <Route path="/appDetilPage" component={AppDetilPage} />
                      {/*路由不正确时，默认跳回home页面*/}
                      <Route render={() => <Redirect to="/" />} />
                  </Switch>
                )}
              />
            </Switch>
          </BrowserRouter>
    </Provider>
    { DevTools && <DevTools /> }
  </MuiThemeProvider>
);
export default Root;