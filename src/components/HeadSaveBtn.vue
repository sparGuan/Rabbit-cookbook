<template>
    <!-- 保存的模块 -->
    <div data-page="headSaveBtn">
      <label @click="$store.dispatch('saveModules')">
        <span class="head-save-btn"><i class="iconfont icon-baocun"></i></span>
      </label>
    </div>
</template>
<script>
export default {
  components: {},
  props: ['saveModules'],
  data() {
    return {}
  },
  mounted(){
  },
  methods: {
   
  }
}
</script>
<style lang="less" scoped>
[data-page='headSaveBtn'] {
  height: auto;
  position: absolute;
  right: 5px;
  top: 5px;
  padding: 5px;
  .head-save-btn {
    color: #007aff;
  }
  & i {
    font-size: 24px;
  }
}
</style>