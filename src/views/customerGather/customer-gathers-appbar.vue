<template>
    <header id="header" class="mui-bar mui-bar-nav gathers-app-bar">
          <div class="mui-row gathers-app-bar-container">
              <div class="mui-col-xs-4">
                  <!-- TODO: 实现正在播放的音乐 🎵 -->
                  <div class="music-pic"></div>
              </div>
              <div class="mui-col-xs-4 arrow-area" style="position:relative;">
                  <!-- TODO: 实现下拉式的仿QQ看点 -->
                  <div class="">最新<i class="iconfont icon-arrow-down"></i></div>
              </div>
              <div class="mui-col-xs-4">
                <!--  TODO: 实现天气预报式的顶部 -->
                 <weatherForecast />
              </div>
          </div> 
          <!-- 搜索窗口 -->
          <div class="music-palyer"></div> 
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
  .arrow-area {
    text-align: center;
    line-height: 45px;
    .icon-arrow-down {
      font-size: 12px;      
      display: block;
      position: absolute;
      top: 16px;
      right: 24px;
      transform: scale(.7);
    }
  }
	.gathers-app-bar {
      position: fixed;
      height: auto;
      background: linear-gradient(to right,#635499,#526d8e,#5b5d8f);
      color:#fff;
      top: 0;
      left: 0;
      .gathers-app-bar-container {
        height:100%;
        &>div {
          height:100%;
        }
        .music-pic {
          background-image: url('../../imgs/custom/webwxgetmsgimg.png');
          height:40px;
        }
      }
      .music-palyer {
        width: calc(100% + 20px);
        height: 50px;
        transform: translateX(-10px);
        background-image: url('../../imgs/custom/webwxgetmsgimg-1.jpg');
        background-repeat: no-repeat;
        background-color: #fbfbfb;
        background-position: 40px;
        background-size: contain;
      }
  }
</style>