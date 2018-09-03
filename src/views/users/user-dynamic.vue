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
         <div class="mui-scroll-wrapper dynamic-list-content" ref="dynamic-list">
           <ul class="mui-scroll dynamic-list-ul">
              <li class="dynamic-list-item" v-for="(item,index) in listData" :key="index">
                <!-- 头部 -->
                <div class="mui-row">
                  <!-- 头像 -->
                  <div class="item-head">
                    <img :src="item.user && item.user.headImg"/>
                  </div>
                  <div class="item-txt">
                    <!-- 名称 -->
                    <span class="nick">{{ item.user && item.user.nickName }}</span>
                    <!-- 时间 -->
                    <span class="time">{{ item.create_at}}</span>
                  </div>
                </div>
                <!-- 身体 -->
                <div class="matter-desc mui-row">{{ item.speech }}</div>
                <!-- 有分享显示分享，没分享，显示相册-->
                <!-- 来自发表的相册 -->
                <!-- 来自分享的动态 -->
                <div class="mui-row publishing" v-if="Object.keys(item.forwardingDynamics).length > 0 && item.forwardingDynamics.album.length > 0">
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

                <div class="matter-album"   v-else>
                  <ul class="matter-album-list mui-clearfix">
                    <li class="matter-album-list-item" v-for="(element,index) in (item && item.album[0]) || []" :key="index">
                      <img :src="element"/>
                      <div class="dumming"></div>
                    </li>
                  </ul>
                </div>

                <div class="phone-model" v-if="item.mobileType !== ''" ><p>{{ item.mobileType }}</p></div>
                <!-- 底部功能 -->
                <div class="mui-row">
                  <div class="tools-bar">
                    <a href="#" data-icon="👍" class="button orange drop glass"></a>
                    <a href="#" data-icon="✍" class="button green"></a>
                    <a href="#" data-icon="✿" title="Reddit" class="button green serif back xl glass icon"></a>
                  </div>
                  <div class="leave-msg" @click="sendLeaveMsg">
                    <span class="comment">评论</span>
                    <i class="iconfont icon-tianjiabiaoqing"></i>
                  </div>
                </div>
              </li>
           </ul>
           <Publish @reLoadDynamics="queryUserAndFriendsDynamic" v-model="showModal"></Publish>
         </div>
    </div>
</template>
<script>
import Publish from './common/publish'
export default {
  components: {Publish},
  props: ["headImg", "nickName", "descPerson"],
  data() {
    return {
      showModal: false,
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
      },
      listData: [
        {
          headImg: '',
          nickName: '',
          create_at: '',
          speech: '',
          album: [],
          mobileType: '',
          forwardingDynamics: {}
        }
      ]
    };
  },
  mounted() {
    this.$nextTick(() => {
      // 基于准备好的dom，初始化echarts实例
      const echarts = require("echarts");
      const myChart = echarts.init(this.$refs["sixStart"]);
      myChart.setOption(this.optionChar);
      this.queryUserAndFriendsDynamic()
      mui(this.$refs['dynamic-list']).scroll({
        deceleration: 0.0005, // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false // 是否显示滚动条
      });
    });
  },
  methods: {
    sendLeaveMsg() {      
      this.showModal = true;
    },
    queryUserAndFriendsDynamic() {
      const data = {userId:app.globalService.getLoginUserInfo()._id}
      app.api.userDynamic.queryUserAndFriendsDynamic({
        data,
        success: res => {
          if (res.message === 'success') {
            this.listData = res.dynamicList.map(item => {
              item.user.headImg = app.getResourceUrl(item.user.headImg)
              item.album[0] = Object.keys(item.album[0]).map( element => {
                return app.getResourceUrl(item.album[0][element])
              })
              return item
              })
          }
        },
        complete: () => {
        }
      })
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../../css/button.less");
[data-page="user-dynamic"] {
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
  .matter-album-list-item {
    width: calc(~ '(100% - 2px) / 3');
    float: left;
    margin-right: 1px;
    position: relative;
    .dumming {
      padding-top: 100%; 
    }
    & > img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  .matter-album-list-item:nth-child(3n) {
    margin-right: 0px;
  }
}
</style>