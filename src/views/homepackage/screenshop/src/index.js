
import App from './App';
import React from 'react';
import ReactNative, { AppRegistry } from 'react-native';
import "./index.css";
// register the app
AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', {
  initialProps: {},
  rootTag: document.getElementById('screenShop-app')
});
