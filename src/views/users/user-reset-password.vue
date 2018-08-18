<template>
	<div data-page="reset-password">
		<div class="page-content">
			<div class="mui-content-padded">
				<div class="mui-input-row mui-inout">
					<input type="text" style="margin-bottom: 10px;" placeholder="请输入手机号" class="mui-input" maxlength="11" v-model="Mobile">
					<button type="button" data-loading-icon="mui-spinner mui-spinner-custom" class="mui-btn mui-btn-outlined mui-btn-primary spinner-valid" style="height:100%;font-size:12px;width:auto;border-color: transparent;top: -4px;right: -12px;position: absolute;" @click="$emit('sendValid',Mobile)" >{{validCodeTxt}}</button>
				</div>
				<div class="mui-input-row mui-password">
					<input type="password" style="margin-bottom: 10px;" v-model="passWord" placeholder="请输入新密码" class="mui-input-password" data-input-password="3"><span class="mui-icon mui-icon-eye" @tap.stop.prevent="$emit(
              'changeEye',$event)"></span>
				</div>
				<span class="mui-icon mui-icon-undo"  style="font-size: 20px;background: #eee;border-radius: 50%;padding: 3px;    background: #007aff;color: #fff;" @click="$emit(
              'backOff',2)"
        ></span>
				<input type="text" class="mui-input valid-inser" placeholder="请输入验证码" v-model="validCode">
			</div>
			<div class="button-panel">
				<button class="mui-btn mui-btn-primary" data-loading-icon-position="center" style="display: block;width: 100%;" @click="toFoundPwd">找回</button> 
			</div>
		</div>
	</div>
</template>
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
		toFoundPwd() {
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
          app.api.user.forgetPwd({
            data: {
              Mobile: this.Mobile,
              passWord: this.passWord
            },
            success: data => {
              if (data.message === "success") {
                this.$emit("close", false);
                app.mui.toast("修改密码成功!");
                app.globalService.setUserInfo({
                  token: data.token,
                  Mobile: this.Mobile,
                  expiredTime: data.expiredTime // 失效时间
                });
              }
            },
            complete: () => {
              // 这里进行倒数
              // app.mui(e.target).button("reset");
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
<style lang="less" scoped>
[data-page="reset-password"] {
  .button-panel {
    text-align: center;
  }
  .mui-btn-primary.spinner-valid:enabled:active {
    color: #007aff;
    border-color: transparent;
    background-color: transparent;
  }
  .valid-inser {
    width: calc(~"100% - 60px");
    height: 30px;
    margin-left: 30px;
    background: transparent;
    margin-bottom: 0;
  }
}
</style>