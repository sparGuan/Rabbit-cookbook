<template>
  <div class="custom-gathers-list mui-scroll-wrapper" ref="custom_gathers_list">
    <!-- 实现横向列表 -->
    <!-- 实现左右列表排向 -->
    <!-- 整图列表 -->
    <ul class="mui-scroll" >
        
        <li class="list-item">
            <div class="lutter-full-img" >
              <!-- 里面是否有video的图标 -->
            </div>
            <div class="lutter-img-txt">
              <div class="lutter-left-info">

              </div><div class="lutter-right-desc">
                  <p class="lutter-right-tit">武汉大学的樱花开了！</p>
                  <p class="lutter-right-msg" >
                    3月底至4月初开放的垂枝樱花，位于枫园三舍南侧路边和樱园南玻绿地附近；4月初开放...
                  </p>
              </div>
            </div>
        </li>
        <!-- 左右排版列表 -->
        <!-- 左图右列表 -->
        <li class="list-item">
          <div class="grow-left-img">
              
          </div>
          <div class="grow-right-desc">
            <p class="grow-right-tit">如何用手机拍出高大上的美食 ？</p>
            <p class="grow-right-msg">每一个资深食货都深藏着一颗拍好美食的心，还隐藏着一小份深更半夜在朋友圈拉仇恨的小小虚荣感...</p>
          </div>
        </li>

        <!-- 右图左列表 -->
        <li class="list-item">
          <div class="brow-left-desc">
            <p class="brow-left-tit">单身是一种生活方式</p>
            <p class="brow-left-msg">对于单身女性而言，年龄越大面临着来自社会及家庭的压力也越大...</p>
          </div><div class="brow-right-img">

          </div>
        </li>

        <!-- 格子多图列表 一般用于动态发表，活动发表文章 -->
        <li class="list-item">
            <div class="grid-item-wrapper">
              <ul class="grid-list mui-clearfix">
                <li class="grid-list-item"></li>
                <li class="grid-list-item"></li>
                <li class="grid-list-item"></li>
                <li class="grid-list-item"></li>
                <li class="grid-list-item"></li>
                <li class="grid-list-item"></li>
              </ul>
            </div>

            <div class="grid-bottom-desc">
              <p class="grid-bottom-tit">路人镜头下的杨清柠，不料被身后的男伴抢镜，网友：新男友 ？</p>
              <p class="grid-bottom-msg">娱小美</p>
            </div>
        </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: [],
  data() {
    return {}
  },
  mounted() {
    mui(this.$refs['custom_gathers_list']).scroll({
        deceleration: 0.0005, // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false // 是否显示滚动条
      });
  },
  methods: {
    
  }
};
</script>
<style lang="less" scoped>
@color-font:#464646;
.list-item {
  margin-bottom:10px;
  background: #fff;
  display: block;
  padding: 10px;
}
.grow-left-img {
  float: left;
  background-image: url('../../../src/imgs/test/248.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 120px;
  height: 85px;
  float: left;
}
.grow-right-desc {
  height: 85px;
  margin-left: 120px;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.grow-right-msg {
  font-size: 12px;
}
.lutter-full-img {
  background-image: url('../../../src/imgs/custom/list-item.png');
  height: 180px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.lutter-img-txt {
  padding:10px;
  display: flex;
  align-items: center;
}
.lutter-left-info {
  width:50px;
  height:50px;
  vertical-align: top;
  float: left;
  background-color: #ff8d8c;
  margin-right: 15px;
}
.lutter-right-desc {
  width: calc(~'100% - 100px');
  height: 100%;
  vertical-align: top;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.lutter-right-tit {
  color:@color-font;
}
.lutter-right-msg {
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
.grow-right-tit {
  font-size: 14px;
  color:@color-font;
}
.brow-left-tit {
  font-size: 18px;
  color:@color-font;
}
.brow-left-msg {
  font-size: 12px;
}
.brow-left-desc {
  max-width: calc(~'100% - 150px');
  display: inline-block;
  vertical-align: middle;
  padding: 15px;
}
.brow-right-img {
  width: 150px;
  height: 150px;
  display: inline-block;
  vertical-align: middle;
  background-image: url('../../../src/imgs/test/muwu.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.grid-item-wrapper {
  width:100%;
  height:auto;
  background-color: #fff;
  .grid-list {
    .grid-list-item {
      float: left;
      width: calc(~'(100% - 10px) / 3');
      margin-right:5px;
      display: block;
      height: 50px;
      height: 80px;
      background-image: url('../../../src/imgs/test/yuantiao.jpg');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      margin-bottom: 5px;
    }
    .grid-list-item:nth-child(3n) {
      margin-right:0;
    }
  }
 
}
.grid-bottom-tit {
  color: @color-font;
  margin-bottom: 15px;
}
.grid-bottom-msg {
  font-size: 12px;
  color: #ccc;
}
</style>