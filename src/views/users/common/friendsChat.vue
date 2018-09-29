
<template>
   <Popup ref='bottom' :show='bottomShow' :title="friendTitle" :maskClose="true" @hideFun="bottomShow = false">
      <div data-page="friends-chat">
          <div class="chat-window">
            <div class="chat-messages mui-scroll-wrapper" id="chat_messages"  ref="chat-messages">
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
require('@/js/lib/mui.pullToRefresh.js')
require('@/js/lib/mui.pullToRefresh.material.js')
export default {
  // 从底部弹出显示
  components: {
    Popup
  },
  props: ['value', 'friendTitle', 'chatList'],
  data() {
    return {
      chatId: '',
      page: 1,
      readSecond: 0,
      bottomShow: false,
      pullToRefresh: null,
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
    const _this = this
    mui(this.$refs['chat-messages']).scroll({
      deceleration: mui.os.ios? 0.003 : 0.0009, // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      indicators: true // 是否显示滚动条
    });    
    this.pullToRefresh =  mui(this.$refs['chat-messages']).pullToRefresh(
      {
         up: {
            callback: _this.pullupRefresh, //上拉回调，必填；
            auto: false, // 自动执行一次上拉加载，可选；
            show: true, // 显示底部上拉加载提示信息，可选；
            contentrefresh: 'Loading...', //上拉进行中提示信息
            contentnomore: 'no More' // 上拉无更多信息时提示信息
        }
      }
    )
  },
  watch: {
    value(now, old) {
      // 如何做到先清除，再渲染
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
        console.log(newVal)
        this.chatId = newVal._id;
      },
      deep: true //深度监听
    }
  },
  sockets: {
    loadHistory_sent(chatList) {
      this.$emit('changeChatList', chatList);
      console.log(1111)
      this.pullToRefresh.endPullUpToRefresh()
       // 参数为true代表没有更多数据了。
    },
    friendIsTyping_sent(startOrEnd) {
      if (startOrEnd) {
        this.friendIsTyping()
        setTimeout(this.friendStoppedTyping,4000)
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
    pullupRefresh() {    
      console.log(mui(this.$refs['chat-messages']).scroll().y)
      if (mui(this.$refs['chat-messages']).scroll().y <= 10 && mui(this.$refs['chat-messages']).scroll().y > 0 ) {
        console.log(11111)
        // 没有更多数据的时候要
        // this.pullToRefresh.disablePullupToRefresh()
        setTimeout(() => {
          // 从socket.io获取数据然后设置值为false
          // 参数是页数
          this.$socket.emit('loadHistory', ++this.page, this.chatId,app.globalService.getLoginUserInfo()._id)
        }, 1500);
      } else {
         this.pullToRefresh.endPullUpToRefresh()
      }
    },
    doingWrite(e) {
      // 判断服务端返回来的数据是否正在输入
      setInterval(() => {
        this.readSecond++
      }, 50)
      if(this.readSecond < 10) {
        return 
      } else {
        if (this.wordLen !== $(e.target).text().length) {
          this.readSecond  = 0
          this.$socket.emit(
            'friendIsTyping',
            this.chatId,
            app.globalService.getLoginUserInfo()._id,
            true
          );
          this.wordLen = $(e).text().length;
        } else {
          return 
        }
      }
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
    },
    friendIsTyping() {
      console.log(this.isFriendTyping)
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