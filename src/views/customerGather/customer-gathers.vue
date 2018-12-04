<template>
	<div data-page="customer-gathers">
		<gathersAppbar />
		<div class="page-content">
				<!-- 图片墙 -->
				<!-- 横向列表 -->
				<!-- 左右列表 -->
				<customerGathersList />
		</div>
	</div>
</template>
<script>
import gathersAppbar from './customer-gathers-appbar'
import customerGathersList from './customer-gathers-list'
export default {
	components: {  
		gathersAppbar,
		customerGathersList
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