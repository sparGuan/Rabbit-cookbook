<template>
	<div data-page="customer-gathers" class="mui-fullscreen">
		<div ref="offCanvasWrappergathers" class="mui-off-canvas-wrap" >
			<aside class="mui-off-canvas-left mui-leftscreen">
        	<customerGathersMusiceCenter  @listenSongs="toListen"/>
      </aside>
			<!-- 主页面容器 -->
      <div class="mui-content mui-inner-wrap">
        <!-- 主页面标题 -->
        <gathersAppbar @openMusicContro="openMusicContro" />
				<div class="page-content">
						<!-- 图片墙 -->
						<!-- 横向列表 -->
						<!-- 左右列表 -->
						<customerGathersList />
				</div>  
				<div class="mui-off-canvas-backdrop"></div>
      </div>
		</div>
	</div>
</template>
<script>
import gathersAppbar from './customer-gathers-appbar'
import customerGathersList from './customer-gathers-list'
import customerGathersMusiceCenter from './customer-gathers-musiccenter'
export default {
	components: {  
		gathersAppbar,
		customerGathersList,
		customerGathersMusiceCenter
  },
	data() {
		return {
			initMusicPluns: require('@/js/lib/jaudio').default,
			isShowContent: false
		};
	},
	created() {
    this.$nextTick(() => {
      mui(this.$refs['offCanvasWrappergathers'])
        .offCanvas()
        .refresh()
    })
  },
	methods: {
		toListen(videoList) {
			this.$nextTick(() => {
					this.initMusicPluns(videoList)
			})
		},
		changeContentStatus(status) {
			this.isShowContent = status
		},
		// 打开音乐选择器
		openMusicContro() {
			mui(this.$refs['offCanvasWrappergathers'])
				.offCanvas().show()
		}
	}
}
</script>
<style lang="less" scoped>
	[data-page='customer-gathers'] {
		.mui-off-canvas-wrap.mui-active .mui-off-canvas-backdrop {
			box-shadow: unset
		}
		.mui-off-canvas-left {
      background: #fff;
		}
	}
</style>