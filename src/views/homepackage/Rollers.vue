<template>
    <!-- <div  class="rollers" v-touch:up="runUP" @touchmove="runLong"  v-touch:long="runStart" v-touch:right="runUP" v-touch:left="runDown" v-touch:down="runDown" ref="rollers" > -->
    <div  class="rollers" @touchmove="$_rollers_runLong"  @touchstart="$_rollers_runStart" @touchend="$_rollers_runLeave" ref="rollers" >
        <div class="circle-u"  v-for="(point,index) in Points"  v-bind:key="index"  v-bind:class="point.deg == '200' ? 'on' : ''" :deg="point.deg" :name="point.menus.name" :router="point.menus.router" :style="'transform:'+'translate3d('+ point.x+'px'+', '+point.y+'px'+',0px);'" >    
            <img v-if="point.deg == '200'" class="NR opll"   v-bind:src="point.src"/>
            <img v-else class="NR"   v-bind:src="point.src"/>
        </div>
        <transition name="show-cap">
            <div class="cap" v-show="capActive.startShow" :style="'transform:'+'translate3d('+( TweezerOnSet.x + floatVal.x )+'px'+', '+( TweezerOnSet.y - floatVal.y )+'px'+',0px) rotate(16deg);'">
            </div>
        </transition>
        <div class="tweezer" 
             :style="'transform:'+'translate3d(0px'+', '+TweezerOnSet.y+'px'+',0px);width:'+(TweezerOnSet.x + 60)+'px;'"
             @tap.stop.prevent="$_rollers_gotoFramework($event.target.getAttribute('router'))"
        >
            <p class="slide-name"  @tap.stop.prevent="$_rollers_gotoFramework($event.target.parentNode.getAttribute('router'))">{{ Name }}</p>
            <transition name="slide-light">
                <div class="lightheight" v-show="freezeActive.startLightHeight"></div>
            </transition>
            <transition name="lock-light">
                <div class="lock" v-show="freezeActive.startPutlock"></div>
            </transition>
        </div>
    </div>
</template>
<script>
const Override = require('../../js/lib/Override')
// import store from "./store/"
// store.dispatch("updateDirection", "replace");
export default {
  props: {
    Points: {
      default: () => [],
      type: Array
    },
    Name: {
      default: '',
      type: String
    },
    TweezerOnSet: {
      default: () => {
        return { x: 0, y: 0 }
      },
      type: Object
    }
  },
  data() {
    return {
      lockMoveCircle: false,
      show: false,
      finshed: true,
      freezeActive: {
        startLightHeight: true,
        startPutlock: false
      },
      capActive: {
        startShow: true
      },
      router: '',
      //43 20
      floatVal: { x: 43, y: 20 },
      startDist: { x: 0, y: 0 },
      coord: { x: 0, y: 0 }
    }
  },
  mounted() {
    this.$data.show = true
  },
  watch: {
    coord: {
      handler(curVal, oldVal) {
        if (this.$data.lockMoveCircle) {
          // 开始移动了！！
          // 一直往上旋转把
          Override.default.start('turnAround', curVal, oldVal)
        }
      },
      deep: true
    }
  },
  methods: {
    $_rollers_runLong(event) {
      this.lockMoveCircle = true
      this.freezeActive.startPutlock = true
      this.coord = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      }
    },
    $_rollers_runStart(event) {
      this.freezeActive.startLightHeight = false
      this.capActive.startShow = false
      // 记录开始的坐标
      this.startDist.x = event.touches[0].clientX
      this.startDist.y = event.touches[0].clientY
      // this.coord = { x: event.touches[0].clientX, y: event.touches[0].clientY }
    },
    $_rollers_runLeave(event) {
      //   this.endDist.x = event.touches[0].clientX
      //   this.endDist.y = event.touches[0].clientY
      // 判断进行智能回弹操作
      Override.default.start('turnLeave')
      this.freezeActive.startPutlock = false
      this.freezeActive.startLightHeight = true
      this.capActive.startShow = true
    },
    $_rollers_gotoFramework(router) {
      this.$router.push({ name: router })
    }
  }
}
</script>
<style lang="less" scoped>
.rollers {
  width: 100%;
  position: relative;
  height: 100%;
  overflow: hidden;
  .circle-u {
    width: 65px;
    height: 65px;
    text-align: center;
    text-transform: uppercase;
    font-family: Arial;
    color: #fff;
    -webkit-border-radius: 65px;
    display: block;
    position: absolute;
    background: -webkit-gradient(
      linear,
      left top,
      0 bottom,
      from(#d6d2c4),
      color-stop(0.55, rgba(255, 255, 255, 0.2)),
      color-stop(0.55, rgba(255, 255, 255, 0))
    );
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
    transition-property: transform;
    box-sizing: content-box;
    z-index: 999;
  }
  .NR {
    width: 90%;
    height: auto;
    position: absolute;
    left: 5%;
    top: 4px;
    opacity: 0.78;
  }
  .tweezer {
    height: 65px;
    position: absolute;
    z-index: 10;
    border-radius: 65px;
    margin-left: 5px;
    background-color: rgb(141, 188, 211);
    overflow: hidden;
    background-image: url(../../imgs/tweezer/star-bg.png);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: 15px -13px;
    box-shadow: 5px 0px 15px #ccc inset;
  }
  .lightheight {
    background: -moz-linear-gradient(
      left,
      rgba(255, 255, 255, 0)0,
      rgba(255, 255, 255, 0.2)50%,
      rgba(255, 255, 255, 0)100%
    );
    background: -webkit-gradient(
      linear,
      left top,
      right top,
      color-stop(0%, rgba(255, 255, 255, 0)),
      color-stop(50%, rgba(255, 255, 255, 0.2)),
      color-stop(100%, rgba(255, 255, 255, 0))
    );
    background: -webkit-linear-gradient(
      left,
      rgba(255, 255, 255, 0)0,
      rgba(255, 255, 255, 0.2)50%,
      rgba(255, 255, 255, 0)100%
    );
    background: -o-linear-gradient(
      left,
      rgba(255, 255, 255, 0)0,
      rgba(255, 255, 255, 0.2)50%,
      rgba(255, 255, 255, 0)100%
    );
    -webkit-transform: skewX(-25deg);
    -moz-transform: skewX(-25deg);
    -webkit-animation: rolled 2.5s 0.2s ease both infinite;
    -moz-animation: rolled 2.5s 0.2s ease both infinite;
    -o-animation: rolled 2.5s 0.2s ease both infinite;
    -ms-animation: rolled 2.5s 0.2s ease both infinite;
    position: absolute;
    height: 65px;
    width: 5px;
    z-index: 1001;
  }
  .lock {
    right: 0px;
    position: absolute;
    border-radius: 50%;
    width: 65px;
    height: 65px;
    background-color: #fff;
    opacity: 0.15;
  }
  .slide-name {
    position: absolute;
    bottom: 13px;
    font-family: arial, 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
    font-size: 14px;
    color: #fff;
    width: calc(100% - 45px);
    text-align: center;
  }
  .cap {
    background-image: url(../../imgs/tweezer/award-bg.png);
    background-repeat: no-repeat;
    background-size: contain;
    height: 50px;
    width: 50px;
    position: absolute;
  }
  .show-cap-enter-active {
    transition: all 0.35s ease;
  }
  .show-cap-leave-active {
    transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .show-cap-enter,
  .show-cap-leave-to {
    opacity: 0;
  }
  .NR.opll {
    opacity: 1;
  }
  .circle-u.on {
    box-shadow: 0 1px 40px #f7f7f7;
  }
  .slide-light-enter-active {
    transition: all 0.35s ease;
  }
  .slide-light-leave-active {
    transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-light-enter,
  .slide-light-leave-to {
    opacity: 0;
  }
  .lock-light-enter-active {
    transition: all 0.35s ease;
  }
  .lock-light-leave-active {
    transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .lock-light-enter,
  .lock-light-leave-to {
    opacity: 0;
  }
}

@-webkit-keyframes rolled {
  0% {
    left: 0px;
  }
  100% {
    left: 100px;
  }
}
@-moz-keyframes rolled {
  0% {
    left: 0px;
  }
  100% {
    left: 100px;
  }
}
@-o-keyframes rolled {
  0% {
    left: 0px;
  }
  100% {
    left: 100px;
  }
}
@-ms-keyframes rolled {
  0% {
    left: 0px;
  }
  100% {
    left: 100px;
  }
}
@keyframes rolled {
  0% {
    left: 0px;
  }
  100% {
    left: 100px;
  }
}
</style>