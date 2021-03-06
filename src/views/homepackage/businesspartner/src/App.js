
/*
   Root, Router 配置
   组件匹配
*/
import React from 'react';
// import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import { Route, Switch, Redirect, withRouter, HashRouter } from 'react-router-dom';
import NotLiveRoute from 'react-live-route';
import { Provider } from 'react-redux'
import store, { history } from 'STORE'
import {rootRouters} from '@/router/router'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Home from './Home'
import AppDetailPage from './vendor/AppDetailPage'
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
const LiveRoute = withRouter(NotLiveRoute);
const App = (props) => (
  <MuiThemeProvider theme={theme}>
		{
			//我是一个双向绑定的组件
		}
    <Provider store={store} >
         <HashRouter>
					 	<div>
							<Switch>
									{/* <Route render={() => <Redirect to="/AppDetailPage" />} /> */}
										{
										// 构建home里面带头部带底部
										}
										<Route exact path="/" history={history} />
										{
											rootRouters.map((route,index) => {
													return (
														<Route
														history={history}
														key={index}
														path={route.path}
														/>
												)
											})
										}
							</Switch>
							<LiveRoute  path="/" livePath={`/AppDetailPage/:id`}  component={Home} />
							<LiveRoute  path="/AppDetailPage/:id"  component={AppDetailPage} />
						</div>
        </HashRouter> 
    </Provider>
		{ DevTools && <DevTools /> }
  </MuiThemeProvider>
);
export default App;
