<template>
    <div class="badminton" ref="badminton">
          <div class="mui-slider broadcast-gallery">
            <div class="mui-slider-group mui-slider-loop">
              <!--支持循环，需要重复图片节点-->
              <div class="mui-slider-item mui-slider-item-duplicate" style="background-image:url(../../../src/imgs/test/232.jpg);"></div>
              <div class="mui-slider-item" style="background-image:url(../../../src/imgs/test/232.jpg);"></div>
              <div class="mui-slider-item" style="background-image:url(../../../src/imgs/test/232.jpg);"></div>
              <!--支持循环，需要重复图片节点-->
              <div class="mui-slider-item mui-slider-item-duplicate" style="background-image:url(../../../src/imgs/test/232.jpg);"></div>
            </div>
          </div>
          <!-- 实现多组简易计分器 -->
          <div class="scorecard-room">
            <div class="scorecard">
              <div class="lable">主场分数</div>
              <!-- 画出一只小熊的模样 -->
              <div class="bear">
                <!-- 按钮1 -->
                <span class="mui-badge badge remove-badge">-</span>
                <span class="mui-badge badge add-badge">+</span>
                <div class="circle"></div>
              </div>
              <div class="bear">
                <!-- 按钮2 -->
                <div class=""></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
    </div>
</template>
<script>
export default {
  components: {},
  created() {
    //获得slider插件对象
    this.$nextTick(() => {
      let gallery = mui('.broadcast-gallery')
      gallery.slider({
        interval: 50000 //自动轮播周期，若为0则不自动播放，默认为0；
      })
    })
  }
}
</script>
<style lang="less" scoped>
.badminton {
  height: 100%;
  .mui-slider-group {
    height: 100%;
  }
  .broadcast-gallery {
    height: 150px;
    .mui-slider-item {
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      height: 100%;
    }
  }
  .bear {
    width: 100px;
    height: 100%;
    padding: 10px 10px 10px 10px;
    margin-left: 45px;
    .badge {
      width: 25px;
      height: 25px;
      font-size: 18px;
      text-align: center;
      display: inline-block;
      vertical-align: top;
      color: #fff;
    }
    .add-badge {
      line-height: 20px;
      float: left;
    }
    .remove-badge {
      line-height: 16px;
      float: right;
    }
    .circle {
      width: 60px;
      height: 60px;
      margin: 0 auto;
      margin-top: 20px;
      border-radius: 50%;
      background-color: #007aff;
    }
  }
  .scorecard-room {
    height: 120px;
    padding: 20px 5px 5px 5px;
    .lable {
      width: 100px;
      height: 30px;
      background-color: rgba(0, 0, 0, 0.85);
      border-radius: 15px;
      text-align: center;
      line-height: 30px;
      color: #fff;
      top: -15px;
      position: absolute;
      right: 15px;
      z-index: 999;
    }
    .scorecard {
      height: 100%;
      position: relative;
      background-color: #f5f5f5;
      box-shadow: 0 0 1px #666;
    }
  }
}
</style>