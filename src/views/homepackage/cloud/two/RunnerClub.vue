<template>
    <div  class="runner" ref="runner">
        <div class="info-head">
          <div class="pedometer">
              <div class="mui-row text-center" style="padding: 5px;">
                <div class="off-canvas-side">
                  <span class="side side-0"></span>
                  <span class="side side-1"></span>
                  <span class="side side-2"></span>
                </div>
                <i class="iconfont icon-paobu" style="font-size: 30px;vertical-align: middle;color: #fff;"></i>
                <div class="off-firends-side">
                  <i class="iconfont icon-pengyoutuijian" style="font-size: 22px;color: #fff;"></i>
                </div>
              </div>
              <div class="timer">
                <p><strong class="getime">00:00:00</strong></p>
                <p><strong class="getgps">GPS</strong></p>
              </div>
          </div>
          <div class="mui-row">
              <div class="mui-col-sm-4 mui-col-xs-4 text-center">
                  <!-- 每小时公里数 -->
                  <p><label style="color:#42b8d6;">配速&nbsp;&nbsp;km/小时</label></p>
                  <span class="amount">10</span>
              </div>
              <div class="mui-col-sm-4 mui-col-xs-4 text-center">
                <!-- 步数 -->
                <p><label style="color:#42b8d6;">步数&nbsp;&nbsp;</label></p>
                <span class="amount">17777</span>
              </div>
              <div class="mui-col-sm-4 mui-col-xs-4 text-center">
                <!-- 消耗卡路里 -->
                <p><label style="color:#42b8d6;">消耗卡路里&nbsp;&nbsp;</label></p>
                <span class="amount">7516</span>
              </div>
          </div>
        </div>
        <baidu-map :center="center" :zoom="zoom" @ready="handler" class="bm-view" ak="bdEv6dBwm0tHGyfELGnc67PMREZullTl">
          <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>  
          <bm-control :offset="buttonSize">    
            <button  type="button" class="mui-btn mui-btn-primary btn-start">开始</button>
          </bm-control>
          <bm-control :offset="directionSize">
              <div class="left-direction">
                <i class="iconfont icon-fangxiangbiao  icool"></i>
              </div>
          </bm-control>
          <bm-control :offset="fixedPointSize">
              <div class="right-pointflag">
                <i class="iconfont icon-flag icool"></i>
              </div>
          </bm-control> 
          <bm-walking  start="百度大厦" end="北京邮电大学西门" :auto-viewport="true" location="北京"></bm-walking>
        </baidu-map>        
    </div>
</template>
<script>
import { BaiduMap, BmControl, BmGeolocation, BmWalking } from 'vue-baidu-map'
export default {
  components: { BaiduMap, BmControl, BmGeolocation, BmWalking },
  data() {
    return {
      flag: false,
      center: { lng: 0, lat: 0 },
      zoom: 3,
      buttonSize: {
        width: window.innerWidth / 2 - 55,
        height: (window.innerHeight - 200) / 2
      },
      directionSize: {
        width: 0,
        height: (window.innerHeight - 200) / 2
      },
      fixedPointSize: {
        width: window.innerWidth - 65,
        height: (window.innerHeight - 200) / 2
      }
    }
  },
  methods: {
    handler({ BMap, map }) {
      this.center.lng = 116.404
      this.center.lat = 39.915
      this.zoom = 15
    }
  }
}
</script>
<style lang="less" scoped>
@backgroundColor: #42b8d6;
.runner {
  height: 100%;
  .off-firends-side {
    width: 40px;
    height: 100%;
    float: right;
    padding: 5px;
  }
  .icool {
    display: inline-block;
    font-size: 30px;
    text-align: center;
    position: absolute;
    left: 18px;
    color: @backgroundColor;
    top: 12px;
  }
  .amount {
    color: @backgroundColor;
    font-size: 18px;
  }
  .left-direction {
    width: 65px;
    height: 50px;
    background-color: #fff;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
    box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.2);
  }
  .right-pointflag {
    width: 65px;
    height: 50px;
    background-color: #fff;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    box-shadow: -2px 3px 5px rgba(0, 0, 0, 0.2);
  }
  .btn-start {
    border-radius: 15px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
    width: 100px;
  }
  .info-head {
    height: 200px;
    width: 100%;
    position: relative;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }
  .pedometer {
    background-color: @backgroundColor;
    height: calc(~'100% - 45px');
    border: 5px solid #eee;
    box-shadow: 0 0 15px rgba(90, 106, 109, 0.4) inset;
    .timer {
      text-align: center;
      .getime {
        font-size: 49px;
        color: #fff;
      }
      .getgps {
        font-size: 18px;
        color: #fff;
      }
    }
    .off-canvas-side {
      padding: 5px;
      width: 40px;
      float: left;
      .side {
        height: 4px;
        background: #fff;
        display: block;
        margin-bottom: 5px;
        border-radius: 5px;
        &.side-0 {
          width: 100%;
        }
        &.side-1 {
          width: 100%;
        }
        &.side-2 {
          width: 80%;
        }
      }
    }
  }
  .bm-view {
    width: 100%;
    height: calc(~'100% - 200px');
  }
}
</style>