<template>
  <div data-page="register">
      <div class="mui-input-group">
          <div class="mui-input-row">
            <input type="text" class="mui-input-speech" placeholder="输入手机号" style="width: 145px;" v-model="Mobile">
            <button type="button" data-loading-icon="mui-spinner mui-spinner-custom" class="mui-btn mui-btn-outlined mui-btn-primary spinner-valid" style="height:100%;font-size:12px;width:auto;border-color: transparent;" @click="$emit('sendValid',Mobile,true,$event)">{{validCodeTxt}}</button>
          </div>
          <div class="mui-input-row">
            <input type="password" class="mui-input-clear mui-input-password" placeholder="请输入密码" v-model="passWord">
            <span class="mui-icon mui-icon-eye"  @tap.stop.prevent="$emit(
              'changeEye',$event)"></span>
          </div>    
      </div>
      <div class="link-area">
            <span class="mui-icon mui-icon-undo"  style="font-size: 20px;background: #eee;border-radius: 50%;padding: 3px;    background: #007aff;color: #fff;" @click="$emit(
              'backOff',1)"
           ></span>
            <input type="text" class="mui-input valid-inser" placeholder="请输入验证码" v-model="validCode">
            <button class="mui-btn mui-btn-primary" data-loading-icon-position="center" style="display: block;width: 100%;margin: 0 auto;    margin-top: 5px;" @tap.stop.prevent="toRegister">注册</button>
      </div>
  </div>
</template>
<style lang="less" scoped>
[data-page="register"] {
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-transition-delay: 99999999999s;
    -webkit-transition: color 99999999999s ease-out,
      background-color 99999999999s ease-out;
  }
  .valid-inser {
    width: calc(~"100% - 60px");
    height: 30px;
    margin-left: 30px;
    background: transparent;
  }
  .link-area {
    padding: 10px 0;
  }
  .mui-input-group .mui-input-row:after {
    left: 0;
  }
  .mui-btn-primary.spinner-valid:enabled:active {
    color: #007aff;
    border-color: transparent;
    background-color: transparent;
  }
  .mui-input-group {
    background-color: transparent;
  }
}
</style>
<script>
export default {
  props: ["checkValidCode","validCodeTxt"],
  data() {
    return {
      Mobile: "",
      validCode: "",      
      passWord: ""
    };
  },
  methods: {
    toRegister() {
      if (this.passWord === "") {
        app.mui.toast("请输入密码!");
        return;
      } else if (this.Mobile === "") {
        app.mui.toast("请输入手机号!");
        return;
      } else if (this.validCode === "") {
        app.mui.toast("请输入验证码!");
        return;
      }
      // 判断都正确进入
      if (this.passWord !== "" && this.Mobile !== "" && this.validCode !== "") {        
        if (this.checkValidCode === Number(this.validCode)) {
          app.api.user.register({
            data: {
              Mobile: this.Mobile,
              passWord: this.passWord
            },
            success: data => {
              if (data.message === "success") {
                this.$emit("close", false);
                app.mui.toast("注册成功!");
                app.globalService.setUserInfo({
                  token: data.token,
                  Mobile: this.Mobile,
                  expiredTime: data.expiredTime // 失效时间
                });
              }
            },
            complete: () => {
              // 这里进行倒数             
            }
          });
        } else {
          app.mui.toast("验证码输入不正确!");
        }
      } else {
        return;
      }
    }
  }
};
</script>