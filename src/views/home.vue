<template>
  <div data-page="home">
    <!-- <login-tool /> -->
    <div class="page-content avatar-holder" ref="avatarHolder">
      <article class="panel">
        <!-- <mirror />  @load="iFrameHeight()" -->
        <iframe
          id="appIframe"
          ref="appIframe"
          :src="project"
          name="appIframe"
          frameBorder="0"
          scrolling="no"
          width="100%"
          @load="onFrameLoad"
        ></iframe>
      </article>
    </div>
  </div>
</template>
<script>
// import Mirror from './homepackage/Mirror.vue'
import LoginTool from './homepackage/LoginTool.vue'
const path = require('path');
export default {
  components: {  LoginTool },
  data () {
    return {
      project: process.env.NODE_RUN === 1 ? 'http://localhost:8088/#/' : path.resolve(__dirname, '/src/homepackage/businesspartner/build/index.html'),
      memberQrcodeState: false
    }
  },
  mounted () {
    this.changeMobsfIframe()
    window.onresize = () => {
      this.changeMobsfIframe()
    }
  },
  beforeRouteEnter: function (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当钩子执行前，组件实例还没被创建
    // 在这里判断是否有缓存登录数据

    next()
    return true
  },
  methods: {
  onFrameLoad() {
    this.setDoMain();
  },
  setDoMain() {
    let parentDomain = window.location.hostname;
     document.domain = parentDomain;
  },
  execIframe() {
      exec_obj = document.createElement('iframe');
      exec_obj.name = 'appIframe';
      exec_obj.src = this.project;
      exec_obj.style.display = 'none';
      document.body.appendChild(exec_obj);//动态创建一个iframe
  },
  changeMobsfIframe () {
      const mobsf = this.$refs['appIframe']
      console.log(mobsf)
      const deviceWidth = document.body.clientWidth
      const deviceHeight = document.body.clientHeight
      mobsf.style.width = (Number(deviceWidth)) + 'px' // 数字是页面布局宽度差值
      mobsf.style.height = (Number(deviceHeight) - 54) + 'px' // 数字是页面布局高度差
    }
  },
  beforeRouteLeave: function (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    next()
  }
}
</script>
<style lang="less" scoped>
[data-page="home"] {
  .panel {
    // background: -moz-linear-gradient(
    //   top,
    //   #c8c7cc 0%,
    //   rgba(89, 93, 154, 0) 100%
    // );
    // background: -webkit-linear-gradient(
    //   top,
    //   #c8c7cc 0%,
    //   rgba(89, 93, 154, 0) 100%
    // );
    // background: linear-gradient(
    //   to bottom,
    //   #c8c7cc 0%,
    //   rgba(89, 93, 154, 0) 100%
    // );
    height: 100%;
    overflow: hidden;
  }
}
</style>