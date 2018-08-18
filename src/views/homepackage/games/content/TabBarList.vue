<template>
<div class="tab-bar-list pd-tb-10">
        <div class="mui-row bar">
            <div class="mui-col-sm-3 mui-col-xs-3 text-center ser-line">
                <i class="mui-icon mui-icon-star"></i>
                <span>新游</span>
            </div>
            <div class="mui-col-sm-3 mui-col-xs-3 text-center ser-line">
                <i class="mui-icon mui-icon-list" style="vertical-align: bottom;"></i>
                <span>分类</span>
            </div>
            <div class="mui-col-sm-3 mui-col-xs-3 text-center ser-line">
                <i class="icon-sort-amount-desc"></i>
                <span>排行</span>
            </div>
            <div class="mui-col-sm-3 mui-col-xs-3 text-center ser-line">
                <i class="icon-gift"></i>
                <span>礼包</span>
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
  mounted() {},
  components: {}
}
</script>
<style lang="less" scoped>
.tab-bar-list {
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  .ser-line:not(:last-child) {
    border-right: 1px solid #eee;
  }
  .bar {
    i,
    span {
      display: inline-block;
      vertical-align: middle;
    }
  }
}
</style>