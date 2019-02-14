<template>
    <header id="header" class="mui-bar mui-bar-nav gathers-app-bar">
          <div class="mui-row gathers-app-bar-container">
              <div class="mui-col-xs-4">
                  <!-- TODO: 实现正在播放的音乐 🎵 -->
                  <div class="music-pic "><i class="iconfont icon-ziyuanldpi" @click="$emit('openMusicContro')"></i></div>
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
          <div class="music-palyer">
              <customerGathersPalyer />
          </div> 
		</header>
</template>
<script>
import weatherForecast from './customer-gathers-weatherforecast'
import customerGathersPalyer from './customer-gathers-palyer'
export default {
  components: {  
    weatherForecast,
    customerGathersPalyer
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
  .icon-ziyuanldpi {
    width: 50px;
    display: block;
    height: 30px;
    line-height: 30px;
  }
  .arrow-area {
    text-align: center;
    line-height: 45px;
    letter-spacing: 2px;
    .icon-arrow-down {
      font-size: 12px;
      display: block;
      position: absolute;
      top: 15px;
      right: 28px;
      transform: scale(0.6) rotate(180deg);
    }
  }
	.gathers-app-bar {
      position: fixed;
      height: auto;
      opacity: .8;
      background: linear-gradient(to right,#635499,#526d8e,#5b5d8f);
      color:#fff;
      top: 0;
      left: 0;
      border-bottom-left-radius: 25px;
      .gathers-app-bar-container {
        height:100%;
        &>div {
          height:100%;
        }
        .music-pic {
          height: 45px;
          line-height: 45px;
        }
      }
      .music-palyer {
        width: calc(~'100% + 20px');
        height: 50px;
        border-bottom-left-radius: 25px;
        transform: translateX(-10px);
        background-repeat: no-repeat;
        background-position: 40px;
        background-size: contain;
        border-radius: 25px;
        border-bottom-left-radius: 25px;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        overflow: hidden;
      }
  }
</style>