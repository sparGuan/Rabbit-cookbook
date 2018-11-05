/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
// 挂载app
import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppHeadBar from './vendor/AppHeadBar';
import { withRouter } from 'react-router-dom';
import AppBottomBar from './vendor/AppBottomBar';
import MembershipMenu from "./vendor/MembershipMenu";
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
class Home extends React.Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {	
		return (
			<View style={styles.container}>
				{/* 查看会员信息 */}
				<MembershipMenu />
				<AppHeadBar history ={this.props.history} />
				<AppBottomBar />
			</View>
		);
	}
}
export default withRouter(Home)

