<template>
    <!-- 侧滑导航根容器 -->
    <div class="mui-off-canvas-wrap mui-draggable s-chat" ref="s-chat">
      <!-- 菜单容器 -->
      <aside class="mui-off-canvas-left">
        <div class="mui-scroll-wrapper">
          <div class="mui-scroll">
            <!-- 菜单具体展示内容 -->
          </div>
        </div>
      </aside>
      <!-- 主页面容器 -->
      <div class="mui-inner-wrap">
        <div class="mui-content mui-scroll-wrapper">
          <div class="mui-scroll">
              <slot name="panel"></slot>
          </div>
        </div>  
      </div>
    </div>
</template>
<script>
export default {
  props: ['value'],
  data() {
    return {
      flag: false,
    }
  },
  watch: {
    value(now, old) {
      console.log(now)
      this.flag = now
    },
    flag(now, old) {
      this.$emit('input', now)
      mui('.s-chat')
        .offCanvas()
        .toggle()
    }
  },
  created() {
  }
}
</script>
<style lang="less" scoped>
.s-chat {
  height: 100%;
}
</style>