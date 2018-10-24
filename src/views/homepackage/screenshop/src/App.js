/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
// 先去制作头部导航
import AppHeadBar from './vendor/AppHeadBar';
import AppGridList from './vendor/AppGridList';
import AppBottomBar from './vendor/AppBottomBar';

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context)
  }
  render() {
    return (
      <View style={styles.container}>
        <AppHeadBar />
        <AppGridList />
        <AppBottomBar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});