<template>
    <header id="header" class="mui-bar mui-bar-nav gathers-app-bar">
          <div class="mui-row gathers-app-bar-container">
              <div class="mui-col-xs-4">
                 <!--  TODO: 实现天气预报式的顶部 -->
                 <weatherForecast />
              </div>
              <div class="mui-col-xs-4">
                  <!-- TODO: 实现下拉式的仿QQ看点 -->
              </div>
              <div class="mui-col-xs-4">
                <!-- TODO: 实现正在播放的音乐 🎵 -->
              </div>
          </div>  
		</header>
</template>
<script>
import weatherForecast from './customer-gathers-weatherforecast'
export default {
  components: {  
    weatherForecast
  },
	data() {
		return {};
	},
	mounted(){
    // 轮播
	//	app.mui(this.$refs.slider).slider({interval:0});
	},
	methods: {
		
	}
}
</script>
<style lang="less" scoped>
@import url('../../less/_colors-vars.less');
	.gathers-app-bar {
      position: fixed;
      top: 0;
      left: 0;
      .gathers-app-bar-container {
        height:100%;
        &>div {
          height:100%;
        }
      }
  }
</style>