<template>
<transition name="modal">
      <div data-page="modal" class="modal-mask" @tap.stop.prevent="closeMask($event)" v-show="showModal">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header" v-if="showHead" :style="showHeadBg ? headBg :''">
              <slot name="header">
              </slot>
            </div>
            <div class="modal-body">
              <slot name="body">
              </slot>
            </div>
            <div class="modal-footer" v-if="showFoot">
              <slot name="footer">
                default footer
                <!-- <button class="modal-default-button" @click="$emit('close')">
                </button> -->
              </slot>
            </div>
          </div>
        </div>
      </div>
</transition>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    showHead: {
      type: Boolean,
      default: false
    },
    showHeadBg:{
      type: Boolean,
      default: false
    },
    showFoot: {
      type: Boolean,
      default: false
    },
    headBg: {
      type: String,
      default: 'background-image:url(../../../src/imgs/fm/byme.png)'
    },
    closeBack: {
      type:Function,
      default: () => {

      }
    }
  },
  data() {
    return {
      showModal: false
    }
  },
  watch: {
    value(now, old) {
      this.showModal = now
    },
    showModal(now, old) {
      this.$emit('input', now)
    }
  },
  methods: {
    closeMask(event){
      if(event.target.classList.contains('modal-wrapper')){
          if(this.showModal){
            this.showModal = false
            if(typeof this.closeBack === 'function'){
              this.closeBack()
            }
         }
      }
    }
  }
}
</script>
<style lang="less" scoped>
[data-page='modal'] {
  &.modal-mask {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, .9);
    display: table;
    transition: opacity 0.3s ease;
  }
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  .modal-container {
    width: 300px;
    margin: 0px auto;
    border-radius: 5px;
    box-shadow: 0 2px 15px rgba(0, 000, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }
  .modal-header{
     height: 45px;
    padding: 12px 10px;
    background-color: rgba(0,0,0,.7);
    color: #fff;
    box-shadow: 0 1px 2px rgba(0,0,0,.2);    
    background-size: 50px 40px;
    background-repeat: no-repeat;
    background-position: 5px 12px;
  }
  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }
  .modal-body {
    margin-top: 20px;
    padding: 0px 30px;
  }
  .modal-default-button {
    float: right;
  }
  .modal-enter {
    opacity: 0;
  }
  &.modal-leave-active {
    opacity: 0;
  }
  &.modal-enter .modal-container,
  &.modal-leave-active .modal-container {
    transform: scale(1.1,1.1);
  }
}
</style>