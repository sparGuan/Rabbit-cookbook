<template>
    <div class="head-container">
      <div class="left-title">佛山市亿动网络有限公司</div>
      <a class="drop-menu icon-blog" href="#dropmenu" id="opendropmenu">
      </a>
      <a class="notice icon-bell" ref="notice" v-touch:tap.stop="openNotice">
      </a>
      <div id="dropmenu" class="mui-popover">
        <div class="tip">同事们、朋友们 ：“快来关注我~~领红包啦”</div>
        <div class="drop-board">
            <textarea id="textarea" rows="5" placeholder="请输入" style="text-indent:1em;"></textarea>
             <button type="button" class="mui-btn mui-btn-primary btnplay" >发布</button>
              <button type="button" class="mui-btn mui-btn-danger btnplay" >红包</button>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {}
  },
  created() {},
  methods: {
    openNotice(e) {
      // 会造成输入法闪一下又没了
      var btnArray = [
        '回复',
        '下一条',
        '<span style="font-weight:normal;">关闭</span>'
      ]
      mui.prompt(
        '<div style="background-image:url(' +
          require('../imgs/publics/hongbao.png') +
          ');background-size:100%;background-repeat:no-repeat;padding-top:50px;    background-size: contain;background-repeat: no-repeat;    padding-top: 100px;background-position: center;"></div><br>你此刻的心情：',
        '哇塞,谢谢老板',
        '大吉大利',
        btnArray,
        function(e) {
          if (e.index == 0) {
            console.log(e.value)
            // info.innerText = '谢谢你的评语：' + e.value
          } else if (e.index == 1) {
            e.preventDefault()
            // info.innerText = '你点了取消按钮'
          } else {
          }
        }
      )
    }
  }
}
</script>
<style lang="less" scoped>
.head-container {
  .left-title {
    height: 100%;
    line-height: 44px;
    padding-left: 10%;
    font-size: 16px;
    font-family: 'Microsoft JhengHei';
    font-weight: bolder;
    text-align: left;
  }
  .tip {
    padding: 5px;
  }
  .drop-menu {
    width: 50px;
    height: 100%;
    top: 0;
    position: absolute;
    right: 50px;
    font-size: 20px;
    text-align: center;
    line-height: 44px;
  }
  .drop-board {
    width: 100%;
    height: 105px;
  }
  .notice {
    right: 0;
    position: absolute;
    width: 50px;
    height: 100%;
    line-height: 44px;
    top: 0;
    font-size: 20px;
    text-align: center;
  }
  .btnplay {
    top: -45px;
    left: calc(~'100% - 204px');
  }
}
</style>