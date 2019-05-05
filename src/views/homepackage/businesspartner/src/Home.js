/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
// 挂载app
// 实现类似爱合伙，卡片叠合风格
import React from 'react';
import { View } from 'react-native';
import AppHeadBar from './vendor/AppHeadBar';
import { withRouter } from 'react-router-dom';
import AppBottomBar from './vendor/AppBottomBar';
import { connect } from 'react-redux'

@connect(
	// 功能同 UTIL/createContainer
	({ displayAnyTop }) => ({ displayAnyTop }),
  require('ACTION/displayAnyTop').default
)
class Home extends React.Component {
	constructor(props, context) {		
		super(props, context);
	}
	componentDidMount() {
    
  };
	
	render() {	
		const {children ,history,displayAnyTop, isInit} = this.props
		return (
			<View style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				marginTop: displayAnyTop.isShow ? 48 : 0
			}}>
				{children}
				{/* 公共头部、公共底部 */}
				<AppHeadBar history = {history}/>
        <AppBottomBar history = {history} /> 
				{/* <AppBottomBar  history={this.props.history}/> */}
			</View>
		);
	}
}
export default withRouter(Home)

