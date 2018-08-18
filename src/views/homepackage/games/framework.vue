<template>
    <div  class="games" ref="games">
        <Banner />
        <Content />
    </div>
</template>
<script>
import Banner from './banner/Banner.vue'
import Content from './content/Content.vue'
export default {
  components: { Banner, Content },
  data() {
    return {}
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
.games {
}
</style>