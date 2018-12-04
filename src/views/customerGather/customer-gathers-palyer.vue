<template>
  <div class="custom-gathers-player">
    <div id="d-audio" style="height: 55px;"></div>
        <div class="github-info">
        <span>未曾遗忘的青春</span>
    </div>
  </div>
</template>
<script>
const Daudio = require('@/js/lib/d-audio')
export default {
  props: [],
  data() {
    return {}
  },
  mounted() {
    this.$nextTick( () => {
      console.log(Daudio)
      // if (app.Daudio) {
      //   console.log(111123213)
      //   app.Daudio()
      // }
    })
  },
  methods: {
    
  }
};
</script>
<style lang="less" scoped>
</style>