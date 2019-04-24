<template>
    <div ref="customerTopPopover" class="customer-mui-popover mui-popover" v-show="showMenu">
      <div class="mui-popover-arrow"></div>
      <div class="title">全部频道</div>
      <div class="mui-scroll-wrapper" ref="customerTopPopoverScro" style="margin-top:50px;">
            <div class="mui-scroll">
                <div class="section-row">
                  <div class="section-item" v-for="(item,index) in channel" :key="index" v-text="item.name"></div>
                </div>
            </div>
      </div>
    </div>
</template>
<script>
// 筛选列表
export default {
  props: ["value"],
  components: {  },
  data() {
    return {
      channel: Array.from(require('@/js/data/channel.json')),
      showMenu: false // 是否显示下拉筛选列表
    }
  },
  created() {
    this.$nextTick( () => {
      console.log(this.channel)
        mui(this.$refs['customerTopPopoverScro']).scroll({
          deceleration: 0.0005, // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
          indicators: false // 是否显示滚动条
        });
    })
  },
  mounted() {
    mui('body').on('shown', '.customer-mui-popover', (e)  => {
        //console.log('shown', e.detail.id);//detail为当前popover元素
        // <div class="mui-backdrop mui-active"></div>
    });
    mui('body').on('hidden', '.customer-mui-popover', (e) => {
        //console.log('hidden', e.detail.id);//detail为当前popover元素
    });
  },
  watch: {
      value(now) {
        if(now) {
          mui(this.$refs['customerTopPopover']).popover('show');
        } else {
          mui(this.$refs['customerTopPopover']).popover('hide');
        }
        this.showMenu = now
      },
      showMenu: function(now) {
          this.$emit('input', now)
      }
    },
  methods: {
    // 显示最新数据列表
  },
}
</script>
<style lang="less" scoped>
.customer-mui-popover {
    height: 300px !important;
    background: #fff;
    position: absolute;
    width: calc(~'100vw - 50px');
    left: 25px;
    top: 50px;
  z-index:1001;
  .title {
    color: #333;
    margin: 15px 0;
    margin-left: 15px;
  }
  .mui-backdrop {
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .mui-popover-arrow {
    left: calc(~'50% + 11px');
  }
  .section-item {
    width: 60px;
    height: 30px;
    display: inline-block;
    vertical-align: middle;
    color: #333;
    background-color: #ddd;
    margin-left: 15px;
    margin-top: 10px;
    text-align: center;
    line-height: 30px;
  }
}
</style>