<template>
  <!-- 好友列表展示 -->
	<div class="friendsList-view-menu" ref="friendsListViewMenu">
      <div ref="menu-wrapper" class="menu-wrapper fade-out-up animated hidden">
        <div ref="menu" class="menu bounce-out-up animated">
          <ul class="mui-table-view mui-table-view-inverted">
            <li class="mui-table-view-cell mui-collapse">
              <a href="javascript:void(0)" >
                <svg class="icon" style="width: 2em;
                height: 2em;
                vertical-align: bottom;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="646"><path d="M569.37617493 690.67919787c0-12.4848096 1.23306773-24.73841813 3.4680032-36.68376 0.92480107-4.93226987-1.5413344-9.78747413-6.08827093-11.86827627-37.5314944-17.72534613-60.11204373-42.23256427-60.1120448-66.9709824 0-11.94534187 4.8552032-22.96588373 15.18214507-34.9112256 4.1616032-3.9304032 8.01493973-8.01493973 11.94534186-12.40774187C567.98897387 488.76438293 587.79512213 432.89100907 587.79512213 374.78269973c0-114.67528427-74.2152544-207.6948192-165.46225493-207.6948192-91.24700053 0-165.46225493 93.01953493-165.46225387 207.6948192 0 65.04431467 23.42828373 124.77102507 64.1195136 163.8438528v0.2312c8.47733973 8.24613973 18.57308053 21.34748267 18.57308054 37.45442774 0 28.05228693-31.2120224 56.0275072-81.76779414 72.82805333-0.2312 0.2312-0.4624 0.2312-0.6936 0.2312-7.09013867 1.84960107-13.56374293 3.6992032-23.19708373 6.62773867C128.78571947 689.9855968 63.2790048 749.7123072 55.26406507 817.45395733c-2.23493547 18.6501472 12.87014293 34.98829227 31.5973568 34.98829227h534.14945813c9.8645408 0 14.41147733-11.79120853 7.39840533-18.80428053-36.45256-36.52962667-59.0331104-87.08539733-59.0331104-142.9587712z" fill="#007aff" p-id="647"></path><path d="M794.17980693 507.4915968c-96.48753707 0-174.71026133 78.22272427-174.71026133 174.71026133 0 96.48753707 78.22272427 174.71026133 174.71026133 174.71026134 96.48753707 0 174.71026133-78.22272427 174.71026134-174.71026134 0-96.48753707-78.22272427-174.71026133-174.71026134-174.71026133z m98.72247254 195.05587627h-75.9107232v78.3768576H776.60859413V702.54747307H695.4573344v-40.46002987h81.07419307v-78.6080576h40.38296213v78.6080576h75.91072213v40.46002987z" fill="#007aff" p-id="648"></path></svg>
                <span style="margin-left: 1px;">新朋友</span>
              </a>
              <div class="mui-collapse-content" style="padding-bottom:0;">
               <div class="mui-content" style="max-width: 320px; margin: 0 auto;background: none;"  >
                    <form action @submit.prevent="searchNewFriends">
                      <div class="mui-input-row mui-search" :class="activeSearchToClass?'mui-active':''" @click="activeSearchStatus(true)">
                          <input type="search" class="mui-input-clear search-friends" :placeholder="activeSearchToClass?'请搜索好友手机号':''" data-input-clear="15" data-input-search="15" ref="searchFriends"  @blur="activeSearchStatus(false)" v-model="Mobile"><span class="mui-icon mui-icon-clear mui-hidden" ></span><span class="mui-placeholder"><span class="mui-icon mui-icon-search"></span><span></span></span>
                      </div>
                    </form>
                    <ul class="search-golost-list">
                      <li class="golost-list-item" style="border-bottom:1px solid #eee;">
                        <div>
                          <i class="iconfont icon-saoyisao"></i>
                          <p>扫码添加</p>
                        </div>
                      </li>
                      <li class="golost-list-item">
                        <div>
                        <i class="iconfont icon-chaxuntiaojian" ></i>
                        <p>按条件查找</p>
                        </div>
                      </li>
                    </ul>

                    <div class="search-list" v-if="newFirendsList.length > 0">
                      <ul>
                        <li v-for="item in newFirendsList" :key="item._id">
                          <div class="firendDetil">
                            <img :src="item.headImg"/>
                            <div class="search-user-info">
                              <p class="search-user-nick" v-html="item.nickName"></p>
                              <p class="search-user-desc" v-html="item.descPerson"></p>
                            </div>
                          </div><div class="send" ref="send">
                            <div class="send-indicator">
                              <div class="send-indicator-dot"></div>
                              <div class="send-indicator-dot"></div>
                              <div class="send-indicator-dot"></div>
                              <div class="send-indicator-dot"></div>
                            </div>
                            <button class="send-button" ref="sendButton" @click="requestToAddOne">
                              <div class="sent-bg" ref="sentBg"></div>
                              <svg ref="sendIcon" class="icon send-icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="45406"><path d="M768 0H256C115.2 0 0 115.2 0 256v512c0 140.8 115.2 256 256 256h512c140.8 0 256-115.2 256-256V256c0-140.8-115.2-256-256-256zM182.4 246.4c-28.8 0-51.2-22.4-51.2-51.2 0-28.8 22.4-51.2 51.2-51.2 28.8 0 51.2 22.4 51.2 51.2 0 27.2-24 51.2-51.2 51.2z m555.2 316.8H563.2V736c0 28.8-24 51.2-51.2 51.2s-51.2-24-51.2-51.2V563.2H286.4c-28.8 0-51.2-24-51.2-51.2s24-51.2 51.2-51.2h172.8V286.4c0-28.8 24-51.2 51.2-51.2s51.2 24 51.2 51.2v172.8h172.8c28.8 0 51.2 24 51.2 51.2s-20.8 52.8-48 52.8z" fill="#FF943F" p-id="45407"></path></svg>
                              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="0" height="0">
                                <defs>
                                  <filter id="goo">
                                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
                                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo"></feColorMatrix>
                                    <feComposite in="SourceGraphic" in2="goo" operator="atop"></feComposite>
                                  </filter>
                                  <filter id="goo-no-comp">
                                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
                                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo"></feColorMatrix>
                                  </filter>
                                </defs>
                              </svg>
                              <i class="iconfont icon-icon-test1 sent-icon" ref="sentIcon"></i>
                            </button>
                              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="0" height="0">
                                  <defs>
                                    <filter id="goo">
                                      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
                                      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo"></feColorMatrix>
                                      <feComposite in="SourceGraphic" in2="goo" operator="atop"></feComposite>
                                    </filter>
                                    <filter id="goo-no-comp">
                                      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
                                      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo"></feColorMatrix>
                                    </filter>
                                  </defs>
                                </svg>
                            </div>
                        </li>
                      </ul>
                    </div>  

                  </div>
              </div>
            </li>
            <li class="mui-table-view-cell mui-collapse" v-for="item in friendsListDefault" :key="item.id">
              <a class="mui-navigate-right" href="javascript:void(0)" >
                <span> {{item.title}} </span>
              </a>
              <div class="mui-collapse-content">
                <div v-if="item.id === '0'">
                  <ul>
                    <li v-for="elem in geoNearFriends" :key="elem._id" class="geoNearfriends-item">
                      <div class="geonear-head-img" :style="'background-image:url('+elem.headImg+');'"></div>
                      <div class="geonear-content">
                          <p class="geonear-nick" v-html="elem.nickName"></p>
                          <p class="geonear-desc" v-html="elem.descPerson"></p>
                          <!-- 添加 -->
                          <div class="add-new-geonearfriend" @click="sendToAdd(elem._id)"></div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div ref="menu-backdrop" class="menu-backdrop" style="opacity: 0;" @click="toggleMenu" ></div>
	</div>
</template>
<script>
import { TweenMax } from 'gsap';
export default {
  props: ['value'],
  data() {
    return {
      geoNearFriends: [],
      Mobile: '',
      newFirendsList: [],
      friendsListDefault: [
        {
          id: '0',
          title: '附近的人'
        },
        {
          id: '1',
          title: '我的好友'
        },
        {
          id: '2',
          title: '团队'
        },
        {
          id: '3',
          title: '家庭'
        }
      ],
      isShowMenuModal: false,
      activeSearchToClass: false,
      showNewFriendsList: false,
      menuWrapper: null,
      menu: null,
      menuWrapperClassList: null,
      backdrop: null,
      busying: false,
      locked: false,
      sendButton: null,
      sendIcon: null,
      sentIcon: null,
      sentBg: null,
      indicatorDots: null,
      circle: []
    };
  },
  watch: {
    value(now, old) {
      this.isShowMenuModal = now;
    },
    isShowMenuModal(now, old) {
      this.isShowMenuModal = now;
      if (this.isShowMenuModal) {
        this.toggleMenu();
      }
      this.$emit('input', this.isShowMenuModal);
    }
  },
  mounted() {
    this.menuWrapper = this.$refs['menu-wrapper'];
    this.menu = this.$refs['menu'];
    this.menuWrapperClassList = this.menuWrapper.classList;
    this.backdrop = this.$refs['menu-backdrop'];
    mui.collapseOpenBack = this.collapseOpenBack
  },
  methods: {
    sendToAdd(acceptUserId) {
      this.$socket.emit(
            'addFriendRequestById',
            acceptUserId,
            app.globalService.getLoginUserInfo()._id
          );
    },
    collapseOpenBack(index) {
      if (index === 2) {
        console.log(index)
        this.loadPeopleNearBy()
      }
    },
    loadPeopleNearBy() {
      if (app.globalService.getLoginUserInfo()._id) {
        // 请求后台获取附近的人的信息，已年龄作为分界线，16-22岁的排前
        const data = {userId: app.globalService.getLoginUserInfo()._id}
        app.api.userFriends.loadPeopleNearBy({
          data,
          success: res => {
            if (res.message === 'success') {
              this.geoNearFriends = res.userList
              console.log(console.log(res))
            } else {
              // 没有搜到用户
            }
          }
        })
      }
    },
    setGoo() {
      this.setFilter('url(#goo)');
    },
    setFilter(filter) {
      this.$refs['send'][0].style.cssText +=
        'webkitFilter: filter; mozFilter: filter;filter: filter';
    },
    setGooNoComp() {
      this.setFilter('url(#goo-no-comp)');
    },
    setupCircle($obj, index) {
      if (typeof this.circle[index] === 'undefined') {
        //  $obj.data('circle', { radius: 0, angle: 0 });
        this.circle[index] = { radius: 0, angle: 0 };
        const updateCirclePos = () => {
          const circle = this.circle[index];
          TweenMax.set($obj, {
            x: Math.cos(circle.angle) * circle.radius,
            y: Math.sin(circle.angle) * circle.radius
          });
          requestAnimationFrame(updateCirclePos);
        };
        updateCirclePos();
      }
    },
    startCircleAnim($obj, index, radius, delay, startDuration, loopDuration) {
      this.setupCircle($obj, index);
      this.circle[index].radius = 0;
      this.circle[index].angle = 0;
      // $obj.data('circle').radius = 0;
      // $obj.data('circle').angle = 0;
      TweenMax.to(this.circle[index], startDuration, {
        delay: delay,
        radius: radius,
        ease: Quad.easeInOut
      });
      TweenMax.to(this.circle[index], loopDuration, {
        delay: delay,
        angle: Math.PI * 2,
        ease: Linear.easeNone,
        repeat: -1
      });
    },
    stopCircleAnim($obj, index, duration) {
      TweenMax.to(this.circle[index], duration, {
        radius: 0,
        ease: Quad.easeInOut,
        onComplete: () => {
          TweenMax.killTweensOf(this.circle[index]);
        }
      });
    },
    // 调用接口给双方增加一个备用的ID字段，存储发送增加好友请求
    requestToAddOne() {
      this.sendButton = this.$refs['sendButton'];
      this.sendIcon = this.$refs['sendIcon'][0];
      this.sentIcon = this.$refs['sentIcon'][0];
      this.sentBg = this.$refs['sentBg'];
      // this.indicatorDots = mui('.send-button,.send-indicator-dot');
      // console.log(this.indicatorDots)
      if (this.locked) {
        return;
      }
      this.locked = true;
      TweenMax.to(this.sendIcon, 0.3, {
        x: 100,
        y: -100,
        ease: Quad.easeIn,
        onComplete: () => {
          this.setGooNoComp();
          this.sendIcon.style.display = 'none';
          // 这里开始发送sockiet请求
          this.$socket.emit(
            'addFriendRequest',
            this.Mobile,
            app.globalService.getLoginUserInfo()._id
          );
        }
      });
      TweenMax.to(this.sendButton, 0.6, {
        scale: 0.5,
        ease: Back.easeOut
      });
      mui('.send-button,.send-indicator-dot').each((i, item) => {
        this.startCircleAnim(item, i, 30, 0.1, 1 + i * 0.2, 1.1 + i * 0.3);
      });
      setTimeout(() => {
        // success anim start
        // close circle
        mui('.send-button,.send-indicator-dot').each((i, item) => {
          this.stopCircleAnim(item, i, 0.8 + i * 0.1);
        });
        TweenMax.to(this.sentBg, 0.7, {
          delay: 0.7,
          opacity: 1
        });
        // show icon
        setTimeout(() => {
          this.setGoo();
          TweenMax.fromTo(
            this.sentIcon,
            1.5,
            {
              display: 'inline-block',
              opacity: 0,
              scale: 0.1
            },
            {
              scale: 1,
              ease: Elastic.easeOut
            }
          );
          TweenMax.to(this.sentIcon, 0.5, {
            delay: 0,
            opacity: 1
          });
          TweenMax.to(this.sendButton, 0.3, {
            scale: 1,
            ease: Back.easeOut
          });
        }, 1000);
      }, 3000 + Math.random() * 3000);
    },
    searchNewFriends() {
      if (this.Mobile !== '') {
        const data = { Mobile: this.Mobile };
        app.api.userFriends.searchNewFriends({
          data,
          success: res => {
            if (res.message === 'success') {
              res.user.headImg = app.getResourceUrl(res.user.headImg);
              this.newFirendsList = [res.user];
            } else {
              mui.toast(res.message);
            }
          }
        });
      } else {
        return;
      }
    },
    activeSearchStatus(status) {
      if (status) {
        this.$refs['searchFriends'].focus();
        this.activeSearchToClass = status;
      } else if (
        this.$refs['searchFriends'] &&
        this.$refs['searchFriends'].value !== ''
      ) {
        this.$refs['searchFriends'].focus();
        this.activeSearchToClass = true;
      } else {
        this.activeSearchToClass = status;
      }
    },
    toggleMenu() {
      if (this.busying) {
        return;
      }
      this.busying = true;
      if (this.menuWrapperClassList.contains('mui-active')) {
        this.$refs['friendsListViewMenu'].classList.remove('menu-open');
        this.newFirendsList = [];
        this.Mobile = '';
        this.menuWrapper.className = 'menu-wrapper fade-out-up animated';
        this.menu.className = 'menu bounce-out-up animated';
        setTimeout(() => {
          this.backdrop.style.opacity = 0;
          this.menuWrapper.classList.add('hidden');
          this.isShowMenuModal = false;
        }, 500);
      } else {
        this.$refs['friendsListViewMenu'].classList.add('menu-open');
        this.menuWrapper.className =
          'menu-wrapper fade-in-down animated mui-active';
        this.menu.className = 'menu bounce-in-down animated';
        this.backdrop.style.opacity = 1;
      }
      setTimeout(() => {
        this.busying = false;
      }, 500);
    }
  }
};
</script>
<style lang="less" scoped>
@import url('./send.less');
@import url('./friendsListViewMenu.less');
.geoNearfriends-item {
  text-align: left;
  display: block;
  position: relative;
}
.geonear-head-img {
    width: 35px;
    height: 35px;
    background-size: cover;
    border-radius: 50%;
    display: inline-block;
    vertical-align: middle;
}
.geonear-content {
    display: inline-block;
    width: calc(~'100% - 40px');
    vertical-align: middle;
    text-align: left;
    padding-left: 10px;
    border-bottom: 1px solid #eee
}
.add-new-geonearfriend {
  width: 43px;
    height: 43px;
    right: 0;
    position: absolute;
    top: -1px;
}
</style>