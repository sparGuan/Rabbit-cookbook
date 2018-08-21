<template>
	<div data-page="user-center">
    <div class="mui-off-canvas-wrap mui-slide-in" ref="editDynamic">
    <!-- 主页面容器 -->
    <div class="mui-inner-wrap">
        <!-- 菜单容器 -->
        <aside class="mui-off-canvas-left">
          <div class="canvas-left">
              <!-- 菜单具体展示内容 -->
              <user-dynamic 
              :headImg="userInfo.headImg"  
              :nickName="userInfo.nickName"
              :descPerson="userInfo.descPerson"
              >
              </user-dynamic> 
          </div>
        </aside>
        <!-- 主页面内容容器 -->
        <div class="mui-content mui-scroll-wrapper">
          <div class="mui-off-canvas-backdrop" @click="closeOffCanvas" v-show="isMaskShow"></div>
          <div class="mui-scroll prepper">
            <!-- 主界面具体展示内容 -->
              <div class="page-content">
                <div class="banner">
                  <div class="bannerWrapper" :style="userInfo.headBgImg !== '' ?'background-image:url('+userInfo.headBgImg+')': ''">
                    <div class="circle-head-viewer">
                      <img :src="userInfo.headImg" />
                    </div>
                    <div class="adaim">{{userInfo.nickName}}</div>
                    <div class="desc-person">{{userInfo.descPerson}}</div>
                    <div>
                        <div class="switch-btn dynamic" @click="editDynamic($event)"><i class="iconfont icon-xingzhuang" style="margin-right: 5px;"></i>动态</div>
                        <div class="switch-btn modification" @click="editModification($event)">
                          <i class="iconfont  icon-gerenxinxi1" style="margin-right: 5px;"></i>认证</div>
                    </div>                            
                  </div>          
                </div>
                <div class="waveWrapper">
                    <!--css3实现波纹-->
                    <div class="waveWrapperInner bgTop">
                      <div class="wave waveTop" style="background-image: url('../../../src/imgs/userCenter/wave-top.png')"></div>
                    </div>
                    <div class="waveWrapperInner bgMiddle">
                      <div class="wave waveMiddle" style="background-image: url('../../../src/imgs/userCenter/wave-mid.png')"></div>
                    </div>
                    <!-- 左侧功能项 -->
                    <div class="tool-left">
                      <ul>
                        <li  
                            class="tool-item" 
                            v-for="(icon,index) in usertools" :key="index" :class="index === toolIndex ? 'tool-item-active': ''"
                            @click="hitTools($event,index)"
                        > 
                          <i class="ico-tool iconfont" :class="icon"></i>
                        </li>           
                      </ul>
                     </div><user-waveContnet></user-waveContnet>
                </div>     			
              </div>
          </div>
        </div>  
      </div>
      <!-- 点击弹出认证窗口 -->
      <user-authentication 
        v-model="isStartAuthentication" ></user-authentication>
      <!-- 底部弹出菜单上传照片 -->
     <div ref="sheet_upload" class="mui-popover mui-popover-bottom mui-popover-action prpo-bg">
        <!-- 可选择菜单 -->
        <ul class="mui-table-view">
          <li class="mui-table-view-cell">
            <i class="iconfont icon-paizhao" style="font-size: 24px;"></i>
            <div href="#" @click="takePhoto">拍照</div>
          </li>
          <li class="mui-table-view-cell">
            <!-- <i class="iconfont icon-xiangce"></i> -->
            <div href="#">取现有的</div>
          </li>
        </ul>
        <!-- 取消菜单 -->
        <ul class="mui-table-view">
          <li class="mui-table-view-cell">
            <div href="#sheet1" @click="closepopver"><b>取消</b></div>
          </li>
        </ul>
			</div>
    </div>
	</div>
</template>
<script>
import userDynamic from './user-dynamic';
import userAuthentication from './user-authentication';
import waveContnet from './common/waveContnet';
import takeH5Photos from '../../js/utils/takeH5Photos';
export default {
  name: 'userCenter',
  components: {
    'user-dynamic': userDynamic,
    'user-authentication': userAuthentication,
    'user-waveContnet': waveContnet
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当钩子执行前，组件实例还没被创建
    next(vm => {
      if (
        from.name === 'userSiteInfo' &&
        Object.keys(vm.$route.params).length > 0 &&
        vm.$route.params.user
      ) {
        const user = vm.$route.params.user;
        console.log(user)
        vm.userInfo.headImg = user.headImg;
        vm.userInfo.headBgImg = user.headBgImg;
        vm.userInfo.nickName = user.nickName;
        vm.userInfo.descPerson = user.descPerson;
      }
    });
  },
  // 从用户中心离开的所有操作都必须先判断是否已经登录
  beforeRouteLeave(to, from, next) {
    if (app.globalService.isLogin()) {
      next();
    } else if(to.name === 'home' || to.name === 'myCustomerGathers') {
      next();
    } else {
      mui.toast('请先登录');
    }
  },
  data() {
    return {
      userInfo: {
        nickName: '游客',
        headImg: require('../../../src/imgs/userCenter/touxiangDefault.png'),
        headBgImg: '',
        descPerson: '又到了奋斗的一天,哈趣到底，赶快去发布吧~'
      },
      // 先去完成用户登录后直接可以看见部分资料的代码
      usertools: Array.from(require('@/js/data/usertools.json')),
      money: 0,
      isMaskShow: false,
      isStartAuthentication: false,
      toolIndex: 0,
      dataBase64: '',
      takeH5Photos: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.userInfo = app.globalService.getLoginUserInfo();
      this.takeH5Photos = new takeH5Photos({ isSendToServer: true });
    });
  },
  methods: {
    closepopver() {
      mui(this.$refs['sheet_upload']).popover('hide');
    },
    hitTools(e, toolIndex) {
      this.toolIndex = toolIndex;
      switch (toolIndex) {
        case 0:
          this.takePhoto();
          break;
        case 1:
          this.collection();
          break;
        case 2:
          this.userInfoSite();
          break;
        case 3:
          this.multiplayerRoom();
          break;
        case 4:
          this.addActivity();
          break;
        default:
          break;
      }
    },
    // 添加活动
    addActivity() {
      this.$router.push({ name: 'userActivity' });
    },
    // 多人房间
    multiplayerRoom() {},
    // 用户资料设置
    userInfoSite() {
      this.$router.push({
        name: 'userSiteInfo',
        params: { userInfo:this.userInfo }
      });
    },
    // 关注数
    collection() {
      this.$router.push({ name: 'userCollection' });
    },
    //打开手机摄像头
    takePhoto() {
      this.takeH5Photos.createTask(() => {
        // 拍照上传后回调函数
      });
      this.takeH5Photos.openCamera();
    },
    closeOffCanvas() {
      this.isMaskShow = false;
    },
    editDynamic(e) {
      this.isMaskShow = true;
      mui(this.$refs['editDynamic'])
        .offCanvas()
        .show();
    },
    editModification(e) {
      this.isStartAuthentication = true;
    }
  }
};
</script>
<style lang="less" scoped>
@import url('../../../src/less/_mixins.less');
[data-page='user-center'] {
  .canvas-left {
    box-shadow: 0 0px 10px rgba(0, 0, 0, 0.3),
      -2px 0px 2px rgba(0, 0, 0, 0.4) inset;
  }
  .mui-off-canvas-left {
    background: #fff;
    width: 90%;
  }
  .prepper {
    height: 100%;
  }
  .wave {
    position: absolute;
    left: 0;
    width: 100%;
    height: 40px;
    top: -40px;
    background-position: -500px 0px;
  }
  .wave-scroll {
    left: 0;
    border-top-left-radius: 5px;
  }
  /*css3波纹*/
  .waveWrapperInner {
    z-index: 15;
    opacity: 0.9;
  }
  .waveTop {
    background-size: cover;
  }
  .waveMiddle {
    background-size: cover;
  }
  .banner {
    width: 100%;
    height: 185px;
    .bannerWrapper {
      position: relative;
      height: 100%;
      padding-top: 20px;
      background: linear-gradient(to bottom, #40b9fc, #f7f7f7) no-repeat center;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      .switch-btn {
        width: calc(~'50% - 30px');
        position: relative;
        color: rgba(255, 255, 255, 1);
        text-decoration: none;
        background-color: #007aff;
        font-family: 'Yanone Kaffeesatz';
        font-weight: 700;
        display: block;
        padding: 4px;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
        -webkit-box-shadow: 0px 9px 0px #0062cc, 0px 9px 25px rgba(0, 0, 0, 0.7);
        -moz-box-shadow: 0px 9px 0px #0062cc, 0px 9px 25px rgba(0, 0, 0, 0.7);
        box-shadow: 0px 9px 0px #0062cc, 0px 9px 25px rgba(0, 0, 0, 0.7);
        text-align: center;
        -webkit-transition: all 0.1s ease;
        -moz-transition: all 0.1s ease;
        -ms-transition: all 0.1s ease;
        -o-transition: all 0.1s ease;
        transition: all 0.1s ease;
        display: inline-block;
        margin-top: 2px;
        &.dynamic {
          float: left;
          margin-left: 20px;
        }
        &.modification {
          float: right;
          margin-right: 20px;
        }
        &:active {
          -webkit-box-shadow: 0px 3px 0px #007aff,
            0px 3px 6px rgba(0, 0, 0, 0.9);
          -moz-box-shadow: 0px 3px 0px #007aff, 0px 3px 6px rgba(0, 0, 0, 0.9);
          box-shadow: 0px 3px 0px #007aff, 0px 3px 6px rgba(0, 0, 0, 0.9);
          position: relative;
          top: 6px;
        }
      }
    }
    .desc-person {
      margin-top: 10px;
      text-align: center;
      color: #fff;
    }
    .adaim {
      text-align: center;
      margin-top: 10px;
      color: #fff;
    }
    .circle-head-viewer {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      margin: 0 auto;
      border: 2px solid #f3f3f3;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
      position: relative;
      &:before {
        position: absolute;
        top: -19px;
        left: 13px;
        content: '';
        width: 30px;
        height: 31px;
        background: url(../../imgs/userCenter/ava_deco1.png) no-repeat;
        background-size: cover;
      }
      &:after {
        position: absolute;
        bottom: -10px;
        left: 4px;
        content: '';
        width: 32px;
        height: 15px;
        background: url(../../imgs/userCenter/ava_deco2.png) no-repeat;
      }

      & > img {
        position: relative;
        max-width: 100%;
        max-height: 100%;
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
  .waveWrapper {
    height: calc(~'100% - 185px');
    position: relative;
    background-color: #fff;
    .tool-left {
      padding-right: 10px;
      width: 50px;
      display: inline-block;
      height: 100%;
      height: 100%;
      vertical-align: top;
      & > ul {
        height: 100%;
      }
      .tool-item {
        height: 20%;
        .justify-content(center);
        .flexbox();
        .align-items(center);
        .hairline(bottom,#eee);
        box-shadow: 1px 0px 1px rgba(0, 0, 0, 0.1) inset;
        position: relative;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        &.tool-item-active {
          background-color: #007aff;
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
          box-shadow: 1px 7px 15px rgba(0, 0, 0, 0.4);
          transition: all 0.5s ease;
          .hairline-remove(bottom);
          .ico-tool {
            color: #fff;
          }
        }
        .ico-tool {
          display: block;
          font-size: 24px;
          color: #999;
          display: block;
        }
      }
    }
    // .wra-contnet {
    //   width: calc(~'100% - 60px');
    //   margin-right: 10px;
    //   display: inline-block;
    //   height: calc(~'100% - 10px');
    //   border-radius: 5px;
    //   background: linear-gradient(to bottom, #fff, rgba(0, 122, 255, 0.1)),
    //     url(../../imgs/userCenter/bg.png) no-repeat center;
    //   background-position: 0px 0px;
    //   padding: 5px 10px;
    //   background-size: calc(~'100% + 88px');
    //   box-shadow: 0px 10px 1px #fff;
    //   max-height: 100%;
    //   left: auto;
    //   .title-treasure {
    //     padding: 10px 0 10px 10px;
    //     position: relative;
    //     & > i {
    //       font-size: 26px;
    //       color: #666;
    //     }
    //   }
    //   .treasure-item {
    //     position: relative;
    //     height: 135px;
    //     border-radius: 5px;
    //     margin: 5px;
    //     border-radius: 5px;
    //     background-size: cover;
    //     background-repeat: no-repeat;
    //     background-position: center;
    //     box-shadow: 1px 1px 5px rgba(10, 116, 236, 0.57);
    //     &.community-column {
    //       height: auto;
    //       border-radius: 0;
    //       border-radius: 5px;
    //       border-bottom-left-radius: 0px;
    //       border-top-right-radius: 0px;
    //       padding: 0;
    //     }
    //     .treasure-border {
    //       width: calc(~'50% - 20px');
    //       height: 65px;
    //       display: inline-block;
    //       margin-top: 10px;
    //     }
    //     .fem {
    //       font-size: 50px;
    //       color: #666;
    //       padding-right: 10px;
    //       display: inline-block;
    //     }
    //     .establish {
    //       display: inline-block;
    //       .icon-icon-test {
    //         font-size: 18px;
    //         color: rgba(10, 116, 236, 0.57);
    //         display: inline-block;
    //       }
    //       .establish-text {
    //         font-size: 12px;
    //         color: rgba(10, 116, 236, 0.57);
    //         letter-spacing: 1px;
    //       }
    //     }
    //     .community {
    //       display: inline-block;
    //       width: calc(~'100% - 115px');
    //       height: 41px;
    //       overflow: auto;
    //       white-space: nowrap;
    //       vertical-align: top;
    //       .community-item {
    //         width: 39px;
    //         height: 39px;
    //         background-color: blueviolet;
    //         display: inline-block;
    //         border-radius: 50%;
    //       }
    //     }
    //     .search-circle {
    //       position: absolute;
    //       right: 5px;
    //       top: 5px;
    //       background: transparent;
    //       box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
    //       padding: 5px 0px 0px 0px;
    //       border-radius: 3px;
    //       .icon-sousuo {
    //         font-size: 18px;
    //       }
    //     }
    //   }
    // }
  }
  .prpo-bg {
    z-index: 2001;
    background-color: rgba(51, 51, 51, 0.63);
  }
  .mui-table-view {
    box-shadow: 0 0 1px rgba(255, 255, 255, 0.8);
  }
}
</style>