<template>
<!-- 上图下文型列表 -->
<div class="single-list">
    <div class="title"><i class="icon-lanyrd" style="margin-right:5px;"></i>休闲一刻</div>
    <div class="mui-slider">
      <div class="mui-slider-group mui-slider-loop">
        <!--支持循环，需要重复图片节点-->
        <div class="mui-slider-item mui-slider-item-duplicate">
            <div class="mui-card">
                <div class="mui-card-header mui-card-media" >
                  <img src="http://image.game.uc.cn/2018/1/29/19326421_.png" class="head-sculpture">
                  <div class="mui-media-body">
                    小M
                    <p>发表于 2016-06-30 15:30</p>
                  </div>
                </div>
                <div class="mui-card-content" style="background-image:url('http://image.game.uc.cn/2018/1/15/19179500.jpg');padding-top:100%;background-size:contain;background-position:center;background-repeat:no-repeat;">
                </div>
                <div class="mui-card-footer">
                  <a class="mui-card-link">Like</a>
                  <a class="mui-card-link">Comment</a>
                  <a class="mui-card-link">Read more</a>
                </div>
		        </div>   
        </div>
        <div class="mui-slider-item">
          <div class="mui-card">
                <div class="mui-card-header mui-card-media" >
                  <img src="http://image.game.uc.cn/2018/1/29/19326421_.png" class="head-sculpture">
                  <div class="mui-media-body">
                    小M
                    <p>发表于 2016-06-30 15:30</p>
                  </div>
                </div>
                <div class="mui-card-content" style="background-image:url('http://image.game.uc.cn/2018/1/15/19179502.jpg');padding-top:100%;background-size:contain;background-position:center;background-repeat:no-repeat;">
                </div>
                <div class="mui-card-footer">
                  <a class="mui-card-link">Like</a>
                  <a class="mui-card-link">Comment</a>
                  <a class="mui-card-link">Read more</a>
                </div>
		        </div>
        </div>
        <!--支持循环，需要重复图片节点-->
      </div>
    </div>
</div>
</template>
<script>
export default {
  data() {
    return {}
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      let gallery = mui('.mui-slider')
      gallery.slider({
        interval: 5000 // 自动轮播周期，若为0则不自动播放，默认为0；
      })
    })
  },
  components: {}
}
</script>
<style lang="less" scoped>
.single-list {
  .title {
    padding-left: 15px;
    font-size: 12px;
    padding-top: 15px;
    color: #666;
  }
  .mui-card {
    box-shadow: 0 0px 2px rgba(0, 0, 0, 0.3);
  }
  .mui-slider .mui-slider-group .mui-slider-item img.head-sculpture {
    width: unset;
  }
}
</style>