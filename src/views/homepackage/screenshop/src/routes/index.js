export default  [
  { path: '/',
    component: require('../App'),
    indexRoute: { component: require('../Welcome') },
    childRoutes: [
      { }
      // { path: 'inbox',
      //   component: Inbox,
      //   childRoutes: [
      //     { path: '/messages/:id', component: Message },
      //     { path: 'messages/:id',
      //       onEnter: function (nextState, replaceState) {
      //         replaceState(null, '/messages/' + nextState.params.id)
      //       }
      //     }
      //   ]
      // }
    ]
  }
]

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
