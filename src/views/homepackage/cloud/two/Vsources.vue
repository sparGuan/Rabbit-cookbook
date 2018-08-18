<template>
    <div  class="Vsources" ref="Vsources">
        <!--筛选栏-->
        <div class="filter-bar">
            <form action="" method="">
              <input  placeholder="搜索关键字，例如：“图库”，“视频”，“音乐”，“书籍”">   <button class="mui-icon mui-icon-search"></button>
            </form>
        </div>
        <!--瀑布流资源-->
        <div class="mui-content mui-scroll-wrapper waterfall-fullscreen" style="top: 50px;">
          <div class="mui-scroll waterfall" style="width:calc(100vw - 8px);">
            <div class="v-sources-item">
              <div class="v-sources-item-box">
                <!--图片-->
                <img src="../../../../imgs/test/yuantiao.jpg"/>
                <!--标题-->
                <p class="text-center item-title">江美旗《完美分手》</p>
                <!--描述-->
                <p class="text-center item-desc">青春系最新唯美新曲</p>
                <!--操作-->
                <p class="icon-area">
                   <!--收藏-->
                  <span class="icon-heart ico"></span><span class="mui-icon mui-icon-download ico"></span>
                  <!--下载-->
                </p>
              </div>
            </div>
            <div class="v-sources-item">
              <div class="v-sources-item-box">
                <!--图片-->
                <img src="../../../../imgs/login-bg.jpg"/>
                <!--标题-->
                <p class="text-center item-title">江美旗《完美分手》</p>
                <!--描述-->
                <p class="text-center item-desc">青春系最新唯美新曲</p>
                <!--操作-->
                <p class="icon-area">
                   <!--收藏-->
                  <span class="icon-heart ico"></span><span class="mui-icon mui-icon-download ico"></span>
                  <!--下载-->
                </p>
              </div>
            </div>
            <div class="v-sources-item">
              <div class="v-sources-item-box">
                <!--图片-->
                <img src="../../../../imgs/login-bg.jpg"/>
                <!--标题-->
                <p class="text-center item-title">江美旗《完美分手》</p>
                <!--描述-->
                <p class="text-center item-desc">青春系最新唯美新曲</p>
                <!--操作-->
                <p class="icon-area">
                   <!--收藏-->
                  <span class="icon-heart ico"></span><span class="mui-icon mui-icon-download ico"></span>
                  <!--下载-->
                </p>
              </div>
            </div>
            <div class="v-sources-item">
              <div class="v-sources-item-box">
                <!--图片-->
                <img src="../../../../imgs/login-bg.jpg"/>
                <!--标题-->
                <p class="text-center item-title">江美旗《完美分手》</p>
                <!--描述-->
                <p class="text-center item-desc">青春系最新唯美新曲</p>
                <!--操作-->
                <p class="icon-area">
                   <!--收藏-->
                  <span class="icon-heart ico"></span><span class="mui-icon mui-icon-download ico"></span>
                  <!--下载-->
                </p>
              </div>
            </div>
          </div>
        </div>
        <AddBtn :btnContent="btnContent" :btns="btns"/>
    </div>
</template>
<script>
import AddBtn from '@/components/AddBtn'
export default {
  components: { AddBtn },
  data() {
    return {
      btnContent:
        '<form id="upload" method="post" action="" enctype="multipart/form-data">'+
        '<div id="drop">'+
          '<a>上传</a>'+
          '<input type="file" name="upl" multiple="">'+
        '</div>'+
			'<ul>'+
			'</ul>'+
		'</form>',
      btns: ['取消', '确定']
    }
  },
  created() {
    this.$nextTick(() => {
      mui('.waterfall-fullscreen').scroll({
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false //是否显示滚动条
      })
    })
  }
}
</script>
<style lang="less" scoped>
.Vsources {
  height: 100%;
  .waterfall {
    -moz-column-count: 2; /* Firefox */
    -webkit-column-count: 2; /* Safari 和 Chrome */
    column-count: 2;
    -moz-column-gap: 1px;
    -webkit-column-gap: 1px;
    column-gap: 1px;
  }
  .item-title {
    color: #fff;
  }
  .item-desc {
    font-size: 12px;
  }
  .icon-area {
    padding: 2px 10px 6px 10px;
  }
  .ico {
    width: 50%;
    display: inline-block;
    text-align: center;
    vertical-align: text-bottom;
  }
  .filter-bar {
    height: auto;
    background-color: #171b1e;
    & > form {
      background: #111;
      width: 100%;
      background: -webkit-linear-gradient(#1b1b1b, #111);
      background: -moz-linear-gradient(#1b1b1b, #111);
      background: -o-linear-gradient(#1b1b1b, #111);
      background: -ms-linear-gradient(#1b1b1b, #111);
      background: linear-gradient(#1b1b1b, #111);
      border: 1px solid #000;
      box-shadow: inset 0 0 0 1px #272727;
      display: inline-block;
      font-size: 0px;
      padding: 5px;
      position: relative;
      z-index: 1;
      & > input {
        background: #222;
        background: -webkit-linear-gradient(#333, #222);
        background: -moz-linear-gradient(#333, #222);
        background: -o-linear-gradient(#333, #222);
        background: -ms-linear-gradient(#333, #222);
        background: linear-gradient(#333, #222);
        border: 1px solid #444;
        border-radius: 5px 0 0 5px;
        box-shadow: 0 2px 0 #000;
        color: #888;
        display: block;
        float: left;
        font-family: 'Cabin', helvetica, arial, sans-serif;
        font-size: 12px;
        height: 36px;
        margin: 0;
        padding: 0 10px;
        text-shadow: 0 -1px 0 #000;
        width: calc(~'100% - 42px');
      }
      & > button {
        background: #222;
        background: -webkit-linear-gradient(#333, #222);
        background: -moz-linear-gradient(#333, #222);
        background: -o-linear-gradient(#333, #222);
        background: -ms-linear-gradient(#333, #222);
        background: linear-gradient(#333, #222);
        -webkit-box-sizing: content-box;
        -moz-box-sizing: content-box;
        -o-box-sizing: content-box;
        -ms-box-sizing: content-box;
        box-sizing: content-box;
        border: 1px solid #444;
        border-left-color: #000;
        border-radius: 0 5px 5px 0;
        box-shadow: 0 2px 0 #000;
        color: #fff;
        display: block;
        float: left;
        height: 34px;
        margin: 0;
        padding: 0;
        position: relative;
        width: 40px;
        text-shadow: 0 -1px 0 #000;
      }
      & > input:focus {
        -webkit-animation: glow 800ms ease-out infinite alternate;
        -moz-animation: glow 800ms ease-out infinite alternate;
        -o-animation: glow 800ms ease-out infinite alternate;
        -ms-animation: glow 800ms ease-out infinite alternate;
        animation: glow 800ms ease-out infinite alternate;
        background: #222922;
        background: -webkit-linear-gradient(#333933, #222922);
        background: -moz-linear-gradient(#333933, #222922);
        background: -o-linear-gradient(#333933, #222922);
        background: -ms-linear-gradient(#333933, #222922);
        background: linear-gradient(#333933, #222922);
        border-color: #393;
        box-shadow: 0 0 5px rgba(0, 255, 0, 0.2),
          inset 0 0 5px rgba(0, 255, 0, 0.1), 0 2px 0 #000;
        color: #efe;
        outline: none;
      }
    }
  }
  .mui-content {
    height: 100%;
    background-color: #171b1e;
    padding: 0 5px 0 5px;
    .v-sources-item {
      padding: 3px;
      -webkit-column-break-inside: avoid;
      break-inside: avoid;
    }
    .v-sources-item-box {
      border: 1px solid #444;
      & > img {
        width: 100%;
      }
    }
  }
}
@-webkit-keyframes glow {
  0% {
    border-color: #393;
    box-shadow: 0 0 5px rgba(0, 255, 0, 0.2), inset 0 0 5px rgba(0, 255, 0, 0.1),
      0 2px 0 #000;
  }
  100% {
    border-color: #6f6;
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.6),
      inset 0 0 10px rgba(0, 255, 0, 0.4), 0 2px 0 #000;
  }
}

@-moz-keyframes glow {
  0% {
    border-color: #393;
    box-shadow: 0 0 5px rgba(0, 255, 0, 0.2), inset 0 0 5px rgba(0, 255, 0, 0.1),
      0 2px 0 #000;
  }
  100% {
    border-color: #6f6;
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.6),
      inset 0 0 10px rgba(0, 255, 0, 0.4), 0 2px 0 #000;
  }
}

@-o-keyframes glow {
  0% {
    border-color: #393;
    box-shadow: 0 0 5px rgba(0, 255, 0, 0.2), inset 0 0 5px rgba(0, 255, 0, 0.1),
      0 2px 0 #000;
  }
  100% {
    border-color: #6f6;
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.6),
      inset 0 0 10px rgba(0, 255, 0, 0.4), 0 2px 0 #000;
  }
}

@-ms-keyframes glow {
  0% {
    border-color: #393;
    box-shadow: 0 0 5px rgba(0, 255, 0, 0.2), inset 0 0 5px rgba(0, 255, 0, 0.1),
      0 2px 0 #000;
  }
  100% {
    border-color: #6f6;
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.6),
      inset 0 0 10px rgba(0, 255, 0, 0.4), 0 2px 0 #000;
  }
}

@keyframes glow {
  0% {
    border-color: #393;
    box-shadow: 0 0 5px rgba(0, 255, 0, 0.2), inset 0 0 5px rgba(0, 255, 0, 0.1),
      0 2px 0 #000;
  }
  100% {
    border-color: #6f6;
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.6),
      inset 0 0 10px rgba(0, 255, 0, 0.4), 0 2px 0 #000;
  }
}
</style>