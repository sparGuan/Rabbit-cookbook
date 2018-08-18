<template>
	<div data-page="user-siteInfo">
		<div class="page-content">
			<ul class="mui-table-view mui-table-view-chevron">
				<li class="mui-table-view-cell mui-media head-image-panel" :style="'background-image:url('+headBgImg+')'">
					<div class="item head-content">
						<div class="item-content">
							<span class="header-img iconfont icon-paizhaoshangchuan" @click="chooseImageControl">
								<img class="preview-img" :src="showHeadImg"> 
							</span>              
						</div>
            <div class="upload-user-bg"><i class="iconfont icon-shangchuan" style="font-size: 26px;color:#007aff;"></i></div>
					</div>
          <input type="file" ubt="upBgImg" accept="image/gif,image/jpeg,image/jpg,image/png" class="img-file uploadBg" @change="takeAlbum($event,'showHeadBgImg')"> 
				</li>
				<li class="mui-table-view-cell mui-media">
					<div class="item">
						<div class="item-label">
							昵称
						</div>
						<div class="item-content">
							<input type="text" placeholder="请输入昵称" v-model="userInfo.nickName">
						</div>
					</div>
				</li>
				<li class="mui-table-view-cell mui-media">
					<div class="item">
						<div class="item-label">
							手机
						</div>
						<div class="item-content">
							<input type="tel" placeholder="请输入手机号" maxlength="11" v-model="userInfo.Mobile">
						</div>
					</div>
				</li>
				<li class="mui-table-view-cell mui-media" @click="sitePersonSex">
					<div class="item">
						<div class="item-label" >
							性别
						</div>
            <div class="item-content" style="padding-left: 16px;" v-if="sex !== null">
                {{ userInfo.sex === 0? '男':'女'}}
              </div>
					</div>
				</li>
        <li class="mui-table-view-cell mui-media">
					<div class="item">
						<div class="item-label" >
							今日心情
						</div>
            <div class="item-content" style="width: calc(100% - 65px);">
              <textarea  rows="3" v-model="userInfo.descPerson"></textarea>
            </div>
					</div>
				</li>
			</ul>
			<div class="button-panel"> 
				<button  type="button" data-loading-text="正在更新" class="button button-save" data-loading-icon="mui-spinner mui-spinner-white" @tap.stop.prevent="updateUserInfo($event)">保存</button>
			</div>
		</div>
    <!-- 点击弹窗选择性别-->
    <div ref="sitePersonSex" class="mui-popover mui-popover-action mui-popover-bottom">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<a href="javascript:void(0)" class="iconfont icon-nan" @click="siteSex(0)">男生</a>
				</li>
				<li class="mui-table-view-cell">
					<a href="javascript:void(0)" class="iconfont icon-iconfontiocnnv2" @click="siteSex(1)">女生</a>
				</li>
			</ul>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<a href="javascript:void(0)" @click="sitePersonSex"><b>取消</b></a>
				</li>
			</ul>
		</div>
    <div ref="uploadImage" class="mui-popover mui-popover-action mui-popover-bottom">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<a href="javascript:void(0)" @click="takePhotos">拍照</a>
				</li>
				<li class="mui-table-view-cell">
					<a href="javascript:void(0)">
            <input type="file" ubt="upImg" @change="takeAlbum($event,'showHeadImg')" accept="image/gif,image/jpeg,image/jpg,image/png" class="openalbum"> 
            打开相册</a>
				</li>
			</ul>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<a href="javascript:void(0)" @click="canelImageControl"><b>取消</b></a>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import takeH5Photos from '../../js/utils/takeH5Photos';
export default {
  data() {
    return {
      task: null,
      headImg: '',
      headBgImg: '',
      showHeadImg: '../../../src/imgs/userCenter/touxiangDefault.png',
      userInfo: {
        sex: null, // 0是男，1是女
        nickName: '',
        Mobile: '',
        descPerson: '',
        userId: app.globalService.getLoginUserInfo()._id
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (
        from.name === 'userCenter' &&
        Object.keys(vm.$route.params).length > 0
        && Object.keys(vm.$route.params.userInfo).length > 0
      ) {
        vm.userInfo.nickName = vm.$route.params.userInfo.nickName;
        vm.userInfo.Mobile = vm.$route.params.userInfo.Mobile;
        vm.showHeadImg = vm.headImg = app.getResourceUrl(vm.$route.params.userInfo.headImg);
        vm.headBgImg = app.getResourceUrl(vm.$route.params.userInfo.headBgImg);
        vm.userInfo.descPerson = vm.$route.params.userInfo.descPerson;
      }
    });
  },
  mounted() {
    this.$nextTick(() => {
      const isSendToServer = true;
      this.takeH5Photos = new takeH5Photos({});
    });
  },
  methods: {
    canelImageControl() {
      mui(this.$refs['uploadImage']).popover('toggle');
    },
    chooseImageControl() {
      mui(this.$refs['uploadImage']).popover('toggle');
    },
    takeAlbum(e, put) {
      if (e.target.files && e.target.files[0]) {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        if (put === 'showHeadImg') {
          this.headImg = e.target.files[0];
        } else {
          this.headBgImg = e.target.files[0];
        }
        reader.onload = evt => {
          switch (put) {
            case 'showHeadImg':
              this.showHeadImg = evt.target.result;
              mui(this.$refs['uploadImage']).popover('toggle');
              break;
            case 'showHeadBgImg':
              this.showHeadBgImg = evt.target.result;
              break;
            default:
              break;
          }
        };
      }
    },
    takePhotos() {
      // 返回拍照的文件
      this.showHeadImg = this.takeH5Photos.openCamera();
    },
    sitePersonSex() {
      mui(this.$refs['sitePersonSex']).popover('toggle');
    },
    siteSex(sex) {
      this.userInfo.sex = sex;
      mui(this.$refs['sitePersonSex']).popover('toggle');
    },
    updateUserInfo(e) {
      mui(e.target).button('loading');
      const userInfo = Object.assign({}, this.userInfo);
      console.log(userInfo)
      const data = new FormData();
      data.append('userInfo', JSON.stringify(userInfo));
      data.append('headBgImg', this.headBgImg);
      data.append('headImg', this.headImg);
      // 更新用户信息
      app.api.user.updateUserInfo({
        data,
        success: res => {
          if (res.message === 'success') {
            new Promise (reslove => {
              const user = app.globalService.setUserInfo(Object.assign(res.user,{token:res.token}))
              reslove(user)
            }).then( user => {
              this.$router.push({ name: 'userCenter',params: {
              user
            } });
            })
          }
        },
        complete: () => {
            app.mui(e.target).button('reset')
          }
      });
    }
  }
};
</script>
<style lang="less" scoped>
[data-page='user-siteInfo'] {
  background-color: #fff;
  .mui-table-view-chevron .mui-table-view-cell {
    padding-right: 10px;
    .uploadBg {
      opacity: 0;
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }
  }
  .mui-table-view-cell {
    .icon-nan:before {
      margin-right: 5px;
    }
    .icon-iconfontiocnnv2:before {
      margin-right: 5px;
    }
  }
  .mui-table-view-cell:after {
    left: 0;
  }
  .head-image-panel {
    height: 170px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    .head-content {
      .item-content {
        margin: 0 auto;
        z-index: 10;
      }
    }
  }
  // .mui-table-view-cell.mui-active {
  // 	background-color: unset;
  // }
  .upload-user-bg {
    position: absolute;
    left: 10px;
    bottom: 10px;
  }
  .item {
    box-sizing: border-box;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-item-align: stretch;
    -webkit-align-self: stretch;
    align-self: stretch;
    .item-label {
      -webkit-flex-shrink: 1;
      -ms-flex: 0 1 auto;
      flex-shrink: 1;
      white-space: nowrap;
      position: relative;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }
    .item-content {
      white-space: nowrap;
      color: #8e8e93;
      -webkit-flex-shrink: 0;
      -ms-flex: 0 0 auto;
      flex-shrink: 0;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      width: calc(~'100% - 35px');
      .header-img {
        border-radius: 50%;
        position: relative;
        overflow: hidden;
        display: inline-block;
        width: 60px;
        height: 60px;
        line-height: 60px;
        background-color: rgba(0, 0, 0, 0.3);
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.3), 0 0 5px rgba(0, 0, 0, 0.1) inset;
        box-sizing: border-box;
        font-size: 24px;
        color: rgba(255, 255, 255, 0.9);
        text-align: center;
        .img-file,
        .preview-img {
          z-index: -1;
          position: absolute;
          left: 0;
          top: 0;
          height: 58px;
          width: 58px;
          /*border: 1px solid #ccc;*/
        }
        .img-file {
          z-index: 7;
          opacity: 0;
        }
      }
      input {
        border: none;
        text-align: left;
        color: #999;
        resize: inherit;
        width: 100%;
        margin-bottom: 0px;
      }
      .icon-man,
      .icon-woman {
        font-size: 35px;
        margin-right: 10px;
      }
      .icon-man.on {
        color: #0ab0fd;
      }
      .icon-woman.on {
        color: #f77496;
      }
    }
  }
  .button-save {
    color: #fff;
    display: block;
    margin: 40px auto 10px;
    width: 96%;
    height: 44px;
    font-size: 18px;
    line-height: 44px;
    background-color: #007aff;
    border-color: #007aff;
    border-radius: 4px;
    text-align: center;
  }
  .openalbum {
    opacity: 0;
    position: absolute;
    width: 100%;
    left: 0;
  }
}
</style>