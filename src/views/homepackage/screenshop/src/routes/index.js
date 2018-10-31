export default {
  path: '/',

  component: require('../App').default,
  
  indexRoute: {
    component: require('../Welcome').default
  },
  
  childRoutes: [
    // 路由按模块组织分离，避免单文件代码量过大
    // 子路由页面有
    /*
    * 1. 产品详情页
    *       |———— 在线客服
    * 
    * 2.  支付详情页（包含所有支付）
    * 3.  购物车列表
    * 4.  会员信息
    *       |———— 查看会员信息
    * 5. 商品上架页
    * 6. 附近的商家页
    */
    // require('./msg').default,
    // require('./todo').default,
    
    // 强制“刷新”页面的 hack
    { path: 'redirect', component: require('../Redirect').default },
    
    // 无路由匹配的情况一定要放到最后，否则会拦截所有路由
    { path: '*', component: require('../404').default }
  ]
}

/*
  当前路由树如下
  ├ /
  |
  ├ /msg
  ├ /msg/add
  ├ /msg/detail/:msgId
  ├ /msg/modify/:msgId
  |
  ├ /todo
  |
  ├ /redirect
*/
