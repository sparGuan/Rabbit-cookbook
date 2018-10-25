/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
// 先去制作头部导航
import AppHeadBar from './vendor/AppHeadBar';
// import TabNavigatorBar from './vendor/TabNavigatorBar';
import AppGridList from './vendor/AppGridList';
import AppBottomBar from './vendor/AppBottomBar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({
	typography: {
		useNextVariants: true
	},
	palette: {
		common: { black: '#000', white: '#fff' },
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
			secondary: 'rgba(0, 0, 0, 0.54)',
			disabled: 'rgba(0, 0, 0, 0.38)',
			hint: 'rgba(0, 0, 0, 0.38)'
		}
	}
});
export default class App extends React.Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<View style={styles.container}>
					<AppHeadBar />
					{/* <TabNavigatorBar /> */}
					<AppGridList />
					<AppBottomBar />
				</View>
			</MuiThemeProvider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5
	}
});
