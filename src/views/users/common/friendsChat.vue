
<template>
   <Popup ref='bottom' :show='bottomShow' :title="friendTitle" :maskClose="true" @hideFun="bottomShow = false">
      <div data-page="friends-chat" >
          <div class="chat-window">
            <div class="chat-messages mui-scroll-wrapper" ref="chat-messages">
              <ul class="chat-messages-list mui-scroll" >
                <li class="chat-message " v-if="Object.keys(chatList).length > 0 && chatList.Meta.length > 0" v-for=" item in chatList.Meta" :key="item._id" :class="checkMySelf(item.userId) ? 'chat-message-self':'chat-message-friend'" >
                  <div class="user-info">
                    <span class="nick-name" v-text="item.nickName" v-if="checkMySelf(item.userId)"></span>
                    <div class="head-img" :style="'background-image:url('+item.headImg+')'"></div>
                    <span class="nick-name" v-text="item.nickName" v-if="!checkMySelf(item.userId)"></span>
                  </div>
                  <div class="chat-message-bubble" v-if="item.message !== ''" > 
                    <div class="arrow"></div>
                    <div class="bubble" v-html="item.message"></div>
                  </div>                  
                </li>
              </ul>
            </div>
            <!-- 输入展示内容   -->
            <div class="chat-input-bar">
              <div class="chat-info-container">
              </div>
              <div class="chat-effect-container">
                <div class="chat-effect-bar"></div>
              </div>
              <div class="chat-input-wrapper">
                <button class="chat-input-tool">
                  <i class="iconfont icon-camerarotate"></i>
                </button>
                <div class="chat-input" contenteditable  @input="doingWrite($event)"></div>
                <button class="chat-send" @click="clickSendButton($event)" @keydown="keydown($event)">
                  <i class="iconfont icon-fasong1"></i>
                </button>
              </div>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%"  style="position: absolute;z-index: -100;">
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
let $ = require('jquery');
import { TweenMax } from 'gsap';
import { setTimeout } from 'timers';
export default {
  // 从底部弹出显示
  components: {
    Popup
  },
  props: ['value', 'friendTitle', 'chatList'],
  data() {
    return {
      chatId: '',
      bottomShow: false,
      $input: null,
      $sendButton: null,
      $messagesContainer: null,
      $messagesList: null,
      $effectContainer: null,
      $infoContainer: null,
      $lastMessageContainer: null,
      messages: 0,
      bleeding: 100,
      isFriendTyping: false,
      incomingMessages: 0,
      KEY_ENTER: 13,
      lastMessage: '',
      wordLen: 0,
      lipsum:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    };
  },
  mounted() {
    this.initDom();
    this.gooOff();
    this.updateChatHeight();
    mui(this.$refs['chat-messages']).scroll({
      deceleration: 0.0005, // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      indicators: true // 是否显示滚动条
    });
  },
  watch: {
    value(now, old) {
      // 如何做到先清除，再渲染
      // $('.chat-messages-list').html('')
      this.bottomShow = now;
    },
    bottomShow(now, old) {
      this.$emit('input', now);
      if (!now && this.$lastMessageContainer) {
        this.$lastMessageContainer.remove();
      }
    },
    chatList: {
      handler: function(newVal, oldVal) {
        mui(this.$refs['chat-messages'])
          .scroll()
          .refresh();
        mui(this.$refs['chat-messages'])
          .scroll()
          .scrollToBottom(10); // 100毫秒滚动到顶
        this.chatId = newVal._id;
      },
      deep: true //深度监听
    }
  },
  sockets: {
    friendIsTyping_sent(startOrEnd) {
      console.log(111111)
      if (startOrEnd) {
        this.friendIsTyping();
        setTimeout(this.friendStoppedTyping,300)
      }
    },
    onChatOne_sent(chatList) {
      if (this.$lastMessageContainer) {
        mui(this.$refs['chat-messages'])
          .scroll()
          .refresh();
        mui(this.$refs['chat-messages'])
          .scroll()
          .scrollToBottom(10); // 100毫秒滚动到顶
        this.$lastMessageContainer.remove();
      }
      if (Object.keys(chatList).length > 0) {
        this.$emit('changeChatList', chatList);
      }
    }
  },
  methods: {
    doingWrite(e) {
      console.log($(e.target))
      console.log($(e.target).text().length)
      console.log(this.wordLen !== $(e.target).text().length)
      // 判断服务端返回来的数据是否正在输入
      setTimeout(() => {
          if (this.wordLen !== $(e.target).text().length) {
          this.$socket.emit(
            'friendIsTyping',
            this.chatId,
            app.globalService.getLoginUserInfo()._id,
            true
          );
          this.wordLen = $(e).text().length;
        }
      },300)
    },
    checkMySelf(userId) {
      return app.globalService.getLoginUserInfo()._id === userId;
    },
    initDom() {
      this.$input = $('.chat-input');
      this.$sendButton = $('.chat-send');
      this.$messagesContainer = $('.chat-messages');
      this.$effectContainer = $('.chat-effect-container');
      this.$infoContainer = $('.chat-info-container');
      this.$messagesList = $('.chat-messages-list');
    },
    gooOn() {
      this.setFilter('url(#goo)');
    },
    gooOff() {
      this.setFilter('none');
    },
    setFilter(value) {
      this.$effectContainer.css({
        webkitFilter: value,
        mozFilter: value,
        filter: value
      });
    },
    addMessage(message, self) {
      let $messageContainer = $('<li/>')
        .addClass(
          'chat-message ' + (self ? 'chat-message-self' : 'chat-message-friend')
        )
        .appendTo(this.$messagesList);
      let $userContent = $(
        '<div class="user-info">' +
          '<span class="nick-name">' +
          app.globalService.getLoginUserInfo().nickName +
          '</span>' +
          '<div class="head-img" style="background-image:url(' +
          app.globalService.getLoginUserInfo().headImg +
          ');margin-left: 3px;"></div>' +
          '</div>'
      ).appendTo($messageContainer);
      let $messageBubble = $(
        '<div>' +
          '<div class="arrow" style="top: 0px;right: -12px;"></div>' +
          '<div class="bubble"></div>' +
          '</div>'
      )
        .addClass('chat-message-bubble')
        .appendTo($messageContainer);
      $messageBubble.find('.bubble').html(message);
      let oldScroll = this.$messagesContainer.scrollTop();
      this.$messagesContainer.scrollTop(9999999);
      let newScroll = this.$messagesContainer.scrollTop();
      let scrollDiff = newScroll - oldScroll;
      TweenMax.fromTo(
        this.$messagesList,
        0.4,
        {
          y: scrollDiff
        },
        {
          y: 0,
          ease: Quint.easeOut
        }
      );
      return {
        $userContent: $userContent,
        $container: $messageContainer,
        $bubble: $messageBubble
      };
    },
    // 实现每发送一条信息，往数据库表里面添加对应数据
    sendMessage() {
      let message = this.$input.text();
      if (message === '') {
        return;
      }
      this.lastMessage = message;
      const messageElements = this.addMessage(message, true),
        $messageContainer = messageElements.$container,
        $messageBubble = messageElements.$bubble;
      let oldInputHeight = $('.chat-input-bar').height();
      this.$input.text('');
      // this.updateChatHeight();
      let newInputHeight = $('.chat-input-bar').height();
      let inputHeightDiff = newInputHeight - oldInputHeight;
      let $messageEffect = $('<div/>')
        .addClass('chat-message-effect')
        .append($messageBubble.clone())
        .appendTo(this.$effectContainer)
        .css({
          left: this.$input.position().left - 12,
          top: this.$input.position().top + this.bleeding + inputHeightDiff
        });
      let messagePos = $messageBubble.offset();
      let effectPos = $messageEffect.offset();
      let pos = {
        x: messagePos.left - effectPos.left,
        y: messagePos.top - effectPos.top
      };
      let $sendIcon = this.$sendButton.children('i');
      TweenMax.to($sendIcon, 0.15, {
        x: 30,
        y: -30,
        force3D: true,
        ease: Quad.easeOut,
        onComplete: () => {
          TweenMax.fromTo(
            $sendIcon,
            0.15,
            {
              x: -30,
              y: 30
            },
            {
              x: 0,
              y: 0,
              force3D: true,
              ease: Quad.easeOut
            }
          );
        }
      });
      this.gooOn();
      TweenMax.from($messageBubble, 0.8, {
        y: -pos.y,
        ease: Sine.easeInOut,
        force3D: true
      });
      let startingScroll = this.$messagesContainer.scrollTop();
      let curScrollDiff = 0;
      let effectYTransition;
      let setEffectYTransition = (dest, dur, ease) => {
        return TweenMax.to($messageEffect, dur, {
          y: dest,
          ease: ease,
          force3D: true,
          onUpdate: () => {
            let curScroll = this.$messagesContainer.scrollTop();
            let scrollDiff = curScroll - startingScroll;
            if (scrollDiff > 0) {
              curScrollDiff += scrollDiff;
              startingScroll = curScroll;
              let time = effectYTransition.time();
              effectYTransition.kill();
              effectYTransition = setEffectYTransition(
                pos.y - curScrollDiff,
                0.8 - time,
                Sine.easeOut
              );
            }
          }
        });
      };
      effectYTransition = setEffectYTransition(pos.y, 0.8, Sine.easeInOut);
      // effectYTransition.updateTo({y:800});
      TweenMax.from($messageBubble, 0.6, {
        delay: 0.2,
        x: -pos.x,
        ease: Quad.easeInOut,
        force3D: true
      });
      TweenMax.to($messageEffect, 0.6, {
        delay: 0.2,
        x: pos.x,
        ease: Quad.easeInOut,
        force3D: true
      });
      TweenMax.from($messageBubble, 0.2, {
        delay: 0.65,
        opacity: 0,
        ease: Quad.easeInOut,
        onComplete: () => {
          TweenMax.killTweensOf($messageEffect);
          $messageEffect.remove();
          if (!this.isFriendTyping) {
            this.gooOff();
          }
          // 此处应该是最后阶段了，开始向服务器发送数据，刷新列表数据
          // 更新好友双方数据列表
          const acceptUserId =
            this.chatList.acceptUser ===
            app.globalService.getLoginUserInfo()._id
              ? this.chatList.user
              : this.chatList.acceptUser;
          this.$lastMessageContainer = $messageContainer;
          setTimeout(() => {
            // mui(this.$refs['chat-messages']).scroll().refresh();
            // mui(this.$refs['chat-messages']).scroll().scrollToBottom(10);//100毫秒滚动到顶
            // $messageContainer.remove()
            this.$socket.emit(
              'chatOne',
              acceptUserId,
              app.globalService.getLoginUserInfo()._id,
              message
            );
          }, 300);
        }
      });
      this.messages++;
      // 此处是判断对方是否回复
      // if (
      //   Math.random() < 0.65 ||
      //   this.lastMessage.indexOf('?') > -1 ||
      //   this.messages == 1
      // ) {
      //   this.getReply();
      // }
    },
    // getReply() {
    //   if (this.incomingMessages > 2) {
    //     return;
    //   }
    //   this.incomingMessages++;
    //   //
    //   let typeStartDelay =
    //     1000 + this.lastMessage.length * 40 + Math.random() * 1000;
    //   setTimeout(this.friendIsTyping, typeStartDelay);
    //   //
    //   let source = this.lipsum.toLowerCase();
    //   source = source.split(' ');
    //   let start = Math.round(Math.random() * (source.length - 1));
    //   let length = Math.round(Math.random() * 13) + 1;
    //   let end = start + length;
    //   if (end >= source.length) {
    //     end = source.length - 1;
    //     length = end - start;
    //   }
    //   let message = '';
    //   for (let i = 0; i < length; i++) {
    //     message += source[start + i] + (i < length - 1 ? ' ' : '');
    //   }
    //   message += Math.random() < 0.4 ? '?' : '';
    //   message += Math.random() < 0.2 ? ' :)' : Math.random() < 0.2 ? ' :(' : '';
    //   let typeDelay = 300 + message.length * 50 + Math.random() * 1000;
    //   setTimeout(() => {
    //     this.receiveMessage(message);
    //   }, typeDelay + typeStartDelay);

    //   setTimeout(() => {
    //     this.incomingMessages--;
    //     if (Math.random() < 0.1) {
    //       this.getReply();
    //     }
    //     if (this.incomingMessages <= 0) {
    //       this.friendStoppedTyping();
    //     }
    //   }, typeDelay + typeStartDelay);
    // },
    friendIsTyping() {
      if (this.isFriendTyping) {
        return;
      }
      this.isFriendTyping = true;
      let $dots = $('<div/>')
        .addClass('chat-effect-dots')
        .css({
          top: -30 + this.bleeding,
          left: 10
        })
        .appendTo(this.$effectContainer);
      for (let i = 0; i < 3; i++) {
        let $dot = $('<div/>')
          .addClass('chat-effect-dot')
          .css({
            left: i * 20
          })
          .appendTo($dots);
        TweenMax.to($dot, 0.3, {
          delay: -i * 0.1,
          y: 30,
          yoyo: true,
          repeat: -1,
          ease: Quad.easeInOut
        });
      }

      let $info = $('<div/>')
        .addClass('chat-info-typing')
        .text('对方正在输入...')
        .css({
          transform: 'translate3d(0,30px,0)'
        })
        .appendTo(this.$infoContainer);
      TweenMax.to($info, 0.3, {
        y: 0,
        force3D: true
      });
      this.gooOn();
    },
    friendStoppedTyping() {
      if (!this.isFriendTyping) return;
      this.isFriendTyping = false;
      let $dots = this.$effectContainer.find('.chat-effect-dots');
      TweenMax.to($dots, 0.3, {
        y: 40,
        force3D: true,
        ease: Quad.easeIn
      });
      let $info = this.$infoContainer.find('.chat-info-typing');
      TweenMax.to($info, 0.3, {
        y: 30,
        force3D: true,
        ease: Quad.easeIn,
        onComplete: () => {
          $dots.remove();
          $info.remove();
          this.gooOff();
        }
      });
    },
    // receiveMessage(message) {
    //   let messageElements = this.addMessage(message, false),
    //     $messageContainer = messageElements.$container,
    //     $messageBubble = messageElements.$bubble;

    //   TweenMax.set($messageBubble, {
    //     transformOrigin: '60px 50%'
    //   });
    //   TweenMax.from($messageBubble, 0.4, {
    //     scale: 0,
    //     force3D: true,
    //     ease: Back.easeOut
    //   });
    //   TweenMax.from($messageBubble, 0.4, {
    //     x: -100,
    //     force3D: true,
    //     ease: Quint.easeOut
    //   });
    // },
    updateChatHeight() {
      this.$messagesContainer.css({
        height:
          window.innerHeight * 0.8 - $('.chat-input-bar').outerHeight(true)
      });
    },
    keydown(event) {
      if (event.keyCode === this.KEY_ENTER) {
        event.preventDefault();
        this.sendMessage();
      }
    },
    clickSendButton(event) {
      event.preventDefault();
      this.sendMessage();
    }
  }
};
</script>
<style lang="less" scoped>
@import url('./chat.css');
[data-page='friends-chat'] {
}
</style>