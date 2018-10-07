
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
                    <audio ref="player" src=""  controls></audio>
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
                <button class="voice-chat chat-input-tool" @click="voiceInsert">
                  <svg class="icon " style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;    font-size: 24px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18553"><path d="M512 629.62688c118.5024 0 214.59968-92.25216 214.59968-206.09536V286.2592c0-113.75104-96.1024-206.09536-214.59968-206.09536S297.29792 172.41088 297.29792 286.2592v137.3696c0.1024 113.74592 96.19968 205.99808 214.70208 205.99808z" fill="#A0D8FD" p-id="18554"></path><path d="M834.00192 372.07552c-19.70176 0-35.79904 15.36-35.79904 34.36544v17.18272c0 151.76704-128.1024 274.72896-286.19776 274.72896S225.80736 575.3856 225.80736 423.62368v-17.18272c0-19.00544-16-34.36544-35.79904-34.36544s-35.79904 15.36-35.79904 34.36544v17.18272c0 178.06336 141.19936 324.4544 322.00192 341.7344v104.7296H404.59776c-19.79904 0-35.79904 15.36-35.79904 34.36544s16 34.36544 35.79904 34.36544h214.59968c19.79904 0 35.79904-15.36 35.79904-34.36544s-16-34.36544-35.79904-34.36544h-71.5008v-104.82688c180.79744-17.28 322.00192-163.67104 322.00192-341.73952v-17.18272c0-18.90304-16-34.26304-35.69664-34.26304z" fill="#FFF" p-id="18555"></path></svg>
                </button>
                <button class="chat-input-tool chat-input-tool-ani-menus " >
                  <i class="iconfont icon-camerarotate" style="font-size: 22px;"></i>                  
                </button>
                <button type="text" v-if="voiceFlag" class="chat-voice record" @touchstart="startRecord" @touchend="stopRecord" >按住说话</button>
                <div class="chat-input" contenteditable  @input="doingWrite($event)" v-else></div>
                <div style="width:50px;" v-if="voiceFlag"></div>
                <button class="chat-send" @click="clickSendButton($event)" @keydown="keydown($event)" v-else>
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
      voiceFlag: false
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
    startRecord: function (event) {
        const _this = this
        if (!!navigator.userAgent.match(/AppleWebKit.*Mobile.*/)) {
          // 移动端 取消浏览器长按事件 （否则在录音时会有弹出框）
          document.oncontextmenu = _this.touchmoveDefault
          //禁止滑动事件 防止在长按时 下拉窗口不能触发stopRecord
          document.body.addEventListener('touchmove', _this.touchmoveDefault, {passive: false})
        }
        if(localStorage.rainAllowRecord !== 'true' && _this.oRecordInfo.useWxRecord !== 2 && _this.oRecordInfo.useWxRecord !== 3){
          //  首次进入 弹出是否授权框
          app.wx.startRecord({
            success: function(){
              //  授权录音
              localStorage.rainAllowRecord = 'true'
              _this.oRecordInfo.useWxRecord = 3
              _this.oRecordInfo.bShowRecording = false  //  控制正在录音gif显示
              app.wx.stopRecord()
              return
            },
            cancel: function () {
              // 用户拒绝授权录音
              _this.oRecordInfo.bShowRecording = false
              _this.oRecordInfo.useWxRecord = 0
              if (!!navigator.userAgent.match(/AppleWebKit.*Mobile.*/)) {
                document.body.removeEventListener('touchmove', _this.touchmoveDefault)
              }
              return
            }
          })
          if (_this.oRecordInfo.useWxRecord === 1) {
            //  使用假录音功能
            _this.oRecordInfo.useWxRecord = 2
          }
        }
        _this.oRecordInfo.bShowRecording = true
        _this.oRecordInfo.timer = new Date()
        //  防止因为js 加载时间过长导致调用录音接口失败问题 实现假按钮效果
        if ((_this.oRecordInfo.useWxRecord === 1 || _this.oRecordInfo.useWxRecord === 3) && localStorage.rainAllowRecord === 'true') {
          _this.oRecordInfo.recordTimer = setTimeout(function () {
          app.wx.startRecord({
            success: function(){
              console.log('wx.startRecord success')
              localStorage.rainAllowRecord = 'true'
            },
            cancel: function () {
              _this.oRecordInfo.bShowRecording = false
            }
          })
        }, 300)
        }
    },
    voiceInsert() {
      this.voiceFlag = !this.voiceFlag
    },
    pullupRefresh() {    
      if (mui(this.$refs['chat-messages']).scroll().y <= 10 && mui(this.$refs['chat-messages']).scroll().y > 0 ) {
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
  .voice-chat {
    display: inline-block;
  }
  .chat-input-tool {
    display: inline-block;
    vertical-align: bottom;
    text-align: left;
  }
  .chat-input-tool-ani-menus {
    width: 45px;
    padding-top: 8px;
    padding-left: 0;
  }
  .chat-voice {
    -webkit-flex: 1;
    flex: 1;
    text-align: center;
    &:active {
      color: #fff;
      background-color: #ccc;
    }
  }
}
</style>