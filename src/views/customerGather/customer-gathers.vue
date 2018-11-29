<template>
	<div data-page="customer-gathers">
		<gathersAppbar />
		<div class="page-content">
				<!-- 先制作天气栏 作为背景墙-->
				<!-- 居中的为最新资讯 点击打开列表 -->
				<!-- 搜索栏 -->
				<!-- 直面标签栏 -->
		</div>
	</div>
</template>
<script>
import gathersAppbar from './customer-gathers-appbar'
export default {
	components: {  
    gathersAppbar
  },
	data() {
		return {};
	},
	mounted(){
	//	app.mui(this.$refs.slider).slider({interval:0});
	},
	methods: {
		
	}
}
</script>
<style lang="less" scoped>
	[data-page='customer-gathers'] {
		
	}
</style>