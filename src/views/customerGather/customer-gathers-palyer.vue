<template>
  <div class="custom-gathers-player">
    <div id="d-audio" style="height: 40px;"></div>
        <div class="github-info">
        <!-- <span>未曾遗忘的青春</span> -->
    </div>
  </div>
</template>
<script>
require('@/js/lib/d-audio')
export default {
  props: [],
  data() {
    return {
    }
  },
  mounted() {
    this.$nextTick( () => {          
      if (app.Daudio) {
        app.Daudio()
      }
    })
  },
  methods: {
    
  }
};
</script>
<style lang="less" scoped>
.github-info {
  transform: translate3d(53px,-40px,0px);
}
</style>