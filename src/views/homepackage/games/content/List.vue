<template>
    <div  class="list" ref="list">
      <!--先增加标签项-->
      <!--先循环最普通的双列行列表-->
      <!--五裂型列表 -->
      <!--树形列表-->
      <!--单列型列表-->
      <!--最后是狗日般的字体型列表-->
      <TabBarList />
      <BelowList /> 
      <VerticalList />
      <SingleList />
    </div>
</template>
<script>
import TabBarList from './TabBarList'
import BelowList from './BelowList'
import VerticalList from './VerticalList'
import SingleList from './SingleList'
export default {
  components: { TabBarList, BelowList, VerticalList, SingleList },
  data() {
    return {}
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
.list {
  background-color: #fff;
}
</style>