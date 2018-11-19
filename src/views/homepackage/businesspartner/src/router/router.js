import React from 'react'
// import {Redirect} from 'react-router-dom'
import Loadable from 'react-loadable'
/**
 * 组件异步加载装置 => react-loadable
 * @param {String} filename 
 */
const loadable = (filename) => Loadable({
    loader:() => import(`@/vendor/${filename}`),
    loading:() => <div></div>
});

/**
 * 根路由集合
 */
const rootRouters = [
    {
        //根路由匹配
        path:'/',
        exact:true,
        component:require('../Home').default
    },
    {
      // React Route 路由的基本配置 以及 实现路由的模糊匹配（动态路由）
      path:'/appDetilPage',
      component:loadable('AppDetilPage')
    },
    {
        // 404 匹配
        path:'*',
        component:require(`../404`).default
    }
];

/**
 *  嵌套路由集合
 */
const routers = [
];


export {
    rootRouters,
    routers,
}