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
	            	<!-- <i class="iconfont icon-ic_shouyemokuai_yingyefenxi"></i> -->
                <svg version="1.1" class="ux-skill" id="ux-skill" xmlns="http://www.w3.org/2000/svg" 
                style="    transform: translate3d(5px, 0px, 0px);"
                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  viewBox="0 0 160 108" enable-background="new 0 0 160 108" xml:space="preserve"><line fill="#FFFFFF" class="smart" x1="17.1" y1="30.8" x2="78.2" y2="91.9"></line><path fill="#999" d="M78.2,93.4c-0.4,0-0.8-0.1-1.1-0.4L16.1,31.9c-0.6-0.6-0.6-1.5,0-2.1c0.6-0.6,1.5-0.6,2.1,0l61.1,61.1
                			c0.6,0.6,0.6,1.5,0,2.1C78.9,93.2,78.6,93.4,78.2,93.4z"></path><line fill="#FFFFFF" class="smart"  x1="78.2" y1="30.8" x2="17.1" y2="91.9"></line><path fill="#999" d="M17.1,93.4c-0.4,0-0.8-0.1-1.1-0.4c-0.6-0.6-0.6-1.5,0-2.1l61.1-61.1c0.6-0.6,1.5-0.6,2.1,0
                			c0.6,0.6,0.6,1.5,0,2.1L18.2,92.9C17.9,93.2,17.5,93.4,17.1,93.4z"></path><line fill="#FFFFFF" class="smart"  x1="47.7" y1="18.2" x2="47.7" y2="104.5"></line><path fill="#999" d="M47.7,106c-0.8,0-1.5-0.7-1.5-1.5V18.2c0-0.8,0.7-1.5,1.5-1.5s1.5,0.7,1.5,1.5v86.3
                			C49.1,105.3,48.5,106,47.7,106z"></path><line fill="#FFFFFF" class="smart"  x1="90.8" y1="61.3" x2="4.5" y2="61.3"></line><path fill="#999" d="M90.8,62.8H4.5c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5h86.3c0.8,0,1.5,0.7,1.5,1.5S91.7,62.8,90.8,62.8z"></path><line fill="#FFFFFF" class="smart"  x1="7.8" y1="44.8" x2="87.5" y2="77.9"></line><path fill="#999" d="M87.5,79.4c-0.2,0-0.4,0-0.6-0.1l-79.8-33c-0.8-0.3-1.1-1.2-0.8-1.9c0.3-0.8,1.2-1.1,1.9-0.8l79.8,33
                			c0.8,0.3,1.1,1.2,0.8,1.9C88.7,79,88.1,79.4,87.5,79.4z"></path><line fill="#FFFFFF" class="smart"  x1="64.2" y1="21.5" x2="31.1" y2="101.2"></line><path fill="#999" d="M31.1,102.7c-0.2,0-0.4,0-0.6-0.1c-0.8-0.3-1.1-1.2-0.8-1.9l33-79.8c0.3-0.8,1.2-1.1,1.9-0.8
                			c0.8,0.3,1.1,1.2,0.8,1.9l-33,79.8C32.3,102.4,31.7,102.7,31.1,102.7z"></path><line fill="#FFFFFF" class="smart"  x1="31.1" y1="21.5" x2="64.2" y2="101.2"></line><path fill="#999" d="M64.2,102.7c-0.6,0-1.1-0.3-1.4-0.9L29.8,22c-0.3-0.8,0-1.6,0.8-1.9c0.8-0.3,1.6,0,1.9,0.8l33,79.8
                			c0.3,0.8,0,1.6-0.8,1.9C64.6,102.7,64.4,102.7,64.2,102.7z"></path><line fill="#FFFFFF" class="smart"  x1="87.5" y1="44.8" x2="7.8" y2="77.9"></line><path fill="#999" d="M7.8,79.4c-0.6,0-1.1-0.3-1.4-0.9c-0.3-0.8,0-1.6,0.8-1.9l79.8-33c0.8-0.3,1.6,0,1.9,0.8
                			c0.3,0.8,0,1.6-0.8,1.9l-79.8,33C8.2,79.3,8,79.4,7.8,79.4z"></path><path fill="#FFFFFF" class="smart"  d="M80.6,61.3c0,18.2-14.8,33-33,33c-18.2,0-33-14.8-33-33c0-18.2,14.8-33,33-33
                			C65.9,28.4,80.6,43.1,80.6,61.3"></path><path fill="#FFFFFF" class="smart"  d="M75.2,61.3c0,15.2-12.3,27.5-27.5,27.5S20.1,76.5,20.1,61.3c0-15.2,12.3-27.5,27.5-27.5
                			S75.2,46.1,75.2,61.3"></path><path fill="#999" d="M47.7,90.3c-16,0-29-13-29-29s13-29,29-29s29,13,29,29S63.7,90.3,47.7,90.3z M47.7,35.3
                			c-14.4,0-26,11.7-26,26s11.7,26,26,26s26-11.7,26-26S62,35.3,47.7,35.3z"></path><g id="pupil" style="transform-origin: 27px -40px 0px; transform: matrix(1, 0, 0, 1, 0, 0);"><path fill="#999" d="M63.4,61.3c0,8.7-7,15.7-15.7,15.7c-8.7,0-15.7-7-15.7-15.7c0-8.7,7-15.7,15.7-15.7
                				C56.3,45.6,63.4,52.7,63.4,61.3"></path><path fill="#FFFFFF" class="smart"  d="M61.2,48c0,3.3-2.7,6-6,6c-3.3,0-6-2.7-6-6s2.7-6,6-6C58.5,42,61.2,44.6,61.2,48"></path></g><g opacity="0" id="blink" style="opacity: 0;"><path fill="#FFFFFF" class="smart"  d="M75.2,61.3c0,15.2-12.3,27.5-27.5,27.5c-15.2,0-27.5-12.3-27.5-27.5c0-15.2,12.3-27.5,27.5-27.5
                				C62.9,33.8,75.2,46.1,75.2,61.3"></path><path fill="#999" d="M75.2,62.8h-55c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5h55c0.8,0,1.5,0.7,1.5,1.5S76,62.8,75.2,62.8z"></path></g><path fill="#999" d="M47.7,90.3c-16,0-29-13-29-29s13-29,29-29s29,13,29,29S63.7,90.3,47.7,90.3z M47.7,35.3
                			c-14.4,0-26,11.7-26,26s11.7,26,26,26s26-11.7,26-26S62,35.3,47.7,35.3z"></path></svg>
	            	<!-- <span>小模块</span> -->
	            </router-link>
	        </div>
	        <div class="mui-col-xs-4 toolbar-icon">
	            <router-link :to="{name: 'myCustomerGathers'}" class="toolbar-link">
	            	<!-- <i class="iconfont icon-footprint"></i> -->
                <svg version="1.1" id="html5-skill" xmlns="http://www.w3.org/2000/svg" 
                class="ux-skill"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                style="margin-top: 10px;"
                x="0px" y="0px"  viewBox="0 0 160 108" enable-background="new 0 0 160 108" xml:space="preserve"><g id="star" style="transform-origin: 56.5px 44.5px 0px; transform: translate3d(25px, -5px, 0px);"><path fill="#999" d="M60.5,37.8c-0.6,0-1.2-0.4-1.4-1l-3.6-11l-3.6,11c-0.3,0.8-1.1,1.2-1.9,1c-0.8-0.3-1.2-1.1-1-1.9l5-15.4
                c0.2-0.6,0.8-1,1.4-1s1.2,0.4,1.4,1l5,15.4c0.3,0.8-0.2,1.6-1,1.9C60.8,37.8,60.7,37.8,60.5,37.8z"></path><path fill="#999" d="M80.1,70c-0.5,0-0.9-0.2-1.2-0.6c-0.5-0.7-0.3-1.6,0.3-2.1l16.7-12.1H74.2c-0.8,0-1.5-0.7-1.5-1.5
                s0.7-1.5,1.5-1.5h26.3c0.7,0,1.2,0.4,1.4,1s0,1.3-0.5,1.7L80.9,69.7C80.7,69.9,80.4,70,80.1,70z"></path><path fill="#999" d="M27.7,108c-0.3,0-0.6-0.1-0.9-0.3c-0.5-0.4-0.7-1.1-0.5-1.7l6-18.4c0.3-0.8,1.1-1.2,1.9-1
                c0.8,0.3,1.2,1.1,1,1.9l-4.6,14L40.9,95c0.7-0.5,1.6-0.3,2.1,0.3c0.5,0.7,0.3,1.6-0.3,2.1l-14.1,10.2C28.3,107.9,28,108,27.7,108z
                "></path><path fill="#999" d="M83.3,108c-0.3,0-0.6-0.1-0.9-0.3L68.3,97.5C67.7,97,67.5,96,68,95.4c0.5-0.7,1.4-0.8,2.1-0.3l10.4,7.5
                l-4.6-14c-0.3-0.8,0.2-1.6,1-1.9c0.8-0.3,1.6,0.2,1.9,1l6,18.4c0.2,0.6,0,1.3-0.5,1.7C83.9,107.9,83.6,108,83.3,108z"></path><path fill="#999" d="M33.8,72.1c-0.3,0-0.6-0.1-0.9-0.3l-23.3-17c-0.5-0.4-0.7-1.1-0.5-1.7c0.2-0.6,0.8-1,1.4-1h26.3
                c0.8,0,1.5,0.7,1.5,1.5s-0.7,1.5-1.5,1.5H15.1l19.6,14.2c0.7,0.5,0.8,1.4,0.3,2.1C34.8,71.8,34.3,72.1,33.8,72.1z"></path><path fill="#999" d="M55.5,95.2c-8.1,0-15.7-4.8-19-12.3c-0.3-0.8,0-1.6,0.8-2c0.8-0.3,1.6,0,2,0.8c3,6.7,9.9,10.9,17.3,10.5
                c9.8-0.6,17.3-9,16.8-18.8c-0.6-9.8-9-17.3-18.8-16.8c-4,0.2-7.7,1.8-10.8,4.4c0,0,0,0,0,0c-0.3,0.3-0.7,0.4-1.2,0.3
                c-0.6-0.1-1-0.5-1.2-1.1c-0.1-0.3-0.1-0.6,0-0.9c0.1-0.3,5.6-17.1,5.6-17.1c0.2-0.6,0.8-1,1.4-1h15c0.8,0,1.5,0.7,1.5,1.5
                s-0.7,1.5-1.5,1.5H49.4l-3.8,11.8c2.7-1.5,5.6-2.3,8.8-2.5c11.5-0.6,21.3,8.1,21.9,19.6c0.3,5.5-1.5,10.9-5.2,15
                c-3.7,4.1-8.8,6.6-14.3,6.9C56.3,95.2,55.9,95.2,55.5,95.2z"></path></g></svg>
	            	<!-- <span>互动</span> -->
	            </router-link>
	        </div>
	        <div class="mui-col-xs-4 toolbar-icon">
	            <router-link :to="{name: 'userCenter'}" class="toolbar-link">
	            	<!-- <i class="iconfont icon-friendfill"></i> -->
                <svg version="1.1" style="margin-top: 5px;transform: translate3d(5px, 0px, 0px);" id="social-skill"
                class="ux-skill" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  viewBox="0 0 160 108" enable-background="new 0 0 160 108" xml:space="preserve"><g id="person_a" style="transform-origin: center bottom 0px; transform: matrix(1, 0, 0, 1, 0, 0);"><path fill="#999" d="M36.7,106c-3.9,0-7.9-0.8-11.6-2.4c-7.1-3.1-12.6-8.8-15.4-16C3.8,72.7,11.2,55.9,26,50
                c14.9-5.9,31.8,1.5,37.6,16.4c3.5,9,2.4,19.1-3.1,27.1c-0.5,0.7-1.4,0.9-2.1,0.4c-0.7-0.5-0.9-1.4-0.4-2.1
                c4.9-7.1,5.9-16.2,2.8-24.3c-5.3-13.4-20.4-19.9-33.8-14.7C13.8,58,7.2,73.2,12.4,86.5c2.5,6.5,7.5,11.6,13.8,14.3
                s13.4,2.9,19.9,0.4c1-0.4,2-0.9,3-1.4c0.7-0.4,1.6-0.1,2,0.6c0.4,0.7,0.1,1.6-0.6,2c-1.1,0.6-2.2,1.1-3.3,1.6
                C43.8,105.3,40.3,106,36.7,106z"></path><path fill="#999" d="M49.9,102.6c-0.1,0-0.2,0-0.3,0c-7.9-1.8-13.2-9.5-12-17.6c0.1-0.6,0.6-1.1,1.2-1.2
                c0.6-0.1,1.2,0.1,1.6,0.6c0.3,0.4,6.9,10.2,18.6,6.8c0.8-0.2,1.6,0.2,1.9,1c0.2,0.8-0.2,1.6-1,1.9c-9.2,2.7-15.8-1.6-19.2-4.9
                c0.7,5.1,4.5,9.4,9.7,10.6c0.8,0.2,1.3,1,1.1,1.8C51.2,102.1,50.6,102.6,49.9,102.6z"></path><path fill="#999" d="M48.6,73.4c-0.7,0-1.4-0.3-1.9-0.8S46,71.4,46,70.7c0-0.7,0.3-1.4,0.8-1.9c1-1,2.8-1,3.8,0
                c0.5,0.5,0.8,1.2,0.8,1.9c0,0.7-0.3,1.4-0.8,1.9S49.4,73.4,48.6,73.4z"></path></g><g id="person_b" style="transform-origin: center bottom 0px; transform: matrix(1, 0, 0, 1, 0, 0);"><path fill="#999" d="M101.3,106c-3.6,0-7.2-0.7-10.6-2c-1.1-0.5-2.3-1-3.3-1.6c-0.7-0.4-1-1.3-0.6-2c0.4-0.7,1.3-1,2-0.6
                c1,0.5,2,1,3,1.4c6.5,2.5,13.5,2.4,19.9-0.4c6.4-2.8,11.3-7.9,13.8-14.3c5.3-13.4-1.3-28.5-14.7-33.7
                c-13.4-5.3-28.5,1.3-33.8,14.7c-3.2,8.1-2.1,17.1,2.8,24.3c0.5,0.7,0.3,1.6-0.4,2.1c-0.7,0.5-1.6,0.3-2.1-0.4
                c-5.5-8-6.6-18.1-3.1-27.1C80.2,51.5,97.1,44.1,112,50c14.9,5.9,22.2,22.7,16.4,37.6c-2.8,7.2-8.3,12.9-15.4,16
                C109.2,105.2,105.3,106,101.3,106z"></path><path fill="#999" d="M88.1,102.6c-0.7,0-1.3-0.5-1.5-1.2c-0.2-0.8,0.3-1.6,1.1-1.8c5.2-1.2,9-5.5,9.7-10.6
                c-3.4,3.3-10,7.6-19.2,4.9c-0.8-0.2-1.2-1.1-1-1.9c0.2-0.8,1.1-1.2,1.9-1c11.7,3.5,18.3-6.3,18.6-6.8c0.3-0.5,1-0.8,1.6-0.6
                c0.6,0.1,1.1,0.6,1.2,1.2c1.2,8.1-4.1,15.8-12,17.6C88.3,102.6,88.2,102.6,88.1,102.6z"></path><path fill="#999" d="M89.4,73.4c-0.7,0-1.4-0.3-1.9-0.8c-0.5-0.5-0.8-1.2-0.8-1.9c0-0.7,0.3-1.4,0.8-1.9c1-1,2.8-1,3.8,0
                c0.5,0.5,0.8,1.2,0.8,1.9c0,0.7-0.3,1.4-0.8,1.9S90.1,73.4,89.4,73.4z"></path></g></svg>
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
    this.$nextTick( () => {
      require('@/js/lib/AnimateInteractive')
    })
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