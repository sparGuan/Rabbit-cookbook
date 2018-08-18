<template>
  <div data-page="user-collection" class="mui-content">
    <!-- tab标签项-->
    <!-- 关注我的 -->
    <!-- 我关注的 -->
    <div ref="user-collection-slider" class="mui-slider" data-slider="4">
				<div ref="sliderSegmentedControl" class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<a class="mui-control-item mui-active" href="#myAttention">
				    关注我的
          </a>
          <a class="mui-control-item" href="#attentionMine">
            我关注的
          </a>
				</div>
        <!-- 选中线条-->
				<div class="mui-slider-group">
					<div  id="myAttention" class="mui-control-content mui-active">
              <div class="mui-scroll-wrapper user-collection-scroll-wrapper">
                  <div class="mui-scroll">
                    <ul class="mui-table-view">
                      <li class="mui-table-view-cell">
                        <!-- 头像 -->
                        <div class="myAttention-item-head">
                          <img src="../../imgs/user-center-banner2.jpg">
                        </div>
                        <!-- 消息框 -->
                        <div class="myAttention-item-msg">
                            <p class="myAttention-item-msg-name">
                              安抚
                            </p>
                            <p class="myAttention-item-msg-desc">
                              啦啦啦啦啦，早晨
                            </p>
                        </div>
                        <!-- 时间和获关注次数 -->
                        <div class="myAttention-item-amount">
                            <p class="myAttention-item-amount-time">
                              上午9:32
                            </p>
                            <p class="myAttention-item-amount-num">
                              <i class=" iconfont icon-guanzhu" style="font-size:18px;    font-size: 19px;color: #666;"></i>
                            </p>
                        </div>
                      </li>
                    </ul>
                  </div>
              </div>
          </div> 
          <div id="attentionMine" class="mui-control-content">
            <div class="mui-scroll-wrapper user-collection-scroll-wrapper">
              <div class="mui-scroll">
                  <ul class="mui-table-view">
                      <li class="mui-table-view-cell">
                        <!-- 头像 -->
                        <div class="myAttention-item-head">
                          <img src="../../imgs/user-center-banner2.jpg">
                        </div>
                        <!-- 消息框 -->
                        <div class="myAttention-item-msg">
                            <p class="myAttention-item-msg-name">
                              安抚
                            </p>
                            <p class="myAttention-item-msg-desc">
                              啦啦啦啦啦，早晨
                            </p>
                        </div>
                        <!-- 时间和获关注次数 -->
                        <div class="myAttention-item-amount">
                            <p class="myAttention-item-amount-time">
                              上午9:32
                            </p>
                            <p class="myAttention-item-amount-num">
                              <i class=" iconfont icon-guanzhu" style="font-size:18px;    font-size: 19px;color: #666;"></i>
                            </p>
                        </div>
                      </li>
                    </ul>
              </div>
            </div>
          </div>
			  </div>
    </div>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    this.$nextTick(() => {
      mui(document.querySelector('.user-collection-scroll-wrapper')).scroll({
        deceleration: 0.0005, // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false // 是否显示滚动条
      });
    });
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.mui-fullscreen .mui-segmented-control ~ .mui-slider-group {
    position: relative;
    top: unset;
    bottom: unset;
    width: 100%;
    height: auto
  }
[data-page='user-collection'] {  
  .mui-control-content {
    height: calc(~'100vh - 85px');
  }
  .mui-table-view-cell:after {
    left: 0px;
  }
  .mui-slider
    .mui-segmented-control.mui-segmented-control-inverted
    .mui-control-item.mui-active {
    border-bottom: 2px solid #007aff;
  }
  .mui-segmented-control.mui-segmented-control-inverted {
    padding: 0 10%;
  }
  .myAttention-item-msg,.myAttention-item-head,.myAttention-item-amount {
    display: inline-block;
  }
  .myAttention-item-amount {
    text-align: right;
  }
  .myAttention-item-msg {
    width: calc(~'100% - 105px');
  }
  .mui-table-view-cell {
        padding: 5px 15px;
  }
  .myAttention-item-head {
    width: 40px;
    height: 40px;
    vertical-align: top;
    & > img {
      width: 100%;
      height: 100%;
    }
  }
  .myAttention-item-msg-desc {
    font-size:12px;
  }
}
</style>