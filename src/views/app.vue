<template>
	<div class="view">
		<header class="mui-bar mui-bar-nav" v-show="$store.state.appData.isShowHead">
			<a class="mui-icon mui-icon-left-nav mui-pull-left" @tap.stop.prevent="goBack" v-show="$store.state.appData.isShowBack"></a>
			<h1 class="mui-title" v-if="!$store.state.appData.showNavbarTitle">{{$store.state.appData.navbarTitle}}</h1>
      <!-- 头部保存按钮 -->
      <head-save-btn v-if="$store.state.appData.showHeadSaveBtn && !$store.state.appData.showNavbarTitle"></head-save-btn>
      <!-- 游戏有搜索框  -->
			<search v-else-if="$store.state.appData.showNavbarTitle && $store.state.appData.NavType === 'games'"
					:className="searchClass"
					:placeholder="placeholder"
			>
			</search>
      <!-- 应用是某某公司  -->
      <YouYingTitle v-else-if="$store.state.appData.showNavbarTitle && $store.state.appData.NavType === 'cloud'"></YouYingTitle>
		</header>
		
		<div class="pages" :class="{'mui-content': $store.state.appData.isShowHead, 'toolbar-fixed': $store.state.appData.isShowFoot}">
			<transition :name="$store.state.routerStatus.transition">
				<!-- 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们 -->
				<keep-alive :include="['']" :exclude="['user-activity']">
					<router-view class="page"></router-view>
				</keep-alive>
			</transition>
		</div>
		
		<footer class="toolbar mui-row" v-show="$store.state.appData.isShowFoot">
			    <div class="mui-col-xs-4 toolbar-icon" >
	            <router-link :to="{name: 'home'}"  class="active toolbar-link" exact >
	            	<i class="iconfont icon-ic_shouyemokuai_yingyefenxi"></i>
	            	<!-- <span>小模块</span> -->
	            </router-link>
	        </div>
	        <div class="mui-col-xs-4 toolbar-icon">
	            <router-link :to="{name: 'myCustomerGathers'}" class="toolbar-link">
	            	<i class="iconfont icon-footprint"></i>
	            	<!-- <span>互动</span> -->
	            </router-link>
	        </div>
	        <div class="mui-col-xs-4 toolbar-icon">
	            <router-link :to="{name: 'userCenter'}" class="toolbar-link">
	            	<i class="iconfont icon-friendfill"></i>
	            	<!-- <span>我的</span> -->
	            </router-link>
	        </div>
		</footer>
	</div>
</template>
<script>
require('../less/app.less')//加载公共样式
import appRouters from '@/js/components/app-routers'
import Search from '@/components/Search'
import YouYingTitle from '@/components/YouYingTitle'
import HeadSaveBtn from '@/components/HeadSaveBtn'
export default {
  components: { Search, YouYingTitle,HeadSaveBtn },
  data() {
    return {
      socketId: '',
      rightToolClass: 'layout-1'
    }
  },
  // 在渲染该组件的对应路由被 confirm 前调用
  // 不！能！获取组件实例 `this`
  // 因为当钩子执行前，组件实例还没被创建
  created() {
    this.initApp()
  },
  mounted() {
  },
  sockets: {
    // 已经成功连接一次之后不会再进来了
    connect() {
      this.socketId = this.$socket.id
      this.$store.commit('SOCKET_CONNECT')
      console.log(`The ${this.socketId} is connected`)
    },
    disconnect() {
      console.log(`The ${this.$socket.id} is connected`)
    },
    isLogin_sent(val){
      val.userInfo.token = val.token
      console.log(val)
      app.globalService.setUserInfo(val.userInfo)
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data——————————LoginTool.Vue)')
    },
		// 把它写在vuex里面去吧，然后监听vuex的数据变化，更新请求好友列表
		// 每次有新信息来的时候把它放进vuex里面去，让每个页面可以监听到
    message(val){
      val.newMsg = true
      console.log(val)
			this.$store.commit('SOCKET_USER_MESSAGE',val)
    }
  },
  methods: {
    initApp: function() {
      var _this = this
      //1.检查更新
      if (app.Config.isApp) {
      }
    },    
    goBack: function() {
      //返回按钮
      const _this = this,
        _goBack = function() {
          appRouters.back(function(routerOptions) {
            if (routerOptions && routerOptions.name) {
              //考虑用replace不恰当，浏览器的返回一样是有问题的
              _this.$router.push(routerOptions)
            } else if (routerOptions && routerOptions.url) {
              window.location.href = routerOptions.url
            } else {
              _this.$router.push({ name: 'home' })
            }
          }, JSON.stringify(_this.$store.state.routerStatus.backConfig) == '{}'
            ? null
            : _this.$store.state.routerStatus.backConfig)
        }
      if (_this.$store.state.routerStatus.direction != 'backing') {
        _this.$store.dispatch('updateDirection', 'backing')
      }
      if (
        _this.$store.state.routerStatus.backConfig &&
        typeof _this.$store.state.routerStatus.backConfig.callback ===
          'function'
      ) {
        _this.$store.state.routerStatus.backConfig.callback(_goBack)
      } else {
        _goBack()
      }
      return true
    }
  }
}
</script>
<style lang="less" scoped>
.mui-bar {
  z-index: 999;
}
</style>