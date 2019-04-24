<template>
  <v-dialog
    v-model="showModal"
    :showHead="true"
    :showFoot="true"
    :showHeadBg="true"
    :closeBack="modelCloseBack"
  >
    <div slot="header" class="view-head">
      填写个人信息认证
    </div>
    <div data-page="user-authentication" slot="body">
      <div class="mui-content mui-input-group">
        <div class="mui-input-row" style="height:auto;">
          <label style="width:auto;">个人手持证件照</label>
          <button @click="sheetToggle" class="upload-button up-btn">
            <i
              class="iconfont icon-shouchishenfenzheng"
              style="margin-right: 5px;"
            ></i
            >上传照片
          </button>
          <div class="id-photo">
            <i
              class="iconfont icon-morentupian_da"
              v-if="defaultIdPhoto === ''"
            ></i>
            <img :src="defaultIdPhoto" v-else />
          </div>
        </div>
        <div class="mui-input-row">
          <label>身份证</label>
          <input
            type="text"
            class="mui-input-clear"
            placeholder="请输入证件号"
            v-model="uploadAuthData.iDNumber"
          />
        </div>
        <div class="mui-input-row">
          <label style="width:auto;">银行卡号</label>
          <input
            type="text"
            class="mui-input-clear"
            style="width: calc(100% - 87px);"
            v-model="uploadAuthData.bankCardNumber"
          />
        </div>
        <!-- 所属银行 -->
        <div class="mui-input-row">
          <label style="width:auto;">所属银行</label>
          <input
            type="text"
            class="mui-input-clear"
            style="width: calc(100% - 87px);"
            v-model="uploadAuthData.bankCardNumber"
          />
        </div>
        <div class="mui-input-row">
          <label>手机号</label>
          <input
            type="text"
            class="mui-input-clear"
            placeholder="绑定银行卡手机号"
            v-model="uploadAuthData.Mobile"
          />
        </div>
      </div>
    </div>
    <div slot="footer" class="view-foot">
      <button
        type="button"
        class="mui-btn mui-btn-primary"
        data-loading-icon="mui-spinner"
        data-loading-icon-position="right"
        data-loading-text="提交中..."
        @click="saveAuthentication($event)"
      >
        提交认证
      </button>
    </div>
  </v-dialog>
</template>
<script>
import Dialog from "@/components/Dialog";
import utils from "@/js/utils/utils";
const luhmCheck = require('@/js/lib/luhmCheck');
require('@/js/lib/bankcard');
export default {
  components: {
    "v-dialog": Dialog
  },
  props: ["value", "file_url", "defaultIdPhoto"],
  data () {
    return {
      uploadAuthData: {
        handHeldIDCard: this.file_url,
        iDNumber: '',
        bankCardNumber: '',
        Mobile: '',
        userId: app.globalService.getLoginUserInfo()._id,
        status: 0
      },
      showModal: false,
    };
  },
  watch: {
    value (now, old) {
      this.showModal = now;
    },
    showModal (now, old) {
      this.$emit("input", now);
    }
  },
  mounted () { },
  methods: {
    /**
     * 检测银行卡正确并且显示该银行名
     */
    checkAndSetBankName () {

    },
    /**
     * @params data ====> 用户认证信息
     * 保存用户认证信息
     */
    saveAuthentication (e) {
      const data = this.uploadAuthData;
      // 判断非空和格式验证
      for (let key in this.uploadAuthData) {
        if (this.uploadAuthData[key] === '') {
          app.mui.toast('请填写完整信息');
          return false
        }
      }
      if (!utils.isVerifyPhone(data.Mobile)) {
        app.mui.toast('手机号格式不正确');
        return false
      }
      if (!utils.isVerifyIDNumber(data.iDNumber)) {
        app.mui.toast('身份证号格式不正确');
        return false
      }
      app.mui(e.target).button('loading')
      app.api.auth.saveAuthentication({
        data,
        success: res => {
          if (res.error_code === 0) {
            app.mui.toast('认证成功！请等待审核')
          }
        },
        complete: () => {
          app.mui(e.target).button('reset')
        }
      });
    },
    sheetToggle () {
      //传入toggle参数，用户无需关心当前是显示还是隐藏状态，mui会自动识别处理；
      this.$store.dispatch("updateFooterStatu", false);
      mui(this.$parent.$refs['sheet_upload']).popover('toggle');
      document.querySelector('.mui-backdrop').style.display = 'none';
    },
    modelCloseBack () {
      this.$store.dispatch("updateFooterStatu", true);
      mui(this.$parent.$refs['sheet_upload']).popover('hide');
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../../../src/less/_mixins.less");
// 提交按钮
.view-foot {
  text-align: center;
  padding: 10px 0;
}
[data-page="user-authentication"] {
  .mui-input-group {
    background-color: transparent;
  }
  .upload-button {
    position: relative;
    overflow: visible;
    display: inline-block;
    padding: 0.5em 1em;
    border: 1px solid #d4d4d4;
    margin: 0;
    text-decoration: none;
    text-shadow: 1px 1px 0 #fff;
    font: 12px / normal sans-serif;
    color: #333;
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    background-color: #ececec;
    background-image: -webkit-gradient(
      linear,
      0 0,
      0 100%,
      from(#f4f4f4),
      to(#ececec)
    );
    background-image: -moz-linear-gradient(#f4f4f4, #ececec);
    background-image: -o-linear-gradient(#f4f4f4, #ececec);
    background-image: linear-gradient(#f4f4f4, #ececec);
    -webkit-border-radius: 0.2em;
    -moz-border-radius: 0.2em;
    border-radius: 0.2em;
    zoom: 1;
  }
  .id-photo {
    width: calc(~"100% - 11px");
    height: 95px;
    text-align: center;
    margin: 5px;
    .justify-content(center);
    .flexbox();
    .align-items(center);
    & > i {
      font-size: 64px;
      color: #999;
    }
  }
  .up-btn {
    margin-top: 3px;
    width: 112px;
  }
  .upload-button:hover,
  .upload-button:focus,
  .upload-button:active {
    border-color: #3072b3;
    border-bottom-color: #2a65a0;
    text-decoration: none;
    text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.3);
    color: #fff;
    background-color: #3072b3;
    background-image: -webkit-gradient(
      linear,
      0 0,
      0 100%,
      from(#599bdc),
      to(#3072b3)
    );
    background-image: -moz-linear-gradient(#599bdc, #3072b3);
    background-image: -o-linear-gradient(#599bdc, #3072b3);
    background-image: linear-gradient(#599bdc, #3072b3);
  }
}
</style>