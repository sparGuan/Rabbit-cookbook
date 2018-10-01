<template>
    <div data-page="home">
      <login-tool />
    	<div class="page-content avatar-holder" ref="avatarHolder">
    		<article class="panel">
				  <mirror />
			  </article>
    	</div>
    </div>
</template>
<script>
import Mirror from './homepackage/Mirror.vue'
import LoginTool from './homepackage/LoginTool.vue'
export default {
  components: { Mirror,LoginTool },
  data() {
    return {
      memberQrcodeState: false
    }
  },
  mounted() {
  },
  beforeRouteEnter: function(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当钩子执行前，组件实例还没被创建
    // 在这里判断是否有缓存登录数据
    
    next()
    return true
  },
  methods: {},
  beforeRouteLeave: function(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    next()
  }
}
</script>
<style lang="less" scoped>
[data-page='home'] {
.panel {
    background: -moz-linear-gradient(top, #c8c7cc 0%, rgba(89, 93, 154, 0) 100%);
    background: -webkit-linear-gradient(top, #c8c7cc 0%, rgba(89, 93, 154, 0) 100%);
    background: linear-gradient(to bottom, #c8c7cc 0%, rgba(89, 93, 154, 0) 100%);
    height: 100%;
    overflow:hidden;
}
}
</style>