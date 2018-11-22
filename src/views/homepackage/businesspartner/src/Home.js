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
	}
});
class Home extends React.Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {	
		const {children ,history} = this.props
		return (
			<View style={styles.container}>
				{children}
				{/* 公共头部、公共底部 */}
				<AppHeadBar history = {history} />
        <AppBottomBar history = {history}/> 
				{/* <AppBottomBar  history={this.props.history}/> */}
			</View>
		);
	}
}
export default withRouter(Home)

