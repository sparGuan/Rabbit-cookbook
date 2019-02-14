<template>
  <div class="custom-gathers-list mui-scroll-wrapper" ref="custom_gathers_list">
    <!-- 实现横向列表 -->
    <!-- 实现左右列表排向 -->
    <!-- 整图列表 -->
    <!-- 有视频的列表就单列 -->
    <!-- 只有一张图片的随机选择左右列 -->
    <!-- 多张图片的选择多图文列 -->
    <ul class="mui-scroll">
        <!-- 如果是单图文类型 || 视频类型 -->
        <li class="list-item" :key="item._id" v-for="item in listItem">

            <div v-if="getRandomListItem(item) && showRowItem">
              <div class="lutter-full-img" :style="`background-image:url(${getImage(checkType(item,'image'))})`">
                <!-- 里面是否有video的图标 -->
              </div>
              <div class="lutter-img-txt">
                <div class="lutter-left-info">
                </div><div class="lutter-right-desc">
                    <p class="lutter-right-tit" v-text="checkType(item, 'title')">武汉大学的樱花开了！</p>
                    <p class="lutter-right-msg" >
                      3月底至4月初开放的垂枝樱花，位于枫园三舍南侧路边和樱园南玻绿地附近；4月初开放...
                    </p>
                </div>
              </div>
            </div>
            
            <div v-else-if="getRandomListItem(item) && showLItem">
              <div class="grow-left-img">
              </div>
              <div class="grow-right-desc">
                <p class="grow-right-tit">如何用手机拍出高大上的美食 ？</p>
                <p class="grow-right-msg">每一个资深食货都深藏着一颗拍好美食的心，还隐藏着一小份深更半夜在朋友圈拉仇恨的小小虚荣感...</p>
              </div>
            </div>

            <div v-else-if="getRandomListItem(item) && showRItem">
              <div class="brow-left-desc">
                <p class="brow-left-tit">单身是一种生活方式</p>
                <p class="brow-left-msg">对于单身女性而言，年龄越大面临着来自社会及家庭的压力也越大...</p>
              </div><div class="brow-right-img">

              </div>
            </div>

            <div v-else-if="!getRandomListItem(item) && item.linkType === 3">
              <div class="grid-item-wrapper">
                <ul class="grid-list mui-clearfix">
                  <li class="grid-list-item" v-for="(item,index) in item.album[0]" :key="index" :style="`background-image:url(${getImage(item)})`"></li>
                </ul>
              </div>
              <div class="grid-bottom-desc">
                <p class="grid-bottom-tit" v-text="item.speech"></p>
                <p class="grid-bottom-msg">来自： <span class="head-box" :style="`background-image:url(${getImage(item.user.headImg)})`"></span>{{item.user.nickName}} <span class="flow" @click="addToflow(item._id,item.footprintType,item.user._id)"><i  class=" iconfont icon-guanzhu putguanzhu"></i>+关注</span></p>
              </div>
            </div>
        </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: [],
  data() {
    return {
      showRowItem: false, // 横向图文
      showLItem: false, // false为左
      showRItem: false,
      listItem: []
    }
  },
  mounted() {
    mui(this.$refs['custom_gathers_list']).scroll({
        deceleration: 0.0005, // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false // 是否显示滚动条
      });
    this.getList()
  },
  methods: {
    /**
     * @params id 该列表id
     * @params type 判断该足迹类型是啥类型 0：动态类型 1：活动类型
     * 实现需求，完成关注
     * by 19/1/5
     * 预计完成by 19/1/7
     */
    addToflow(id,footprintType,acceptUserId) {
      const data = {
        sourceDataId:id, // 数据表id
        sourceDataType: footprintType, // 数据表类型 、、动态  活动
        user: app.globalService.getLoginUserInfo._id,
        acceptUser: acceptUserId,
        type: '3' // 类型为3代表关注
      }
      app.api.customerGather.saveFlow({
        data,
        success: res => {
            if (res.message === 'success') {
               app.mui.toast('已关注')
            }
        }
      })
    },
    // 传入对象，判断类型，返回需要的值
    // 分配数据控制器
    checkType(item,require) {
    // 检测类型，需要什么返回什么
    // 0是动态类型
      if (item.footprintType === 0) {
        switch(require)
        {
            case 'image':
                return item.album[0].album0
            case 'title':
                return item.speech
                break;
            default:
               break;
        }
        return 
      }
    },
    // 获取图片
    getImage(url) {
      return app.getResourceUrl(url)
    },
    getRandomListItem(item) {
      // 单图文或者单视频下
      const ran = Math.random() * 10
      if ( Number(item.linkType) === 0 || Number(item.linkType) === 2 ) {
          if (!this.showRowItem || ran >= 8 ) {
            this.showRowItem = true
          } else {
            if (!this.showLItem) {
              this.showLItem = true
              this.showRItem = false
            } else {
              this.showLItem = false
              this.showRItem = true
            }
          }
          return true
      } else {
        this.showRowItem = false;
        this.showLItem = false;
        this.showRItem = false;
        return false
      }
    },
    getList() {
      const data = {}
      app.api.customerGather.queryFootPrintList({
        data,
        success: res => {
            if (res.message === 'success') {
               this.listItem = res.footprintAllList
               console.log(this.listItem)
            }
        }
      })
    }
  }
};
</script>
<style lang="less" scoped>
@import '../../less/_colors-vars.less';
@color-font:#464646;
.custom-gathers-list {
  max-height: calc(~'100vh - 140px');
  margin-top: 100px;
}
.putguanzhu {
  font-size: 19px; 
  color: rgb(102, 102, 102);
  transition:  all ease .3s;
}
.flow {
  float: right;
  width: 50px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #333;
  transition:  all ease .3s;
  &.active {
    color:@blue;
    & > .iconfont {
      color:@blue;
    }
  }
}
.head-box {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  overflow: hidden;
  display: inline-block;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 0 0 1px 0px rgba(0,0,0,.1) inset;
  vertical-align: bottom;
  margin-right: 5px;
}
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
  // background-image: url('../../../src/imgs/custom/list-item.png');
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
      // background-image: url('../../../src/imgs/test/yuantiao.jpg');
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