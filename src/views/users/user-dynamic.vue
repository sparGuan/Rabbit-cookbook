<template>
    <div  data-page="user-dynamic" class="user-dynamic" ref="user-dynamic" >
         <header class="clearfix">
            <div ref="sixStart" class="sixStart"></div>
            <div class="bot-rel">
                <div class="samll-head">
                  <img :src="(acceptUser && acceptUser.headImg | getUrl) || `${require('@/imgs/userCenter/touxiangDefault.png')}`"/>
                </div>
            </div>
            <div  class="descDetail">
              <h5 class="txt" >{{acceptUser && acceptUser.nickName}}</h5>
              <p class="txt">{{acceptUser &&  acceptUser.descPerson}}</p>
            </div>
         </header>
         <div class="mui-scroll-wrapper dynamic-list-content" ref="dynamic-list">
           <ul class="mui-scroll dynamic-list-ul" >
              <li class="dynamic-list-item" v-for="(item,index) in listData" :key="index">
                <!-- 头部 -->
                <div class="mui-row">
                  <!-- 头像 -->
                  <div class="item-head">
                    <img :src="(item.user && item.user.headImg | getUrl) || `${require('@/imgs/userCenter/touxiangDefault.png')}`"/>
                  </div>
                  <div class="item-txt">
                    <!-- 名称 -->
                    <span class="nick">{{ item.user && item.user.nickName }}</span>
                    <!-- 时间 -->
                    <span class="time">{{ item.create_at}}</span>
                  </div>
                </div>
                <!-- 身体 -->
                <div class="matter-desc mui-row" v-html="item.speech"></div>
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
                      <div class="dumming">
                        <img :src="element"/>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="phone-model" v-if="item.phoneBy !== ''" ><p>{{ item.phoneBy }}</p></div>
                <!-- 评论 -->
                <div class="comment-container" v-if="item.dynamicCommentList && item.dynamicCommentList.length > 0">
                  <ul class="comment-list" v-for="(item,index) in item.dynamicCommentList" :key="index">
                    <li class="comment-list-item">
                      <div class="comment-list-item-wrapper">
                        <!-- 箭头 -->
                        <div class="arrow-to-top"></div>
                        <span class="comment-name" v-text="`${item.nickName}：`"></span>
                        <p class="comment-content" v-text="item.speech"></p>
                      </div>
                    </li>
                  </ul>                  
                </div>
                <!-- 底部功能 -->
                <div class="mui-row">
                  <div class="tools-bar">
                    <!-- 点赞 -->
                    <a href="javascript:void(0)" @click="thumbsUp(item)">
                      <i class="iconfont icon-icon rollIcon" 
                      :class="isZan || item.hasZan? 'active':''"
                      ></i>
                      <span class="thumbs-mount" v-if="item.meta.totalPraise > 0" v-text="item.meta.totalPraise" />
                      <transition name="slide-fade">
                        <span v-if="showAdditive">+ 1</span>
                      </transition>
                    </a>
                    <a href="javascript:void(0)" @click="shareToFoot(item)">
                      <i class="iconfont icon-jiaoya rollIcon" :class="isShare  || item.hasShare? 'active':''"></i>
                    </a>
                    <a  href="javascript:void(0)" @click="shareAction" >
                      <i class="iconfont icon-pengyouwang rollIcon" 
                      :class="isZuJi? 'active':''"
                      style="font-size: 18px;"></i>
                    </a>
                  </div>
                  <div class="leave-msg" @click="sendLeaveMsg(item._id)">
                    <span class="comment">评论</span>
                    <svg class="icon" style="width: 2em; height: 2em;    position: absolute;right: -5px;padding-bottom: 3px;
                    top: -1px;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="72010"><path d="M793.6 824.0128l-399.36-230.4c-52.9408-30.72-95.8464-112.64-95.8464-183.0912v-232.448C298.5984 107.52 341.504 75.0592 394.24 105.6256l399.36 230.4c52.9408 30.72 95.8464 112.64 95.8464 183.0912v232.2944c0.1536 70.7072-42.752 103.1168-95.8464 72.6016z" fill="#007aff" p-id="72011"></path><path d="M853.6064 830.3616l-164.2496 94.7712v-240.9472l164.2496-94.8224v240.9984zM328.3456 343.6544L164.1472 438.4768V197.5296l164.1984-94.8224v240.9472z" fill="#007aff" p-id="72012"></path><path d="M629.76 918.3744l-399.36-230.4c-52.9408-30.72-95.8464-112.64-95.8464-183.0912v-232.448c0-70.5536 42.9056-103.0144 95.8464-72.448l399.36 230.4c52.9408 30.72 95.8464 112.64 95.8464 183.0912v232.2944c-0.2048 70.7072-43.1104 103.168-95.8464 72.6016z" fill="#007aff" p-id="72013"></path><path d="M506.624 746.5984L221.6448 389.2736l-2.0992 380.16 287.0784-22.8352z" fill="#007aff" p-id="72014"></path><path d="M354.56 498.6368c0 34.4576-24.1664 48.4352-54.016 31.1808S246.4768 470.7328 246.4768 436.2752s24.1664-48.4352 54.016-31.1808 54.0672 59.0848 54.0672 93.5424zM498.6368 581.8368c0 34.4576-24.1664 48.4352-54.016 31.1808s-54.016-59.136-54.016-93.5424S414.72 471.04 444.6208 488.2944s54.016 59.0848 54.016 93.5424zM642.7648 665.0368c0 34.4576-24.1664 48.4352-54.016 31.1808s-54.016-59.136-54.016-93.5424 24.1664-48.4352 54.016-31.1808 54.016 59.0848 54.016 93.5424z" fill="#DCDDDD" p-id="72015"></path><path d="M625.6128 700.8256l-28.8768 16.64v-42.3424l28.8768-16.6912v42.3936zM552.2944 609.1776l-28.8768 16.6912v-42.3936l28.8768-16.64v42.3424zM481.4848 617.472l-28.8768 16.6912v-42.3936l28.8768-16.64v42.3424zM408.1664 525.8752l-28.8768 16.6912v-42.3936l28.8768-16.6912v42.3936zM336.4352 534.8864l-28.8768 16.6912v-42.3936l28.8768-16.64v42.3424zM263.1168 443.2896l-28.8768 16.64v-42.3424l28.8768-16.6912v42.3936z" fill="#DCDDDD" p-id="72016"></path><path d="M325.0688 515.7376c0 34.4576-24.1664 48.4352-54.016 31.1808S217.0368 487.7824 217.0368 453.376s24.1664-48.4352 54.016-31.1808S325.0688 481.28 325.0688 515.7376zM469.1456 599.04c0 34.4576-24.1664 48.4352-54.016 31.1808s-54.016-59.2384-54.016-93.6448 24.1664-48.4352 54.016-31.1808S469.1456 564.48 469.1456 599.04zM613.2736 682.1376c0 34.4576-24.1664 48.4352-54.016 31.1808S505.2416 654.1824 505.2416 619.52s24.1664-48.4352 54.016-31.1808 54.016 59.3408 54.016 93.7984z" fill="#F6F6F6" p-id="72017"></path></svg>
                  </div>
                </div>
              </li>
           </ul>
           <Publish @reLoadDynamics="queryUserAndFriendsDynamic" v-model="showModal" :dynamicId="dynamicId"></Publish>
         </div>
    </div>
</template>
<script>
import Publish from './common/publish';
const echarts = require('echarts');
export default {
  components: { Publish },
  props: ['acceptUser'],
  watch: {
     'acceptUser': {
          handler:function(newValue,oldValue){
              this.queryUserAndFriendsDynamic(newValue.acceptUserId,app.globalService.getLoginUserInfo()._id);
          },
          deep:true,
      },
      // 'listData': {
      //    handler:function(newValue,oldValue){  
      //         if (newValue.length > 0) {
      //           // newValue.
      //           this.
      //         }
      //   },
      //   deep:true,
      // }
  },
  data() {
    return {
      myChart: null,
      zanMount: 0,
      shares: {}, // 分享的数据？
      isZan: false, // 点赞中
      isShare:false,
      isZuJi:false,
      showAdditive:false,
      dynamicId: '',
      showModal: false,
      optionChar: {
        title: {},
        tooltip: {
          trigger: 'axis'
        },
        calculable: true,
        polar: [
          {
            name: { show: true, textStyle: { fontSize: 16, color: '#32cd32' } },
            indicator: [
              { name: '帖子', max: 100, color: '#fff' },
              { name: '获赞', max: 100, color: '#fff' },
              { name: '天数', max: 100, color: '#fff' },
              { name: '分享', max: 100, color: '#fff' },
              { name: '收藏', max: 100, color: '#fff' }
            ],
            center: ['50%', '60%'],
            radius: 60 //半径，可放大放小雷达图
          }
        ],
        series: [
          {
            type: 'radar', //图表类型 radar为雷达图
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#87cefa',
                  width: 1
                },
                areaStyle: {
                  color: '#87cefa',
                  type: 'default'
                }
              }
            },
            symbolSize: 3,
            tooltip: {
              trigger: 'item',
              triggerOn: 'none'
            },
            data: [
              {
                value: [0, 0, 0, 0, 0, 0]
              }
            ]
          }
        ]
      },
      listData: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(this.$refs['sixStart']);
      // 此处需求需要更改，点击传入userId,然后才去获取数据源
      // update by 2018/11/26
      mui(this.$refs['dynamic-list']).scroll({
        deceleration: 0.0005, // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false // 是否显示滚动条
      });
      mui.plusReady(() => {
          plus.share.getServices((s) => {
            console.log('进入分享服务。。。。')
            if (s && s.length > 0) {
              for (var i = 0; i < s.length; i++) {
                var t = s[i];
                shares[t.id] = t;
              }
            }
          }, () => {
            console.log("获取分享服务列表失败");
          });
      });
    });
  },
  methods: {
    /**
     * @param {object} 分享到足迹 动态数据
     * @param {userId} 用户Id
     * @param {acceptUserId} 被请求Id
     * 一个用户一条动态只能分享一次
     */
    shareToFoot(dynamic) {
      this.isShare = true;
      // TODO：保存到足迹列表数据
      // 从足迹列表数据拉出数据
      // 分析数据结果
      // 生成足迹
      let linkType = 3;
      const data = {
        dynamicId: dynamic._id,
        userId: app.globalService.getLoginUserInfo()._id,
        acceptUserId: dynamic.user._id,
        type: 1,
        footprintType: 0, // 类型0为动态发布
        linkType,// 0代表图文类型
        sourceDataId: dynamic._id
      }
      app.api.customerGather.saveFootprint({
        data,
        success: res => {
          // if (res.success === 'success') {
          //   res.footprintAllList
          // }
          if (res.message === 'success') {
             app.mui.toast('成功分享到消息大厅！')
          }
         console.log(res)
        }
      })
    },
    // 实现点赞功能
    /**
     *  @param {object} dynamic 动态
     */
    thumbsUp(dynamic) {
      const data = {
        dynamicId: dynamic._id,
        userId: app.globalService.getLoginUserInfo()._id,
        acceptUserId:dynamic.user._id,
        type: 0
      }
      app.api.userDynamic.updateDynamicsZan({
        data,
        success: res => {
          if (res.message === 'success') {
            // 把更新好友关系的当前用户重新设置到缓存里去
            if (dynamic.meta.totalPraise) {
              ++dynamic.meta.totalPraise
            } else {
              dynamic.meta.totalPraise = 1
            }
            this.showAdditive = true
            this.isZan = true
            setTimeout( () => {
              this.showAdditive = false
            },500)
          }
        }
      });
    },
    shareAction() {
        const  ids = [{
					id: "weixin",
					ex: "WXSceneSession"
				}, {
					id: "weixin",
					ex: "WXSceneTimeline"
				}, {
					id: "qq"
				}],
				bts = [{
					title: "发送给微信好友"
				}, {
					title: "分享到微信朋友圈"
				}, {
					title: "分享到QQ"
        }];
        plus.nativeUI.actionSheet({
          cancel: "取消",
          buttons: bts
        }, (e) => {
          const i = e.index;
          if (i > 0) {
            const s_id = ids[i - 1].id;
            const share = shares[s_id];
            if (share.authenticated) {
              this.shareMessage(share, ids[i - 1].ex);
            } else {
              share.authorize(() => {
                this.shareMessage(share, ids[i - 1].ex);
              }, (e) => {
                console.log("认证授权失败：" + e.code + " - " + e.message);
              });
            }
          }
      });
    },
    shareMessage(share, ex) {
      var msg = {
        extra: {
          scene: ex
        }
      };
      // 分享出去之后，给一个href能够打开该分享页面的
      // 打开的是在服务器上跑的一个页面
      // 服务器上返回一个链接
      // 分享出去的是数据页
      msg.href = "http://www.dcloud.io/hellomui/";
      msg.title = "最接近原生APP体验的高性能前端框架";
      msg.content = "我正在体验HelloMUI，果然很流畅，基本看不出和原生App的差距";
      if (~share.id.indexOf('weibo')) {
        msg.content += "；体验地址：http://www.dcloud.io/hellomui/";
      }
      msg.thumbs = ["_www/images/logo.png"];
      share.send(msg, () => {
        console.log("分享到\"" + share.description + "\"成功！ ");
      }, (e) => {
        console.log("分享到\"" + share.description + "\"失败: " + e.code + " - " + e.message);
      });
		},
    sendLeaveMsg(dynamicId) {
      this.showModal = true;
      this.dynamicId = dynamicId;
    },
    /**
     * @param userId
     * @param acceptUserId
     */
    queryUserAndFriendsDynamic(userId,acceptUserId) {
      // 将此处的data改成动态
      // 由谁的用户id来决定谁的数据展示
      // 完成的时候将其删除
      // const data = { userId: app.globalService.getLoginUserInfo()._id };
      const data = { userId,acceptUserId };
      app.api.userDynamic.queryUserAndFriendsDynamic({
        data,
        success: res => {          
          if (res.message === 'success') {
            this.listData = res.dynamicList.map(item => {
              item.user.headImg = app.getResourceUrl(item.user.headImg);
              item.album[0] = item.album[0] && Object.keys(item.album[0]).map(element => {
                return app.getResourceUrl(item.album[0][element]);
              });
              this.zanMount += Number((item.meta.totalPraise || 0))
              return item;
            });            
          } else {
            this.listData = []
          }
          this.optionChar.series[0].data[0].value[1] = this.zanMount
          this.myChart.setOption(this.optionChar)
        },
        complete: () => {}
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import url('../../css/button.less');
[data-page='user-dynamic'] {
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all .5s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
    font-size: 18px;
    opacity: 0;
  }
  .drop.icon {
    padding-right: 0.6em;
  }
  .xl {
    font-size: 20px;
  }
  .button {
    padding: 0 10px;
    margin: 0;
    margin-right: 6px;
    margin-top: 6px;
    margin-bottom: 6px;
    font: 14px/1em 'Droid Sans', sans-serif;
    vertical-align: top;
    & > i {
      font-size: 22px;
    }
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
      width: calc(~'100% - 200px');
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
    height: calc(~'100% - 180px');
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
      padding-right: 10px;
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
          width: calc(~'100% - 85px');
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
        position: relative;
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
    width: calc(~'(100% - 2px) / 3');
    float: left;
    margin-right: 1px;
    position: relative;
    display: block;
    overflow: hidden;
    .dumming {
      padding-top: 100%;
      position: relative;
      & > img {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        max-width: 100%;
        max-height: 100%;
        margin: auto;
      }
    }
  }
  .matter-album-list-item:nth-child(3n) {
    margin-right: 0px;
  }
  .comment-list-item {
      position: relative;
      margin-top: 10px;
      .comment-list-item-wrapper {
        width: 100%;
        height: auto;
        background-color: #f3f3f3;
        padding: 5px;
        .comment-name {
          display: inline-block;
          color: #80c4ff;
        }
        .comment-content {
          display: inline-block;
          font-size: 12px;
        }
      }
  }
  .arrow-to-top {
    position: absolute;
    top: -5px;
    left: 10px;
    width: 0;
    height: 0;
    border-bottom: 5px solid #f3f3f3;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
  }
  .rollIcon {
        font-size: 24px;
        margin-right: 10px;
        color: #ccc;
        transition: all ease .3s;
  }
  .tools-bar {
    &>a {
      position: relative;
      .thumbs-mount {
        position: absolute;
        left: 20px;
        top: -17px;
        font-size: 12px;
        color: #ccc;
      }
      .rollIcon.active {
        color:#007aff;
        & + span {
          color: #007aff;
        }
      }
    }
  }
  
}
</style>