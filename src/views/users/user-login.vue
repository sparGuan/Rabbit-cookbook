<template>
  <v-dialog v-model="showModal" :showHead="true" :showFoot="true" :showHeadBg="true">
    <div slot="header" class="view-head">
      Sign In
    </div>
    <div data-page="login" slot="body">
      <div class="page-content">
        <div class="mui-slider" ref="switchover">
          <div class="mui-slider-group">
            <transition name="slider_1">
              <div class="mui-slider-item" v-show="openPages === 0">
                <div class="mui-input-group">
                  <div class="mui-input-row">
                    <label>账号</label>
                    <input type="text" @focus="() => this.focusName=this.Mobile" v-model="Mobile" class="mui-input-clear mui-input" placeholder="请输入账号">
                  </div>
                  <div class="mui-input-row">
                    <label>密码</label>
                    <input type="passWord" @focus="() => this.focusName=this.passWord" v-model="passWord" class="mui-input-clear mui-input" placeholder="请输入密码">
                  </div>
                </div>
                <button class="mui-btn mui-btn-success mui-btn-warning log-now" data-loading-icon-position="right" data-loading-text="登录中..." @tap.stop.prevent="sumbit($event)">登录</button>
                <div class="link-area">
                  <a @click.stop="goRegister">快速注册</a> 
                  <span class="spliter">|</span> 
                  <a @click="goForgetPwd">忘记密码</a>
                </div>
              </div>
            </transition>
            <transition name="slider_2">
              <div class="mui-slider-item" v-show="openPages === 1">
                <Register :validCodeTxt="validCodeTxt"
                          @sendValid="sendValid" 
                          :checkValidCode="checkValidCode" 
                          @backOff="backoff" 
                          @changeEye="changeEye" 
                          @close="(showModal) => {this.showModal = showModal}">
                </Register>
              </div>
            </transition>
            <transition name="slider_3">
              <div class="mui-slider-item" v-show="openPages === 2">
                <ResetPassword 
                          :validCodeTxt="validCodeTxt"
                          @sendValid="sendValid" 
                          :checkValidCode="checkValidCode" 
                          @backOff="backoff" 
                          @changeEye="changeEye"
                          @close="(showModal) => {this.showModal = showModal}"
                          >
                </ResetPassword>
              </div>
            </transition>            
          </div>
        </div>
      </div>
    </div>
    <div slot="footer" class="view-foot">
      <p style="padding-left:30px;display:inline-block;vertical-align: bottom;">社交账号登陆</p>
      <div class="login-by-else">
        <div class="left-arrow oauth-area"
        @tap.stop.prevent="openThirdLogin(authId.weixin)"></div>
        <div class="right-arrow oauth-area"
        @tap.stop.prevent="openThirdLogin(authId.qq)"></div>
      </div>
    </div>
  </v-dialog>
</template>
<script>
import Dialog from '@/components/Dialog'
import Register from './user-register'
import ResetPassword from './user-reset-password'
export default {
  components: { 'v-dialog': Dialog, Register, ResetPassword },
  props: ['value'],
  data() {
    return {
      openPages: 0,
      checkValidCode: '',
      validCodeTxt: '获取验证码',
      auths: {}, // 授权信息
      authId: {}, // 授权ID
      showModal: false,
      tenancyName: 'default',
      Mobile: '15099883651',
      passWord: '462A06C1C5E581F319EDB0B4732A48DA',
      focusName: '',
      socketId:''
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
  mounted() {
    mui.plusReady(() => {
      this.plusReady()
    })
  },
  sockets: {
    // 已经成功连接一次之后不会再进来了
    connect() {
      this.socketId = this.$socket.id
      console.log(`The ${this.socketId} is connected`)
    },
    customEmit(val){
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }
  },
  methods: {
    changeEye(e) {
      if (
        e.target.classList.length > 0 &&
        e.target.classList.contains('mui-active')
      ) {
        e.target.classList.remove('mui-active')
        e.target.previousElementSibling.type = 'password'
      } else {
        e.target.classList.add('mui-active')
        e.target.previousElementSibling.type = 'text'
      }
    },
    backoff(cur) {
      this.checkValidCode = ''
      this.openPages = 0
      this.validCodeTxt = '获取验证码'
    },
    //注册业务
    goRegister() {
      this.openPages = 1
    },
    goForgetPwd() {
      this.openPages = 2
    },
    // 获取验证码
    sendValid(Mobile, isRegister, e) {
      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (Mobile !== '' && myreg.test(Mobile)) {
        // 失效时间中间件由后台生产，不做处理
        app.api.user.msgValid({
          data: {
            Mobile: Mobile,
            register: isRegister // 是注册验证要加上这个参数
          },
          success: data => {
            let reg = /^[0-9]*$/
            if (reg.test(Number(data.message))) {
              this.checkValidCode = data.message
              this.validCodeTxt = 5
              let timer = setInterval(() => {
                this.validCodeTxt--
                if (this.validCodeTxt <= 0) {
                  clearInterval(timer)
                  e.target.removeAttribute('disabled')
                  this.validCodeTxt = '重新获取'
                }
              }, 1000)
            } else {
              app.mui.toast(data.message)
            }
          },
          complete: () => {
            e.target.setAttribute('disabled', 'disabled')
          }
        })
      } else if (!myreg.test(this.Mobile) && this.Mobile !== '') {
        app.mui.toast('请输入正确的手机号!')
      } else {
        app.mui.toast('请输入手机号!')
      }
    },
    //忘记密码业务
    // 用于获取随机的用户名
    /*
    need:
    短信注册/登录(用此注册可使用手机号登录或者账号登录)
    微信直接登录
    QQ直接登录
    */

    // 第三方登录，只为微信、QQ服务
    openThirdLogin(authId) {
      if (authId) {
        this.tenancyName = authId
        let auth = this.auths[authId]
        let waiting = plus.nativeUI.showWaiting()
        auth.login(
          () => {
            waiting.close()
            plus.nativeUI.toast(auth + '登录认证成功')
            auth.getUserInfo(
              () => {
                plus.nativeUI.toast('获取用户信息成功')
                let name = auth.userInfo.nickname || auth.userInfo.name
                // 因为是微信登录所有没有账户，先帮他注册一个账户
                // 如果有账户了就不注册了直接登录
                app.utils.getCurrentPosition(position => {
                  const longitude = position.coords.longitude; //获取经度
                  const latitude = position.coords.latitude;
                    app.api.user.useWxOrQQLogin({
                    data: {
                      tenancyName: this.tenancyName, // 是QQ还是微信--第三方服务名
                      nickName: name, // 昵称
                      openid: auth.userInfo.openid, // opid
                      headImg: auth.userInfo.headimgurl, // 头像图片
                      currentPosition: { longitude, latitude }
                    },
                    success: data => {
                      if (data.message === 'success') {
                        app.mui.toast('已登录')
                        const userInfo = Object.assign(data.user,{token:data.token})
                        app.globalService.setUserInfo(userInfo)
                        this.showModal = false
                      }
                    },
                    complete: () => {
                      plus.nativeUI.toast(data.message)
                      // app.mui(e.target).button('reset')
                    }
                  })
                })                
              },
              e => {
                plus.nativeUI.toast('获取用户信息失败：' + e.message)
              }
            )
          },
          e => {
            waiting.close()
            plus.nativeUI.toast('登录认证失败：' + e.message)
          }
        )
      }
    },
    plusReady() {
      //第三方登录
      let authBtns = ['weixin', 'qq'] //配置业务支持的第三方登录
      plus.oauth.getServices(
        services => {
          for (let i in services) {
            let service = services[i]
            this.auths[service.id] = service
            if (~authBtns.indexOf(service.id)) {
              this.authId[authBtns[i]] = service.id
            }
          }
        },
        e => {
          oauthArea.style.display = 'none'
          plus.nativeUI.toast('获取登录认证失败：' + e.message)
        }
      )
    },
    // 普通账户登录
    sumbit(e) {
      let _this = this
      if (!_this.Mobile) {
        _this.focusName = 'Mobile'
        app.mui.toast('请输入手机号登录')
        return
      }
      if (!_this.passWord) {
        _this.focusName = 'passWord'
        app.mui.toast('请输入密码')
        return
      }
      app.mui(e.target).button('loading')
        // 失效时间中间件由后台生产，不做处理
        //登录的时候要做websocket的与服务器的对接
        app.api.user.useMobileLogin({
          data: {
            Mobile: _this.Mobile,
            passWord: _this.passWord
          },
          success: data => {
            if (data.message === 'success') {
              const userInfo = Object.assign(data.user,{token:data.token})
              app.globalService.setUserInfo(userInfo)
              this.showModal = false
            }
          },
          complete: () => {
            app.mui(e.target).button('reset')
          }
        })
    }
    // go: function() {
    //   const [_this, _toName, _current_query] = [
    //     this,
    //     this.$route.query.toName,
    //     this.$route.query
    //   ]
    //   if (_toName) {
    //     delete _current_query.toName
    //     this.$router.push({ name: _toName, query: _current_query })
    //   } else {
    //     this.$router.push({ name: 'home' })
    //   }
    // }
  }
}
</script>
<style lang="less" scoped>
[data-page='login'] {
  .spliter {
    vertical-align: text-bottom;
  }
  .slider_1-enter-active,
  .slider_1-leave-active {
    transform: scale(1);
    opacity: 1;
    transition: all 0.3s ease;
  }
  .slider_1-enter, .slider_1-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: scale(0.8);
    opacity: 0;
  }
  .slider_2-enter-active,
  .slider_2-leave-active {
    transform: scale(1);
    opacity: 1;
    transition: all 0.3s ease;
  }
  .slider_2-enter, .slider_2-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: scale(0.8);
    opacity: 0;
  }
  .slider_3-enter-active,
  .slider_3-leave-active {
    transform: scale(1);
    opacity: 1;
    transition: all 0.3s ease;
  }
  .slider_3-enter, .slider_3-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: scale(0.8);
    opacity: 0;
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-transition-delay: 99999999999s;
    -webkit-transition: color 99999999999s ease-out,
      background-color 99999999999s ease-out;
  }
  .view-head {
    width: 50px;
    transform: rotate(9deg);
    color: #fff;
  }
  .mui-input-group:before {
    content: unset;
  }
  .link-area {
    padding: 10px 0;
  }
  .mui-input-row:after {
    left: 0;
  }
  .mui-input-group {
    background-color: transparent;
  }
  .log-now {
    line-height: 16px;
    width: 100%;
    border-radius: 15px;
    margin-top: 29px;
  }
}
.view-foot {
  padding: 5px 0 20px 0;
}
.login-by-else {
  display: inline-block;
  .left-arrow,
  .right-arrow {
    width: 25px;
    height: 25px;
    background-size: cover;
    background-repeat: no-repeat;
    display: inline-block;
    vertical-align: middle;
  }
  .left-arrow {
    background-image: url(../../imgs/fm/wechat.png);
    margin: 0 10px;
  }
  .right-arrow {
    background-image: url(../../imgs/fm/social-qq.png);
  }
}
</style>