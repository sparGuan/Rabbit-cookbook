<template>
    <div  data-page="user-dynamic" class="user-dynamic" ref="user-dynamic">
         <header class="clearfix">
            <div ref="sixStart" class="sixStart"></div>
            <div class="bot-rel">
                <div class="samll-head">
                  <img :src="headImg"/>
                </div>
            </div>
            <div  class="descDetail">
              <h5 class="txt">{{nickName}}</h5>
              <p class="txt">{{descPerson}}</p>
            </div>
         </header>
         <div class="mui-scroll-wrapper dynamic-list-content">
           <ul class="mui-scroll dynamic-list-ul">
              <li class="dynamic-list-item">
                <!-- 头部 -->
                <div class="mui-row">
                  <!-- 头像 -->
                  <div class="item-head">
                    <img :src="headImg"/>
                  </div>
                  <div class="item-txt">
                    <!-- 名称 -->
                    <span class="nick">{{ nickName }}</span>
                    <!-- 时间 -->
                    <span class="time">{{ new Date()}}</span>
                  </div>
                </div>
                <!-- 身体 -->
                <div class="matter-desc mui-row">大爱node啊</div>
                <div class="matter-album"></div>
                <div class="mui-row publishing">
                  <div class="publishing-content">                    
                    <div class="publishing-l-img">
                      <img src="../../imgs/test/shuijiao.jpg"/>
                    </div>
                    <div class="publishing-r-txt">
                      <p>中国开发者现状：Java、R、JS最常用</p>
                      <small>来自【互联网+油站】</small>
                    </div>                    
                  </div>                  
                </div>
                <div class="phone-model"><p>来自Iphone6s 4G</p></div>
                <!-- 底部功能 -->
                <div class="mui-row">
                  <div class="tools-bar">
                    <a href="#" data-icon="👍" class="button orange drop glass"></a>
                    <a href="#" data-icon="✍" class="button green"></a>
                    <a href="#" data-icon="✿" title="Reddit" class="button green serif back xl glass icon"></a>
                  </div>
                  <div class="leave-msg">
                    <span class="comment">评论</span>
                    <i class="iconfont icon-tianjiabiaoqing"></i>
                  </div>
                </div>
              </li>
           </ul>
         </div>
    </div>
</template>
<script>
export default {
  components: {},
  props: ["headImg", "nickName", "descPerson"],
  data() {
    return {
      optionChar: {
        title: {},
        tooltip: {
          trigger: "axis"
        },
        calculable: true,
        polar: [
          {
            name: { show: true, textStyle: { fontSize: 16, color: "#32cd32" } },
            indicator: [
              { name: "帖子", max: 100, color: "#fff" },
              { name: "互赞", max: 100, color: "#fff" },
              { name: "天数", max: 100, color: "#fff" },
              { name: "分享", max: 100, color: "#fff" },
              { name: "收藏", max: 100, color: "#fff" }
            ],
            center: ["50%", "60%"],
            radius: 60 //半径，可放大放小雷达图
          }
        ],
        series: [
          {
            type: "radar", //图表类型 radar为雷达图
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#87cefa",
                  width: 1
                },
                areaStyle: {
                  color: "#87cefa",
                  type: "default"
                }
              }
            },
            symbolSize: 3,
            tooltip: {
              trigger: "item",
              triggerOn: "none"
            },
            data: [
              {
                value: [100, 30, 60, 60, 80, 80]
              }
            ]
          }
        ]
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      // 基于准备好的dom，初始化echarts实例
      let echarts = require("echarts");
      let myChart = echarts.init(this.$refs["sixStart"]);
      myChart.setOption(this.optionChar);
    });
  }
};
</script>
<style lang="less" scoped>
@import url("../../css/button.less");
[data-page="user-dynamic"] {
  .head-image-panel {

  }
  .drop.icon {
    padding-right: 0.6em;
  }
  .xl {
    font-size: 20px;
  }
  .button {
    padding: 3px;
    margin: 0.5rem;
    font: 14px/1em "Droid Sans", sans-serif;
  }
  .button:before {
    margin-right: 0;
  }
  header {
    .sixStart {
      width: 200px;
      height: 100%;
      float: left;
      z-index: 10;
    }
    .descDetail {
      height: 90px;
      float: right;
      width: calc(~"100% - 200px");
      margin-top: 90px;
      background-color: rgba(0, 0, 0, 0.4);
      padding: 5px;
      .txt {
        color: rgba(255, 255, 255, 0.8);
        font-size: 12px;
      }
    }
    height: 180px;
    background-image: url(../../imgs/userCenter/toubg.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: relative;
    .bot-rel {
      top: 0;
      text-align: right;
      position: absolute;
      width: 100%;
      height: 65px;
      .samll-head {
        background-color: #fff;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
        margin: 10px;
        display: inline-block;
        width: 40px;
        height: 40px;
        & > img {
          max-width: 100%;
          max-height: 100%;
          border-radius: 50%;
          width: 100%;
          height: 100%;
        }
      }
      h4 {
        display: inline-block;
        vertical-align: top;
        color: #fff;
        letter-spacing: 1px;
        padding-left: 5px;
      }
    }
  }
  .dynamic-list-content {
    height: calc(~"100% - 180px");
    margin-top: 180px;
    background-color: rgba(245, 245, 245, 0.6);    
    .mui-row {
      padding-bottom: 10px;
    }
    .dynamic-list-item {
      padding-top: 10px;
      margin-bottom: 10px;
      padding-left: 10px;
      background-color: #fff;
      .item-head {
        width: 30px;
        height: 30px;
        display: inline-block;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 10px;
        & > img {
          max-width: 100%;
          max-height: 100%;
          width: 100%;
          height: 100%;
        }
      }
      .item-txt {
        display: inline-block;
        vertical-align: top;
        .nick {
          display: block;
          font-size: 14px;
        }
        .time {
          font-size: 12px;
          color: #999;
        }
      }
      .matter-desc {
        color: #333;
      }
      .publishing {
        width: 100%;
        height: 80px;
        background-color: rgba(245, 245, 245, 0.6);
        .publishing-l-img {
          height: 80px;
          display: inline-block;
          width: 80px;
          position: relative;
          vertical-align: middle;
          & > img {
            width: 100%;
            height: 100%;
            max-width: 100%;
            max-height: 100%;
          }
        }
        .publishing-r-txt {
          display: inline-block;
          width: calc(~"100% - 85px");
          height: 80px;
        }
      }
      .tools-bar {
        text-align: right;
      }
      .phone-model {
        margin-top: 5px;
        & > p {
          font-size: 12px;
        }
      }
      .leave-msg {
        background-color: rgba(245, 245, 245, 0.6);
        height: 25px;
        margin-right: 8px;
        text-align: right;
        padding: 3px 0;
        color: #666;
        margin-top: 5px;
        .icon-tianjiabiaoqing {
          font-size: 18px;
        }
        .comment {
          font-size: 12px;
          color: #999;
          float: left;
          margin-left: 10px;
        }
      }
      .tipicon {
        font-size: 25px;
        color: #ded44f;
      }
    }
  }
}
</style>