<template>
    <div  class="leftnav" ref="leftnav">
      <div class="nav-wrap">
        <div class="nav-title">
          <strong class="font">WORK</strong>
        </div>
        <ul class="mui-table-view">
          <li class="mui-table-view-cell" v-for="(item,index) in listDataByWork" :key="index" v-touch:tap="enterRightContent(index)">
             <i class="ico" :class="item.ico"></i>
             <div class="mui-media-body">
                {{item.name}}
             </div>
          </li>          
        </ul>
      </div>
      <div class="nav-wrap">
        <div class="nav-title">
          <strong class="font">SPORTS</strong>
        </div>
        <ul class="mui-table-view">
          <li class="mui-table-view-cell" v-for="(item,index) in listDataBySports" :key="index" v-touch:tap="enterRightContent(index+4)">
             <i class="ico" :class="item.ico"></i>
             <div class="mui-media-body">
                {{item.name}}
             </div>
          </li>          
        </ul>
      </div>
    </div>
</template>
<script>
export default {
  components: {},
  props:['value'],
  data() {
    return {
      selection: '', // 重新发回给父组件的值
      listDataByWork: [
        {
          ico: 'ico-attendance',
          name: '考勤打卡'
        },
        {
          ico: 'ico-word',
          name: '文档模版'
        },
        {
          ico: 'ico-resource',
          name: '视讯资源'
        },
        {
          ico: 'ico-roval',
          name: '流程审批'
        }
      ],
      listDataBySports: [
        {
          ico: 'ico-running',
          name: '热爱跑步'
        },
        {
          ico: 'ico-badminton',
          name: '热爱羽毛球'
        },
        {
          ico: 'ico-basketball',
          name: '热爱篮球'
        },
        {
          ico: 'ico-baseball',
          name: '热爱桌球'
        }
      ]
    }
  },
  watch: {
    value(now, old) {
      this.selection = now
    },
    selection(now, old) {
      this.$emit('input', now)
    }
  },
  // beforecreate() {
  //     this.$nextTick(() => {

  //     })
  // },
  methods: {
    enterRightContent(index) {
      return (event, start, end) => {
        this.selection = index
      }
    }
  }
}
</script>
<style lang="less" scoped>
.leftnav {
  /* font-family: 'Microsoft YaHei', 'Lantinghei SC', 'Open Sans', Arial,
    'Hiragino Sans GB', 'STHeiti', 'WenQuanYi Micro Hei', 'SimSun', sans-serif; */
  font-family: 'Comic Sans MS', cursive, '微软雅黑';
  color: #fff;
  height: 100%;
  .ico {
    width: 25px;
    height: 25px;
    display: inline-block;
    vertical-align: middle;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
  .ico-word {
    background-image: url('../../../../imgs/cloud/word.png');
  }
  .ico-resource {
    background-image: url('../../../../imgs/cloud/resource.png');
  }
  .ico-roval {
    background-image: url('../../../../imgs/cloud/roval.png');
  }
  .ico-attendance {
    background-image: url('../../../../imgs/cloud/attendance.png');
  }
  .ico-running {
    background-image: url('../../../../imgs/cloud/running.png');
  }
  .ico-badminton {
    background-image: url('../../../../imgs/cloud/badminton.png');
  }
  .ico-basketball {
    background-image: url('../../../../imgs/cloud/basketball.png');
  }
  .ico-baseball {
    background-image: url('../../../../imgs/cloud/baseball.png');
  }
  .head-nav {
    text-transform: uppercase;
    font-size: 18px;
    display: block;
  }
  .mui-table-view:before,
  .mui-table-view:after {
    content: unset;
  }
  .mui-table-view-cell:after {
    content: unset;
  }
  .mui-table-view {
    background-color: unset;
  }
  .mui-table-view-cell.mui-active {
    color: #394748;
    z-index: 1;
    top: 0;
    background: #39a5f7;
    box-shadow: 0 0.3rem 0.2rem rgba(0, 0, 0, 0.3);
    -webkit-transition: -webkit-transform 0.5s
      cubic-bezier(0.59, 0.04, 0.3, 1.43);
    transition: -webkit-transform 0.5s cubic-bezier(0.59, 0.04, 0.3, 1.43);
    transition: transform 0.5s cubic-bezier(0.59, 0.04, 0.3, 1.43);
    transition: transform 0.5s cubic-bezier(0.59, 0.04, 0.3, 1.43),
      -webkit-transform 0.5s cubic-bezier(0.59, 0.04, 0.3, 1.43);
  }
  .font {
    display: block;
    font-size: 24px;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-shadow: 0px 0px 1px #fff;
  }
  .mui-media-body {
    font-size: 18px;
    letter-spacing: 2px;
    vertical-align: top;
  }
  .word {
    vertical-align: middle;
  }
  .word,
  .mui-media-body {
    display: inline-block;
  }
}
</style>