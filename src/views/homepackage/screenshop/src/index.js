
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App'
import "./index.css";
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './Routes';
// register the app
AppRegistry.registerComponent('App', () => Main);
AppRegistry.runApplication('App', {
  initialProps: {},
  rootTag: document.getElementById('screenShop-app')
});
