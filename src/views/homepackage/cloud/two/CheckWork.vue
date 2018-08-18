<template>
    <div  class="checkwork" ref="checkwork">
    	<!-- 卡 包 -->
      <div class="info-head">
        <div class="mui-card">
          <!--内容区-->
          <div class="mui-card-content">
            <div class="img-box" style="width: 80px;margin: 0 auto;">
              <img src="../../../../imgs/test/head-img.jpg" style="width:100%;height:100%;max-width:100%;max-height:100%;"/>
            </div>
            <p style="text-align:center;color:#fff;font-size:12px;">上班了，心情特别好，<br>关注油猪。</p>
          </div>
          <!--页脚，放置补充信息或支持的操作-->
          <div class="mui-card-footer mui-segmented-control mui-segmented-control-inverted mui-segmented-control-primary" id="segmentedControl">
            <a class="mui-card-link mui-control-item mui-active" href="#checkworkSlider1" v-touch:tap="openTabs(0)">考勤打卡</a>
            <a class="mui-card-link mui-control-item" href="#checkworkSlider2" v-touch:tap="openTabs(1)">查看日志</a>
            <a class="mui-card-link mui-control-item" href="#checkworkSlider3" v-touch:tap="openTabs(2)">关注油猪</a>
			    </div>
        </div>
      </div>
      <div class="info-container" style="top:200px">
        <div id="checkworkSlider1" class=" mui-control-content mui-active">
            <Attendance v-if="tabState === 0"/>
        </div>
        <div id="checkworkSlider2" class="mui-control-content">
            <ViewLog v-if="tabState === 1" />
        </div>
        <div id="checkworkSlider3" class="mui-control-content">
            <CarePeople v-if="tabState === 2"></CarePeople>
        </div>
      </div>
    </div>
</template>
<script>
import Attendance from './Attendance'
import ViewLog from './ViewLog'
import CarePeople from './CarePeople'
export default {
  components: { Attendance, ViewLog , CarePeople},
  data() {
    return {
      tabState: 0
    }
  },
  created() {},
  methods: {
    openTabs(tabState) {
      // this.tabState = state
      return (event, start, end) => {
        this.tabState = tabState
      }
    }
  }
}
</script>
<style lang="less" scoped>
.checkwork {
  .info-head {
    height: 200px;
    background-color: #007aff;
    width: 100%;
    box-shadow: 20px 10px 20px rgba(0, 0, 0, 0.2),
      -20px 10px 20px rgba(0, 0, 0, 0.2);
    position: relative;
    .mui-card {
      margin: 0;
      background-color: transparent;
      box-shadow: unset;
      position: absolute;
      bottom: 0;
      width: 100%;
      .mui-card-content {
        .img-box > img {
          border-radius: 15px;
        }
      }
      .mui-card-link {
        color: #fff;
      }
      .mui-card-footer {
        padding: 10px 10% 0 10%;
      }
      .mui-card-link.mui-active {
        border-bottom: 3px solid #fff;
      }
    }
    .mui-card-header:after,
    .mui-card-footer:before {
      content: unset;
    }
  }
  .mui-control-content.mui-active {
    height: calc(~'100vh - 244px');
  }
}
</style>