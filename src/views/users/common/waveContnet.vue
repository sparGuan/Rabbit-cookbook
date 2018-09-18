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
                  <ul>
                    <!-- 好友聊天小头像-->
                    <li class="community-item" v-for="(item,index) in communicator" :key="item.id" :style="'transform:translate3d('+index * -25+'px,0px,0px);background-size:cover;background-repeat:no-repeat;background-position:center;background-image:url('+item.headImg+')'" @click="chatOrgetNewFriend(item)">
                      <svg class="icon new-msg" v-if="item.newMsg" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="648"><path d="M960 512a448 448 0 1 0-896 0A448 448 0 0 0 960 512z m-672.00000001 0a44.8 44.8 0 1 1 89.53600001-0.064A44.8 44.8 0 0 1 287.99999999 512z m179.20000001 0a44.8 44.8 0 1 1 89.536-0.064A44.8 44.8 0 0 1 467.2 512z m179.2 0a44.8 44.8 0 1 1 89.536-0.064A44.8 44.8 0 0 1 646.4 512z" fill="#d81e06" p-id="649"></path></svg>
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
const communicator = Array.from(
  require('@/js/data/testCommunity-user-center.json')
);
import { mapState } from 'vuex'
export default {
  name: 'user-waveContnet',
  props: ['value', 'isShowMenuModal'],
  data() {
    return {
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
  // watch: {
  //   addFriendData: function(old,now) {
  //     this.communicator.push(old)
  //     console.log(this.communicator)
  //   }
  // },
  computed: {
    ...mapState(['requestNewFriendsList']),
    isActive: function() {
      return (this.isShowFriendsListMenus = this.isShowMenuModal);
    },
    getRequestList: function() {
      const requestNewFriendsList = app.globalService.getLoginUserInfo().requestList.map( item => {
            app.getResourceUrl(item.headImg)
            return item
        } ) || []
      const NewFriendsList = this.requestNewFriendsList || []
      return [...requestNewFriendsList,...NewFriendsList]
    }
  },
  watch: {
    'requestNewFriendsList': function(now,old) {
      this.communicator.push(now)
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
        const friends = app.globalService.getLoginUserInfo().friends || []
        const requestList = this.getRequestList || []
        console.log(this.getRequestList)
        this.communicator = [...friends,...requestList]
      }
    });
  },
  methods: {
    // 后面处理忽略之后的操作
    chatOrgetNewFriend(item) {
      // 如果是新朋友提示消息
      if(item.isNew) {
        // 弹窗添加好友
        const btnArray = ['是', '忽略'];
        this.$layer.open({
          content: `${item.nickName}请求添加好友`,
          btn: btnArray,
          shadeClose: false,
          yes: () => {
            item.isNew = false
            this.$layer.open({
              content: '添加成功'
              ,time: 2
              ,skin: 'msg'
            });
            
          },
          no: () =>{

          }
        });
      } else {
        // 否则是旧好友，直接打开聊天窗口
        // 打开聊天窗
      }
    },
    checkHasMobileInfo() {
      if(app.globalService.isLogin() && app.globalService.getLoginUserInfo().Mobile) {
        return true
      }
      return false
    },
    showFriendsListMenus() {
      if (this.checkHasMobileInfo()) {
        this.isShowFriendsListMenus = true;
        this.$emit('showFriendsListMenus', this.isShowFriendsListMenus);
      } else {
        app.mui.toast('请先完善个人信息')
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
                console.log(item.bgBanner)
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
.wra-contnet {
  width: calc(~'100% - 60px');
  margin-right: 10px;
  display: inline-block;
  height: calc(~'100% - 10px');
  border-radius: 5px;
  background: linear-gradient(to bottom, #fff, rgba(0, 122, 255, 0.1)),
    url(../../../imgs/userCenter/bg.png) no-repeat center;
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
      height: 41px;
      overflow: auto;
      white-space: nowrap;
      vertical-align: top;
      .community-item {
        width: 39px;
        height: 39px;
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
    font-size: 16px;
    color: #d81e06;
    position: absolute;
    right: -3px;
    top: 0px;    
  }
}
</style>