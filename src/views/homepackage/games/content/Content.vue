<template>
    <div  class="content" ref="content">
        <!--传入不一样的参数，循环出不一样的列表-->
		    <List></List>
    </div>
</template>
<script>
import List from './List'
export default {
  components: { List },
  data() {
    return {}
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>

</style>