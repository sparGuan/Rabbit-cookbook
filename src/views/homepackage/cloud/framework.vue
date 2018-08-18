<template>
    <div  class="cloud" ref="cloud">
    	<Content />
    </div>
</template>
<script>
import Content from './content/Content'
export default {
  components: { Content }
}
</script>
<style lang="less" scoped>
.cloud {
  height: 100%;
}
</style>