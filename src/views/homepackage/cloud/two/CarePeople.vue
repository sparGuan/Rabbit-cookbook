<template>
    <div  class="CarePeople" ref="CarePeople">
        <ul class="sign-people-group"> 
            <li class="sign-people-item">
                <div class="sign-people-item-mark icon-smile">
                </div>
                <div class="sign-card">
                    <div class="mui-progressbar">
                        <span></span>
                    </div>
                    <div class="head-img"></div>
                    <div class="zan-msg">
                      <p>努力每一天，点赞我吧！</p>  
                      <p>陈家瑞</p>                    
                    </div>
                    <div class="xin icon-heart"><span style="font-size: 12px;">34</span></div>
                </div>
                <!--关注他小提示-->
                <div class="flow">
                  点个赞<span class="icon-heart3 icob"></span>
                </div>
            </li>
        </ul>    	
    </div>
</template>
<script>
export default {
  components: {},
  created() {
    this.$nextTick(() => {
      mui('.mui-progressbar')
        .progressbar({ progress: 20 })
        .show()
    })
  }
}
</script>
<style lang="less" scoped>
.CarePeople {
  width: 100%;
  height: 100%;
  padding-top: 25px;
  .sign-people-group {
    width: 100%;
    height: auto;
  }
  .sign-people-item {
    padding: 0 30px;
    position: relative;
  }
  .head-img {
    background-image: url(../../../../imgs/test/yuantiao.jpg);
    height: 50px;
    width: 50px;
    position: absolute;
    left: 25px;
    top: 10px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  .sign-people-item-mark {
    width: 24px;
    height: 24px;
    position: absolute;
    background-color: #fff;
    top: calc(~'50% - 12px');
    left: 20px;
    border-radius: 50%;
    color: #007aff;
    font-size: 24px;
    box-shadow: 2px 0px 20px #007aff;
    z-index: 999;
  }
  .zan-msg {
    padding: 15px 55px 15px 100px;
    height: 100%;
    color: #666;
  }
  .xin {
    position: absolute;
    right: 15px;
    top: calc(~'50% - 10px');
    font-size: 24px;
    color: #007aff;
  }
  .flow {
    width: calc(~'100% - 20px');
    box-shadow: 0px 2px 5px #bfcafc69;
    margin: 0 auto;
    text-align: center;
    padding: 4px 0;
  }
  .sign-card {
    height: 70px;
    position: relative;
    box-shadow: 0px -5px 20px #bfcafc;
  }
  .icob {
    font-size: 16px;
    margin-left: 5px;
    vertical-align: text-bottom;
    color: #d87598;
  }
}
</style>