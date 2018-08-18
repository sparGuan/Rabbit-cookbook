<template>
<!-- 上图下文型列表 -->
<div class="below-list">
  <div class="title">- 热门 -</div>
  <ul class="mui-table-view mui-row">
    <li class="mui-table-view-cell mui-media mui-col-sm-4 mui-col-xs-4">
        <a href="javascript:;"  class="text-center">
            <img class="mui-media-object" src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1901829279,1991716501&fm=58&bpow=640&bpoh=634">
            <div class="mui-media-body">
                海岛骑兵
            </div>
        </a>
    </li>
    <li class="mui-table-view-cell mui-media mui-col-sm-4 mui-col-xs-4">
        <a href="javascript:;"  class="text-center">
            <img class="mui-media-object" src="https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=330327056,4278136571&fm=85&s=B68627E01A7386D60ECCA48F0300A0C2">
            <div class="mui-media-body">
                魔兽
            </div>
        </a>
    </li>
    <li class="mui-table-view-cell mui-media mui-col-sm-4 mui-col-xs-4">
        <a href="javascript:;" class="text-center">
            <img class="mui-media-object" src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2269510996,2587719118&fm=58&bpow=500&bpoh=800">
            <div class="mui-media-body">
                影之刃
            </div>
        </a>
    </li>
  </ul>
  <div class="footer">查看更多<i class="mui-icon mui-icon-arrowright"></i></div>
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
.below-list {
  .title {
    text-align: center;
    padding-top: 15px;
  }
  .mui-table-view {
    min-height: 85px;
  }
  .mui-table-view-cell:after {
    content: unset;
  }
  .footer {
    color: #333;
    font-size: 12px;
    padding-left: 15px;
    padding-bottom: 15px;
    .mui-icon-arrowright {
      font-size: 14px;
    }
  }
}
</style>