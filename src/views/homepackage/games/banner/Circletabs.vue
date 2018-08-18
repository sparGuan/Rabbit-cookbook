<template>
    <div  class="circletabs" ref="circletabs" v-bind:style="{ 'background-image': bg, 'transform':'translate3d('+tslateX+'px, 0px, 0px)' }"></div>
</template>
<script>
export default {
  props: ['bg', 'tslateX'],
  data() {
    return {}
  },
  created() {},
  mounted() {},
  components: {}
}
</script>
<style lang="less" scoped>
.circletabs {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: inline-block;
  margin-right: 5px;
}
</style>