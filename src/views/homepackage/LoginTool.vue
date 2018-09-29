<template>
    <div data-page="login-tool" @tap.stop.prevent="openLog">
      <div class="put-log">
        <!-- <i class="iconfont " :class="icon" style="font-size:26px;"></i> -->
        <svg class="whale" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 354.84 187.46">
            <defs>                
            </defs>
            <path class="cls-1" d="M648,956.71c-2.85,6.93-4.78,14.44-8.76,20.64-5.51,8.57-13.23,14.47-24.66,13.69-7.22-.49-9.51,2.61-10.86,9.73-3.59,18.82-6.91,37.74-11.58,56.31-4.81,19.1-17.72,28.1-37.38,28.11-52.85,0-105.69.21-158.54-.1-22.51-.13-43.49-6.24-62.18-19.22-1.85-1.28-3.62-2.66-5.93-4.37l25.07-21.94-0.48-1.07c-9.26,1.4-18.52,2.78-27.77,4.22-2.9.45-5.77,1.09-8.67,1.6-3.42.61-5.74-.56-7.8-3.6a87.58,87.58,0,0,1,14.1-114.91c18.62-16.69,40.32-25.78,65.28-27.65,32.33-2.42,60.37,6.9,83.19,30.14,15.77,16.05,24.58,35.84,29.23,57.71,2.9,13.63,7.56,26.61,15.84,38.06,13.16,18.2,37.09,23.74,54.25,12.6,10.16-6.59,14-16.79,16.11-27.94,0.62-3.22.86-6.52,1.24-9.78,0.72-6.17-1.53-10.2-7.47-10.9-8.71-1-15.35-4.56-20.16-12-5.8-8.94-8.86-18.36-6.49-29.84,1.44,0.6,3.67,1,3.79,1.66,1.28,7.57,7.78,5.72,12.36,6.85,4.85,1.19,10,1.27,14.88,2.25,6.55,1.31,11.31,5,13.11,10.52,4.87-2.61,9.61-5.82,14.84-7.7,3.23-1.16,7.19-.4,10.81-0.33,4,0.08,8,.77,12,0.4,2.31-.22,5.57-1.45,6.46-3.21,1.69-3.35,3.57-3.07,6.19-2.05v2.09ZM341.13,991.18c-0.86,7.45,5.25,15.31,15.8,15.71,8.22,0.31,15.95-7.45,16.08-15.42,0.13-8.32-7.57-15.73-16.27-15.67C347.83,975.87,341.15,982.45,341.13,991.18Z"
            transform="translate(-293.16 -897.79)" />
        </svg>
        <span>{{detals}}</span>
      </div>
      <p class="welcome">WELCOME</p>
      <Login v-model="showModal"></Login>
    </div>
</template>
<script>
// *：一进入页面就应该先去判断是否账号已失效
import Login from '../users/user-login';
export default {
  components: { Login },
  watch: {
    showModal(old, now) { 
      if (app.globalService.isLogin()) {
        this.detals = '登出';
        this.icon = 'icon-shoujidenglu';
      }
    }
  },
  data() {
    return {
      detals: app.globalService.isLogin() ? '登出' : '登录',
      icon: 'icon-disanfangdenglu',
      showModal: false
    };
  },
  sockets: {
      isLogin_sent(val){
        console.log(val)
        app.globalService.setUserInfo(val)
        this.showModal = false        
        console.log('this method was fired by the socket server. eg: io.emit("customEmit", data——————————LoginTool.Vue)')
      }
    },
  mounted() {    
    this.updateLoginInfo();
  },
  methods: {
    updateLoginInfo() {
      // pc测试
      if (app.globalService.isLogin()) {
         app.api.user.updateLoginInfo({
            data: {
              userId: app.globalService.getLoginUserInfo()._id,
              location: [Number(113.0071691637521) , Number(22.98209228868979)]
            },
            success: res => {
              if (res.message === 'success') {                
                this.$socket.emit('isLogin', res.user);
              }
            }
          });
          // 正式手机测试
        // app.utils.getlocation(position => {
        //   const longitude = position.coords.longitude; //获取经度
        //   const latitude = position.coords.latitude;
        //   app.api.user.updateLoginInfo({
        //     data: {
        //       userId: app.globalService.getLoginUserInfo()._id,
        //       location: [Number(longitude), Number(latitude)]
        //     },
        //     success: res => {
        //       if (res.message === 'success') {
        //         this.$socket.emit('isLogin', res.user,res.token);
        //       }
        //     }
        //   });
        // });
      }
    },
    openLog() {
      if (this.detals === '登录') {
        this.showModal = true;
      } else {
        mui.confirm('确定登出？', e => {
          if (e.index == 1) {
            // 清楚localstrog缓存
            app.globalService.logOut();
            this.detals = '登录';
          } else {
            this.showModal = false
          }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
[data-page='login-tool'] {
  position: absolute;
  z-index: 1001;
  height: auto !important;
  margin-left: 15px;
  margin-top: 15px;
  .put-log {
    color: rgba(0, 122, 255, 0.9);
    font-weight: bold;
    text-shadow: 0 0 0.2em #f7f7f7, 0 0 0.2em rgba(144, 139, 173, 0.2),
      0 0 0.2em rgba(241, 205, 176, 0.2);
    box-shadow: 0px 21px 15px rgba(51, 51, 51, 0.19);
  }
  .welcome {
    color: #f5f5f5;
  }
}
.cls-1 {
  fill: rgba(0, 122, 255, 0.9);
}
.whale {
  width: 20px;
}
</style>