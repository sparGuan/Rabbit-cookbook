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
                    <li class="community-item" v-for="item in CommunityItem" :key="item.index" :style="'transform:translate3d('+item.index * -25+'px,0px,0px)'"></li>
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
const testCommunity = Array.from(
  require('@/js/data/testCommunity-user-center.json')
);
const testfabu = Array.from(require('@/js/data/testfabu.json'));
export default {
  name: 'user-waveContnet',
  props: ['value','isShowMenuModal'],
  data() {
    return {
      isShowFriendsListMenus: false,
      CommunityItem: testCommunity,
      rowData: testfabu,
      rowData: testfabu
    };
  },
   computed: {
    isActive: function () {
      return this.isShowFriendsListMenus = this.isShowMenuModal
    }
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当钩子执行前，组件实例还没被创建
    next(vm => {
      if (from.name === 'userActivity' && Object.keys(vm.$route.params).length > 0 && vm.$route.params.activityInfo && vm.$route.params.saveStatus) {
        vm.$route.params.activityInfo.bgBanner = app.getResourceUrl(vm.$route.params.activityInfo.bgBanner)
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
      if (app.globalService.isLogin() && this.$store.state.appData .keepLivesConfig.isReFlashActivityInfoList ) {
        // 用户id
        this.getUserActivityInfoList(app.globalService.getLoginUserInfo()._id)
        this.$store.dispatch('updateKeepLivesConfig', {isReFlashActivityInfoList:false});
      }
    })
  },
  methods: {
    showFriendsListMenus() {
      this.isShowFriendsListMenus = true
      this.$emit('showFriendsListMenus',this.isShowFriendsListMenus)
    },
    // 浏览活动
    visitActivity(activityInfo) {
        activityInfo.uploadBoxPic = app.getResourceUrl(activityInfo.uploadBoxPic)
        activityInfo.ruleBg = app.getResourceUrl(activityInfo.ruleBg)
      this.$router.push({ name: 'userActivity', params: {activityInfo}})
    },
    // 打开用户中心的时候获取用户创建的活动
    getUserActivityInfoList(userId) {
        let data = { userId };
        app.api.userActivity.queryUserActivityInfo({
          data,
          success: data => {
            if(data.message === 'success'){
              data.activityList.forEach( item => {
                item.bgBanner = app.getResourceUrl(app.getResourceUrl(item.bgBanner))
                this.rowData.push(item);
              })
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
      box-shadow: 0px 0px 15px rgba(0,0,0,.2) inset, 0 0 15px rgba(0,0,0,.1);
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
    }
</style>