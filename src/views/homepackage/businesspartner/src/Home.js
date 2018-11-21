/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
// 挂载app
// 实现类似爱合伙，卡片叠合风格
import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppHeadBar from './vendor/AppHeadBar';
import { withRouter } from 'react-router-dom';
import AppBottomBar from './vendor/AppBottomBar';
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
				<AppHeadBar history ={this.props.history} />
				<AppBottomBar  history={this.props.history}/>
			</View>
		);
	}
}
export default withRouter(Home)

