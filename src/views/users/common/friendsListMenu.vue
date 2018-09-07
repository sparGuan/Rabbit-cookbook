<template>
  <!-- 好友列表展示 -->
	<div class="friendsList-view-menu" ref="friendsListViewMenu">
      <div ref="menu-wrapper" class="menu-wrapper fade-out-up animated hidden">
        <div ref="menu" class="menu bounce-out-up animated">
          <ul class="mui-table-view mui-table-view-inverted">
            <li class="mui-table-view-cell">
              <a href="javascript:void(0)">
                <svg class="icon" style="width: 2em;
                height: 2em;
                vertical-align: bottom;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="646"><path d="M569.37617493 690.67919787c0-12.4848096 1.23306773-24.73841813 3.4680032-36.68376 0.92480107-4.93226987-1.5413344-9.78747413-6.08827093-11.86827627-37.5314944-17.72534613-60.11204373-42.23256427-60.1120448-66.9709824 0-11.94534187 4.8552032-22.96588373 15.18214507-34.9112256 4.1616032-3.9304032 8.01493973-8.01493973 11.94534186-12.40774187C567.98897387 488.76438293 587.79512213 432.89100907 587.79512213 374.78269973c0-114.67528427-74.2152544-207.6948192-165.46225493-207.6948192-91.24700053 0-165.46225493 93.01953493-165.46225387 207.6948192 0 65.04431467 23.42828373 124.77102507 64.1195136 163.8438528v0.2312c8.47733973 8.24613973 18.57308053 21.34748267 18.57308054 37.45442774 0 28.05228693-31.2120224 56.0275072-81.76779414 72.82805333-0.2312 0.2312-0.4624 0.2312-0.6936 0.2312-7.09013867 1.84960107-13.56374293 3.6992032-23.19708373 6.62773867C128.78571947 689.9855968 63.2790048 749.7123072 55.26406507 817.45395733c-2.23493547 18.6501472 12.87014293 34.98829227 31.5973568 34.98829227h534.14945813c9.8645408 0 14.41147733-11.79120853 7.39840533-18.80428053-36.45256-36.52962667-59.0331104-87.08539733-59.0331104-142.9587712z" fill="#007aff" p-id="647"></path><path d="M794.17980693 507.4915968c-96.48753707 0-174.71026133 78.22272427-174.71026133 174.71026133 0 96.48753707 78.22272427 174.71026133 174.71026133 174.71026134 96.48753707 0 174.71026133-78.22272427 174.71026134-174.71026134 0-96.48753707-78.22272427-174.71026133-174.71026134-174.71026133z m98.72247254 195.05587627h-75.9107232v78.3768576H776.60859413V702.54747307H695.4573344v-40.46002987h81.07419307v-78.6080576h40.38296213v78.6080576h75.91072213v40.46002987z" fill="#007aff" p-id="648"></path></svg>
                <span style="margin-left: 1px;">新朋友</span>
              </a>
            </li>
            <li class="mui-table-view-cell mui-collapse" v-for="item in friendsListDefault" :key="item.id">
              <a class="mui-navigate-right" href="javascript:void(0)">
                <span> {{item.title}} </span>
              </a>
              <div class="mui-collapse-content">
                <h1>h1. Heading</h1>
                <h2>h2. Heading</h2>
                <h3>h3. Heading</h3>
                <h4>h4. Heading</h4>
                <h5>h5. Heading</h5>
                <h6>h6. Heading</h6>
                <p>
                  p. 目前最接近原生App效果的框架。
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div ref="menu-backdrop" class="menu-backdrop" style="opacity: 0;" @click="toggleMenu" ></div>
	</div>
</template>
<script>
export default {
  props: ['value'],
  data() {
    return {
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
      menuWrapper: null,
      menu: null,
      menuWrapperClassList: null,
      backdrop: null,
      busying: false
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
  },
  methods: {
    toggleMenu() {
      if (this.busying) {
        return;
      }
      this.busying = true;
      if (this.menuWrapperClassList.contains('mui-active')) {
        this.$refs['friendsListViewMenu'].classList.remove('menu-open');
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
@list-color:#f3f3f3;
.friendsList-view-menu {
  .mui-table-view-cell > a:not(.mui-btn) {
        text-align: left;
    font-size: 12px;
    & > span {
      margin-left: 30px;
    }
  }
  &.menu-open {
    .menu-backdrop {
      position: fixed;
      top: 0;
      bottom: 0;
      height: 100%;
      width: 100%;
      display: block;
      z-index: 998;
      background-color: rgba(0,0,0,.3);
    }
  }
  .mui-navigate-right:after {
    transform: rotate(-89deg);
    left: 20px;
    right: auto !important;
    top: 35%;
    transition: all 0.5s ease;
  }
  .mui-table-view-cell.mui-collapse.mui-active > .mui-navigate-right:after {
    transform: rotate(89deg);
    content: '\E583';
  }
  .mui-table-view-inverted {
    background-color: #fff;
  }
  .mui-table-view-inverted:before {
    background-color: @list-color;
  }
  .mui-table-view-inverted:after {
    background-color: @list-color;
  }
  .mui-table-view-inverted .mui-table-view-cell:after {
    background-color: @list-color;
  }
  .mui-table-view-inverted .mui-table-view-cell.mui-active {
    background-color: @list-color;
  }
  .mui-table-view-inverted .mui-table-view-cell > a:not(.mui-btn).mui-active {
    background-color: @list-color;
  }
  .animated {
    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
  @-webkit-keyframes bounceInDown {
    0%,
    60%,
    75%,
    90%,
    100% {
      -webkit-transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(0, 25px, 0);
      transform: translate3d(0, 25px, 0);
    }
    75% {
      -webkit-transform: translate3d(0, -10px, 0);
      transform: translate3d(0, -10px, 0);
    }
    90% {
      -webkit-transform: translate3d(0, 5px, 0);
      transform: translate3d(0, 5px, 0);
    }
    100% {
      -webkit-transform: none;
      transform: none;
    }
  }
  @keyframes bounceInDown {
    0%,
    60%,
    75%,
    90%,
    100% {
      -webkit-transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(0, 25px, 0);
      transform: translate3d(0, 25px, 0);
    }
    75% {
      -webkit-transform: translate3d(0, -10px, 0);
      transform: translate3d(0, -10px, 0);
    }
    90% {
      -webkit-transform: translate3d(0, 5px, 0);
      transform: translate3d(0, 5px, 0);
    }
    100% {
      -webkit-transform: none;
      transform: none;
    }
  }
  .bounce-in-down {
    -webkit-animation-name: bounceInDown;
    animation-name: bounceInDown;
  }
  @-webkit-keyframes fadeInDown {
    0%,
    60%,
    75%,
    90%,
    100% {
      -webkit-transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(0, 0px, 0);
      transform: translate3d(0, 0px, 0);
    }
    75% {
      -webkit-transform: translate3d(0, 0px, 0);
      transform: translate3d(0, 0px, 0);
    }
    90% {
      -webkit-transform: translate3d(0, 0px, 0);
      transform: translate3d(0, 0px, 0);
    }
    100% {
      -webkit-transform: none;
      transform: none;
    }
  }
  @keyframes fadeInDown {
    0%,
    60%,
    75%,
    90%,
    100% {
      -webkit-transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(0, 0px, 0);
      transform: translate3d(0, 0px, 0);
    }
    75% {
      -webkit-transform: translate3d(0, 0px, 0);
      transform: translate3d(0, 0px, 0);
    }
    90% {
      -webkit-transform: translate3d(0, 0px, 0);
      transform: translate3d(0, 0px, 0);
    }
    100% {
      -webkit-transform: none;
      transform: none;
    }
  }
  .fade-in-down {
    -webkit-animation-name: fadeInDown;
    animation-name: fadeInDown;
  }
  @-webkit-keyframes bounceOutUp {
    20% {
      -webkit-transform: translate3d(0, -10px, 0);
      transform: translate3d(0, -10px, 0);
    }
    40%,
    45% {
      opacity: 1;
      -webkit-transform: translate3d(0, 20px, 0);
      transform: translate3d(0, 20px, 0);
    }
    100% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
  }
  @keyframes bounceOutUp {
    20% {
      -webkit-transform: translate3d(0, -10px, 0);
      transform: translate3d(0, -10px, 0);
    }
    40%,
    45% {
      opacity: 1;
      -webkit-transform: translate3d(0, 20px, 0);
      transform: translate3d(0, 20px, 0);
    }
    100% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
  }
  .bounce-out-up {
    -webkit-animation-name: bounceOutUp;
    animation-name: bounceOutUp;
  }
  @-webkit-keyframes fadeOutUp {
    20% {
      -webkit-transform: translate3d(0, 0px, 0);
      transform: translate3d(0, 0px, 0);
    }
    40%,
    45% {
      opacity: 1;
      -webkit-transform: translate3d(0, 0px, 0);
      transform: translate3d(0, 0px, 0);
    }
    100% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
  }
  @keyframes fadeOutUp {
    20% {
      -webkit-transform: translate3d(0, 0px, 0);
      transform: translate3d(0, 0px, 0);
    }
    40%,
    45% {
      opacity: 1;
      -webkit-transform: translate3d(0, 0px, 0);
      transform: translate3d(0, 0px, 0);
    }
    100% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
  }
  .fade-out-up {
    -webkit-animation-name: fadeOutUp;
    animation-name: fadeOutUp;
  }
  .menu-open {
    height: 100%;
    width: 100%;
  }
  .mui-scroll-wrapper {
    position: absolute;
    top: 48;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
  }
  .menu-backdrop {
    display: none;
  }
  .menu-wrapper {
    position: absolute;
    top: 0px;
    left: 0;
    right: 0;
    z-index: 999;
    text-align: center;
    background-color: @list-color;
    width: 100%;
  }
  .menu-wrapper.hidden {
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
    z-index: -1;
  }
  .menu {
    width: 100%;
  }
  .menu .mui-table-view-inverted {
    color: gray;
    font-size: 19px;
  }
  .menu .mui-table-view-inverted .mui-table-view-cell:after {
    height: 2px;
    left: 0;
    right: 0;
  }
  .menu-wrapper.mui-active,
  .menu-wrapper.mui-active .menu {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
</style>