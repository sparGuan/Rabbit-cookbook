<template>
    <div class="wra-contnet mui-scroll-wrapper" ref="wra_contnet">
        <!-- 宝箱内部的是随机功能 -->
        <!-- 随机获得个人发布 -->
        <div class="mui-scroll wave-scroll">
            <!-- 我的圈子 -->            
            <div class="mui-row treasure-item  community-column">
                <div class="establish">
                  <i class="iconfont icon-icon-test"></i>
                  <!-- <span class="establish-text">创建</span> -->
                </div>
                <div class="community">
                  <ul style="padding-top:5px;" v-if="communicator.length > 0">
                    <!-- 好友聊天小头像-->
                    <li class="community-item" v-for="(item,index) in communicator" :key="item._id" :style="'transform:translate3d('+index * -15+'px,0px,0px);background-size:cover;background-repeat:no-repeat;background-position:center;background-image:url('+item.headImg+')'" @click="chatOrgetNewFriend(item)">
                      <!-- 新好友请求-->
                      <svg class="icon new-msg" v-if="item.newMsg" style="font-size: 44px;width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="68147"><path d="M512 512m-174.40768 0a174.40768 174.40768 0 1 0 348.81536 0 174.40768 174.40768 0 1 0-348.81536 0Z" fill="#F08943" p-id="68148"></path><path d="M491.64288 416.11264h39.87456v75.50976h76.36992v40.7552h-76.36992v75.50976h-39.87456v-75.50976h-75.53024v-40.7552h75.53024v-75.50976z" fill="#FFFFFF" p-id="68149"></path></svg>
                      <!-- 有新消息时 -->
                      <svg class="icon" v-if="item.isHasNewChating" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;position: absolute;
                      right: 0;
                      top: 0;
                      font-size: 12px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3914"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#FF2E24" p-id="3915"></path></svg>
                    </li>
                  </ul>
                </div>
                <div class="search-circle" @click="showFriendsListMenus">
                  <i class="iconfont" style="font-size:26px;color: #999;text-shadow: rgba(255, 255, 255, 0.8) 1px 2px 10px;transition: all .1s ease;" :style="isActive?'color:#007aff':'color: #999'" :class="isActive?'icon-haoyou':'icon-wodehaoyou'"></i>
                </div>
            </div> 
            <!-- id是作为排序字段存在的 -->
            <div class="mui-row treasure-item" v-for="item in rowData" :key="item.id" :style="'background-image:url('+item.bgBanner+')'" @click="visitActivity(item)"></div>                 
        </div>                 
  </div> 
</template>
<style lang="less" scoped>
</style>
<script>
export default {
  name: 'user-waveContnet',
  props: ['value', 'isShowMenuModal'],
  data() {
    return {
      byChatUser: null,
      isShowFriendsListMenus: false,
      communicator: [], // 好友和请求列表
      rowData: [
        {
          id: '0',
          bgBanner: require('../../../../src/imgs/userCenter/row0.png')
        },
        {
          id: '1',
          bgBanner: require('../../../../src/imgs/userCenter/row1.gif')
        },
        {
          id: '2',
          bgBanner: require('../../../../src/imgs/userCenter/row2.png')
        },
        {
          id: '3',
          bgBanner: require('../../../../src/imgs/userCenter/row3.png')
        }
      ]
    };
  },
  computed: {
    isActive: function() {
      return (this.isShowFriendsListMenus = this.isShowMenuModal);
    }
  },
  watch: {
    value(now,old) {
      console.log(this.byChatUser)
      if (!now && this.byChatUser) {
        const _this = this
         this.$store.commit('SOCKET_USER_HASNEWS',{user: this.byChatUser, isHasNewChating : false, Vue: _this, })
      }
    },
    '$store.state.appSocketIoSession.requestNewFriend': {
      handler: function(now, old) {
        const newCommunicators = Object.assign(now,{newMsg:true})
        this.communicator.push(newCommunicators);
      },
      deep: true // 深度监听
    },
    '$store.state.appSocketIoSession.newChatUser': {
      handler: function(now, old) {        
        this.communicator.forEach( (item,index) => {
          now.forEach( elem => {
            if (item._id === elem._id) {
              this.$set(this.communicator, index, elem)
              // this.communicator[index] = elem
            }
          })
        })
      },
      deep: true // 深度监听
    }
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当钩子执行前，组件实例还没被创建
    next(vm => {
      if (
        from.name === 'userActivity' &&
        Object.keys(vm.$route.params).length > 0 &&
        vm.$route.params.activityInfo &&
        vm.$route.params.saveStatus
      ) {
        vm.$route.params.activityInfo.bgBanner = app.getResourceUrl(
          vm.$route.params.activityInfo.bgBanner
        );
        vm.rowData.push(vm.$route.params.activityInfo);
      }
    });
  },
  mounted() {
    this.$nextTick(() => {
      mui(this.$refs['wra_contnet']).scroll({
        deceleration: 0.0005, // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false // 是否显示滚动条
      });
      // 发布数据追加需要用户ID。 封面截图  活动ID 发布该活动日期
      // 获取用户id查询该用户自己创建的活动
      // $store.keepLivesConfig.isReFlashActivityInfoList没有被访问过默认为true
      if (
        app.globalService.isLogin() &&
        this.$store.state.appData.keepLivesConfig.isReFlashActivityInfoList
      ) {
        // 用户id
        this.getUserActivityInfoList(app.globalService.getLoginUserInfo()._id);
        this.$store.dispatch('updateKeepLivesConfig', {
          isReFlashActivityInfoList: false
        }); // 清除缓存数据
      }
      this.getCommunicator()
    });
  },
  sockets: {
    // 发送请求消息的用户更新
    updateBothRelations_sent(acceptUser) {
      app.globalService.setUserInfo(acceptUser)
      this.communicator.push(acceptUser)
    },
    // 接收请求的频道，加入频道进行通讯
    onChatOne_sent(chatOne) {
      // 给setUser的头像增加一个new
      chatOne.Meta.forEach(element => {
        element.headImg = app.getResourceUrl(element.headImg)
      });
      this.$emit('changeChatList',chatOne)
    }
  },
  methods: {
    // 重新筛选数据结构
    getCommunicator() {
      const friends = app.globalService.getLoginUserInfo().friends || [];
      if (friends.length > 0) {
          friends.forEach( (item,index) => {
            if (this.$store.state.appSocketIoSession.newChatUser.length > 0) {
                this.$store.state.appSocketIoSession.newChatUser.forEach( elem => {
                  if (item._id === elem._id && elem.isHasNewChating) {
                    friends[index] = elem
                  }
              })
            }
          })
      }
      const requestList = this.getRequestList();
      this.communicator = [...friends, ...requestList];
      this.$emit('getCommunicatorList',this.communicator)
    },
    getRequestList() {  
      const requestFriendsList =
        app.globalService.getLoginUserInfo().requestList && app.globalService.getLoginUserInfo().requestList.map(item => {
          app.getResourceUrl(item.headImg);
          if (typeof item === 'object') {
            item.newMsg = true;
          }
          return item; // 刷新能拿到的数据
        }) || []; // 在数据库里面的好友信息
        // 获取从别得页面登录进来的数据
      return requestFriendsList
    },
    // 后面处理忽略之后的操作
    chatOrgetNewFriend(item) {
      // 如果是新朋友提示消息
      if (item.newMsg) {
        // 弹窗添加好友
        const btnArray = ['忽略', '是'];
        this.$layer
          .dialog({
            content: `${item.nickName}请求添加好友?`,
            btn: btnArray,
            shadeClose: false,
            contentClass: 'layer-content'
          }) // 如果有btn
          .then(res => {
            // res为0时是用户点击了左边  为1时用户点击了右边
            if (res > 0) {
              // 是              
              const acceptUserId = item._id
              const userId = app.globalService.getLoginUserInfo()._id
              const data = {acceptUserId,userId}
              app.api.userFriends.addNewFriend({
                data,
                success: res => {
                  if (res.message === 'success') {
                    // 把更新好友关系的当前用户重新设置到缓存里去
                    app.globalService.setUserInfo(res.relations.user)
                    this.getCommunicator()
                    // 通知请求用户，好友添加完成
                    this.$socket.emit('updateBothRelations',res.relations.acceptUser)
                    this.$set(item,'newMsg',false);
                  }
                }
              });
            }
          });
      } else {
        // 否则是旧好友，直接打开聊天窗口
        // 打开聊天窗
        // 点击之后先把他们拉到同一个组里面去
        // 发起新建组请求
        // chatID应该是在item里面的id
        // 去除消息提醒
        this.byChatUser = item
        this.$store.commit('SOCKET_USER_HASNEWS',{user: item, isHasNewChating : false})
        // this.$set(item,'isHasNewChating',false);
        this.$socket.emit('chatOne',item._id,app.globalService.getLoginUserInfo()._id)
        this.$emit('openChatcallBack', true)
      }
    },
    checkHasMobileInfo() {
      if (
        app.globalService.isLogin() &&
        app.globalService.getLoginUserInfo().Mobile
      ) {
        return true;
      }
      return false;
    },
    showFriendsListMenus() {
      if (this.checkHasMobileInfo()) {
        this.isShowFriendsListMenus = true;
        this.$emit('showFriendsListMenus', this.isShowFriendsListMenus);
      } else {
        app.mui.toast('请先完善个人信息');
      }
    },
    // 浏览活动
    visitActivity(activityInfo) {
      activityInfo.uploadBoxPic = app.getResourceUrl(activityInfo.uploadBoxPic);
      activityInfo.ruleBg = app.getResourceUrl(activityInfo.ruleBg);
      this.$router.push({ name: 'userActivity', params: { activityInfo } });
    },
    // 打开用户中心的时候获取用户创建的活动
    getUserActivityInfoList(userId) {
      let data = { userId };
      app.api.userActivity.queryUserActivityInfo({
        data,
        success: data => {
          if (data.message === 'success') {
            data.activityList.forEach(item => {
              item.bgBanner = app.getResourceUrl(
                app.getResourceUrl(item.bgBanner)
              );
              if (item.bgBanner.indexOf('src/imgs') > -1) {
                item.bgBanner = require('../../../../src/imgs/test/bgbingxue.png');
              }
              this.rowData.push(item);
            });
          }
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.icon {
       width: 1em; height: 1em;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
    }
.wra-contnet {
  width: calc(~'100% - 60px');
  margin-right: 10px;
  display: inline-block;
  height: calc(~'100% - 10px');
  border-radius: 5px;
  background: linear-gradient(to bottom, #fff, rgba(0, 122, 255, 0.1))  no-repeat center;
  background-position: 0px 0px;
  // padding: 5px 10px;
  background-size: calc(~'100% + 88px');
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2) inset, 0 0 15px rgba(0, 0, 0, 0.1);
  max-height: 100%;
  left: auto;
  .title-treasure {
    padding: 10px 0 10px 10px;
    position: relative;
    & > i {
      font-size: 26px;
      color: #666;
    }
  }
  .treasure-item {
    position: relative;
    height: 135px;
    border-radius: 5px;
    margin: 5px;
    border-radius: 5px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    box-shadow: 1px 1px 5px rgba(10, 116, 236, 0.57);
    &.community-column {
      height: auto;
      border-radius: 0;
      border-radius: 5px;
      border-bottom-left-radius: 0px;
      border-top-right-radius: 0px;
      padding: 0;
    }
    .treasure-border {
      width: calc(~'50% - 20px');
      height: 65px;
      display: inline-block;
      margin-top: 10px;
    }
    .fem {
      font-size: 50px;
      color: #666;
      padding-right: 10px;
      display: inline-block;
    }
    .establish {
      display: inline-block;
      .icon-icon-test {
        font-size: 18px;
        color: rgba(10, 116, 236, 0.57);
        display: inline-block;
      }
      .establish-text {
        font-size: 12px;
        color: rgba(10, 116, 236, 0.57);
        letter-spacing: 1px;
      }
    }
    .community {
      display: inline-block;
      width: calc(~'100% - 115px');
      height: 46px;
      overflow: auto;
      white-space: nowrap;
      vertical-align: top;
      width: calc(~'100% - 65px');
      .community-item {
        width: 39px;
        height: 39px;
        box-shadow: 0 0px 10px 5px #f3f3f3;
        background-color: blueviolet;
        display: inline-block;
        border-radius: 50%;
      }
    }
    .search-circle {
      position: absolute;
      right: 5px;
      top: 3px;
      background: transparent;
      padding: 5px 0px 0px 0px;
      border-radius: 3px;
      .icon-sousuo {
        font-size: 18px;
      }
    }
  }
  .new-msg {
    position: absolute;
    right: -15px;
    top: -18px;
  }
}
</style>