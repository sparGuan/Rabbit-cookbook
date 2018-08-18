<template>
<!-- 上图下文型列表 -->
<div class="vertical-list">
  <ul class="mui-table-view">
    <li class="mui-table-view-cell mui-media">
        <a href="javascript:;">
            <img class="mui-media-object mui-pull-left" src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1640985633,1986305664&fm=58&bpow=512&bpoh=512">
            <div class="mui-media-body">
                时空猎人
                <p class='mui-ellipsis tabs'>时空之旅 | RPG手游 | 即时</p>
            </div>
            <span class="mui-badge mui-badge-success">下载</span> 
        </a>
    </li>
    <li class="mui-table-view-cell mui-media">
        <a href="javascript:;">
            <img class="mui-media-object mui-pull-left" src="https://img11.18183.com/ku18183/image/2018/01/16/47c89b6c02377312714e705e2d4da41c.jpg">
            <div class="mui-media-body">
                QQ飞车
                <p class='mui-ellipsis tabs'>赛车 | 飘移 | 竞速 | 原班人马</p>
            </div>
            <span class="mui-badge mui-badge-success">下载</span>
        </a>
    </li>
    <li class="mui-table-view-cell mui-media">
        <a href="javascript:;">
            <img class="mui-media-object mui-pull-left" src="https://img11.18183.com/ku18183/image/2018/04/10/b5055e17929cc7e6fdd32dfbacd8ec78.jpg">
            <div class="mui-media-body">
                孤岛
                <p class='mui-ellipsis tabs'>挑战 | 生存</p>
            </div>
            <span class="mui-badge mui-badge-success">下载</span>
        </a>
    </li>
    <li class="mui-table-view-cell mui-media">
        <a href="javascript:;">
            <img class="mui-media-object mui-pull-left" src="https://img11.18183.com/ku18183/image/2017/12/01/e4a9ff38644a707bf32547e5eebf5a60.jpg">
            <div class="mui-media-body">
                绝地求生：刺激战场
                <p class='mui-ellipsis tabs'>正版还原 | 大吉大利 | 组队开黑</p>
            </div>
            <span class="mui-badge mui-badge-success">下载</span>
        </a>
    </li>
    <li class="mui-table-view-cell mui-media">
        <a href="javascript:;">
            <img class="mui-media-object mui-pull-left" src="https://img.18183.com/uploads/160427/130-16042G10Zc17.jpg">
            <div class="mui-media-body">
                王者荣耀
                <p class='mui-ellipsis tabs'>MOBA | 最强王者</p>
            </div>
            <span class="mui-badge mui-badge-success">下载</span>
        </a>
    </li>
    <li class="flooter">完整榜单<i class="mui-icon mui-icon-arrowright"></i></li>
  </ul>
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
.vertical-list {
  .mui-media-body {
    font-size: 14px;
  }
  .mui-icon-arrowright {
    font-size: 14px;
  }
  .mui-badge {
    padding: 5px 10px;
    border-radius: 3px !important;
    line-height: 1;
  }
  .tabs {
    font-size: 12px;
  }
  .flooter {
    font-size: 12px;
    color: #333;
    padding: 15px;
  }
}
</style>