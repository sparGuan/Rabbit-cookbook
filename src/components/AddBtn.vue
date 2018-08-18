<template>
    <div  class="addmsg" ref="addmsg" v-touch:tap="openDescModal">
    	<div class="blooming-menu__container">
        +
      </div>
    </div>
</template>
<script>
export default {
  components: {},
  props: {
    btns: {
      default: () => [],
      type: Array
    },
    btnContent: String
  },
  data() {
    return {
      
    }
  },
  methods: {
    openDescModal() {
      this.$layer
        .footer({
          content: this.btnContent,//'<div style="width: calc(100% - 20px);height: 100px;margin: 0 auto;10px 0;"><textarea style="height:100%;width:100%;text-indent: 10px;padding-top: 5px;"></textarea></div>',
          btn: this.btns//['取消', '确定']
        })
        // 如果有btn
        .then(res => {
          console.log(res)
        })
    }
  }
}
</script>
<style lang="less" scoped>
.addmsg {
  position: fixed;
  z-index: 999;
  bottom: 25px;
  right: 25px;
  .blooming-menu__container {
    text-align: center;
    line-height: 50px;
    font-size: 35px;
    background-color: #a974a2;
    color: #fff;
    transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
    transition-property: box-shadow;
    transition-duration: 0.28s;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-delay: initial;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}
</style>