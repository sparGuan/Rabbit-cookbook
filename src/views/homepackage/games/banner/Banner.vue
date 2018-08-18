<template>
    <div  class="banner" ref="banner">
		<div class="pic-load" :style="around"></div>
		<circle-tabs v-for="(item,index) in Items"  v-bind:key="index" :bg="item" :tslateX="index * -15"></circle-tabs>
    </div>
</template>
<script>
import CircleTabs from './Circletabs.vue'
export default {
  data() {
    return {
      around: {
        backgroundImage:
          'url(https://t10.baidu.com/it/u=2158189491,709933942&fm=173&s=5A41A9441D110ACC48CFE4920300C09B&w=545&h=279&img.JPEG)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      },
      Items: [
        'url(http://www.yokagames.com/usr/themes/yoka/static/src/img/game_m.png)',
        'url(https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=798755914,3994684506&fm=58)',
        'url(https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=f4cb3533cbef76093c0b9e9916e6c4f1/78310a55b319ebc44f7a47378226cffc1e171619.jpg)',
        'url(http://image.9game.cn/2018/3/13/19750027.jpg)',
        'url(https://webinput.nie.netease.com/img/my/icon3.png)'
      ]
    }
  },
  created() {},
  mounted() {},
  components: { CircleTabs }
}
</script>
<style lang="less" scoped>
.banner {
  height: 200px;
  background: #fff;
  padding: 5px;
  .pic-load {
    width: 100%;
    height: 80%;
    margin-bottom: 5px;
    border-radius: 5px;
  }
  .handMore {
  }
}
</style>