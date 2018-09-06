<template>
  <!-- 好友列表展示 -->
	<div class="friendsList-view-menu">
      <div ref="menu-wrapper" class="menu-wrapper fade-out-up animated hidden">
        <div ref="menu" class="menu bounce-out-up animated">
          <ul class="mui-table-view mui-table-view-inverted">
            <li class="mui-table-view-cell">
              <a href="javascript:;">Item 1</a>
            </li>
            <li class="mui-table-view-cell">
              <a href="javascript:;">Item 2</a>
            </li>
            <li class="mui-table-view-cell">
              <a href="javascript:;">Item 3</a>
            </li>
            <li class="mui-table-view-cell">
              <a href="javascript:;">Item 4</a>
            </li>
            <li class="mui-table-view-cell">
              <a href="javascript:;">Item 5</a>
            </li>
            <li class="mui-table-view-cell">
              <a href="javascript:;">Item 6</a>
            </li>
            <li class="mui-table-view-cell">
              <a href="javascript:;">Item 7</a>
            </li>
          </ul>
        </div>
      </div>
      <div ref="menu-backdrop" class="menu-backdrop" style="opacity: 0;"></div>
	</div>
</template>
<script>
export default {
  props: ['value'],
  data() {
    return {
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
    this.backdrop = this.$refs['menu-backdrop']
  },
  methods: {
    toggleMenu() {
      if (this.busying) {
        return;
      }
      this.busying = true;
      if (this.menuWrapperClassList.contains('mui-active')) {
        document.body.classList.remove('menu-open');
        this.menuWrapper.className = 'menu-wrapper fade-out-up animated';
        this.menu.className = 'menu bounce-out-up animated';
        setTimeout(() => {
          this.backdrop.style.opacity = 0;
          this.menuWrapper.classList.add('hidden');
        }, 500);
      } else {
        document.body.classList.add('menu-open');
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
.friendsList-view-menu {
  .menu-open {
    .menu-backdrop {
      position: fixed;
      top: 0;
      bottom: 0;
      height: 100%;
      width: 100%;
      display: block;
      z-index: 998;
    }
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
  .menu-open .mui-scroll-wrapper {
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
  .menu-open .menu-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    display: block;
    z-index: 998;
  }
  .menu-wrapper {
    position: absolute;
    top: 48px;
    left: 0;
    right: 0;
    z-index: 999;
    text-align: center;
    background-color: #333;
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