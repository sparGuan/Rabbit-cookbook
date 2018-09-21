
<template>
   <Popup ref='bottom' :show='bottomShow' @cancelFun='cancelFun'>
      <div data-page="friends-chat" >
          <div class="chat-window">
            <div class="chat-messages">
              <ol class="chat-messages-list">
                <li class="chat-message chat-message-friend">
                  <div class="chat-message-bubble">
                    Hey
                  </div>
                </li>
                <li class="chat-message chat-message-friend">
                  <div class="chat-message-bubble">
                    this is a demonstration of the gooey effect on a chat window
                  </div>
                </li>
                <li class="chat-message chat-message-friend">
                  <div class="chat-message-bubble">
                    inspired by <a href="https://dribbble.com/shots/1901175-Chat-Animation">this dribbble shot</a> by <a href="https://dribbble.com/antalik">Jakub Antalík</a>
                  </div>
                </li>
                <li class="chat-message chat-message-friend">
                  <div class="chat-message-bubble">
                    please type something on the field below
                  </div>
                </li>
                <li class="chat-message chat-message-friend">
                  <div class="chat-message-bubble">
                    oh and press enter :0
                  </div>
                </li>
              </ol>
            </div>
            <div class="chat-input-bar">
              <div class="chat-info-container">

              </div>
              <div class="chat-effect-container">
                <div class="chat-effect-bar"></div>
              </div>
              <div class="chat-input-wrapper">
                <button class="chat-input-tool">
                  <i class="icon icon-camera"></i>
                </button>
                <div class="chat-input" contenteditable></div>
                <button class="chat-send">
                  <i class="fa fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="0">
            <defs>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                <feComposite in="SourceGraphic" in2="goo" />
              </filter>
            </defs>
          </svg>
	    </div>
    </Popup>
</template>
<script>
import Popup from '@/components/Popup';
export default {
  components: {
    Popup
  },
  props: ['value'],
  data() {
    return {
      bottomShow: false
    };
  },
  watch: {
    el: function(now, old) {
      this.bottomShow = now;
    },
    bottomShow: function(now, old) {
      this.$emit('input', now);
    }
  },
  methods: {
    // 从底部弹出显示
  }
};
</script>
<style lang="less" scoped>
@import url('./chat.less');
[data-page='friends-chat'] {
}
</style>