<template>
  <div class="content">
    <!-- 侧滑导航根容器 -->
    <!-- 侧滑导航根容器 -->
  <div class="mui-off-canvas-wrap mui-draggable mui-scalable offsider-controll">
      <!-- 菜单容器 -->
      <aside class="mui-off-canvas-left">
        <div class="mui-scroll-wrapper">
          <div class="mui-scroll left-wrapper">
            <div style="width:100%;height:70px;"></div>
            <!-- 菜单具体展示内容 -->
            <LeftNav v-model="selection"/>
          </div>
        </div>
      </aside>
      <!-- 主页面容器 -->
      <div class="mui-inner-wrap">
        <!-- 主页面标题 -->
        <div class="mui-content mui-scroll-wrapper cloud-wrap">
          <div class="mui-scroll right-wrapper" style="height:100%;">
            <!-- 主界面具体展示内容 -->
            <CheckWork v-if="String(selection) === '0'"/>
            <OfficeGit v-else-if="String(selection) === '1'"></OfficeGit>
            <Vsources v-else-if="String(selection) === '2'"></Vsources>
            <Examine v-else-if="String(selection) === '3'"></Examine>           <RunnerClub v-else-if="String(selection) === '4'"></RunnerClub>
            <BadmintonClub v-else-if="String(selection) === '5'"></BadmintonClub>  
          </div>
        </div>  
      </div>
    </div>
  </div>
</template>
<script>
import OfficeGit from '../two/OfficeGit'
import LeftNav from './LeftNav'
import CheckWork from '../two/CheckWork'
import Vsources from '../two/Vsources'
import Examine from '../two/Examine'
import RunnerClub from '../two/RunnerClub'
import BadmintonClub from '../two/BadmintonClub'
export default {
  components: {
    LeftNav,
    OfficeGit,
    CheckWork,
    Vsources,
    Examine,
    RunnerClub,
    BadmintonClub
  },
  props: ['className'],
  data() {
    return {
      selection: '0'
    }
  },
  watch: {
    selection(now, old) {
      mui('.offsider-controll')
        .offCanvas()
        .close()
    }
  },
  created() {
    this.$nextTick(() => {
      mui('.mui-off-canvas-wrap')
        .offCanvas()
        .refresh()
      if (window.innerWidth < 375) {
        mui('.cloud-wrap').scroll({
          deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        })
      }
    })
  }
}
</script>
<style lang="less" scoped>
.content {
  .mui-off-canvas-wrap:not(.mui-slide-in).mui-scalable {
    background-color: #84898f;
  }
  .mui-off-canvas-left {
    background-color: #84898f;
  }
  height: 100%;
  .mui-content {
    background-color: #fff;
  }
  .mui-active + .mui-transitioning {
    .mui-content {
      border-radius: 10px;
    }
  }
  .left-wrapper {
    padding: 0 0 0 10%;
  }
}
</style>