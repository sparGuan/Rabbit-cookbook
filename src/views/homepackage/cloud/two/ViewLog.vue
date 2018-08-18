<template>
    <div class="viewlog" ref="viewlog">
        <aside>
          <div class="mui-scroll-wrapper month-wrap">
          <div class="mui-scroll left-wrapper month-timer">
              <ul>
                <li v-for="item in month" :key="item.name" class="month-tab text-center" :class="item.name === myContent ? 'active' : ''" v-touch:tap="selectMonthSilder(item.name)">
                      <p class="num">{{item.name}}</p>
                      <p class="en">{{item.en}}</p>
                </li>
              </ul>
          </div>
          </div>
        </aside><div class="mui-inner-wrap">
        <!-- 主页面标题 -->
        <div class="mui-content mui-scroll-wrapper log-list-container">
          <div class="mui-scroll right-wrapper">
             <transition-group name="list" tag="div">
              <ul v-for="mon in month" :id="'viewLogSlider'+mon.name" :key="mon.name" class="mui-control-content" :class="mon.name === String(myContent) ? 'mui-active' :''" v-show="mon.name === String(myContent)">
                <li class="log-list-item">
                  <div>
                    <span class="mui-badge mui-badge-primary"></span>
                    <p>9:00</p>
                    <p class="item-text">打卡成功</p>
                  </div>
                  <ul class="log-leave-msg">
                    <li>
                      <span class="mui-badge mui-badge-primary"></span>
                      <p>10:30</p>
                      <p>
                        说到小时候最喜欢的电视剧，非《西游记》莫属了，里面很多角色都被观众所喜爱，有我们熟悉的孙悟空、唐僧、猪八戒、沙僧等等，但除了这4位主角，其他的很多配角也都走红了，有观音菩萨、玉兔精、嫦娥仙子等等，但我们今天说的这位，她曾在《西游记》饰演女儿国国王，她的名字叫朱琳
                      </p>
                    </li>
                  </ul>
                  <div>
                    <span class="mui-badge mui-badge-primary"></span>
                    <p>18:00</p>
                    <p class="item-text">打卡成功</p>
                  </div>
                </li>
                <li class="log-list-item">
                  <div>
                    <span class="mui-badge mui-badge-primary"></span>
                    <p>9:00</p>
                    <p class="item-text">打卡成功</p>
                  </div>
                  <ul class="log-leave-msg">
                    <li>
                      <span class="mui-badge mui-badge-primary"></span>
                      <p>10:30</p>
                      <p>
                        说到小时候最喜欢的电视剧，非《西游记》莫属了，里面很多角色都被观众所喜爱，有我们熟悉的孙悟空、唐僧、猪八戒、沙僧等等，但除了这4位主角，其他的很多配角也都走红了，有观音菩萨、玉兔精、嫦娥仙子等等，但我们今天说的这位，她曾在《西游记》饰演女儿国国王，她的名字叫朱琳
                      </p>
                    </li>
                  </ul>
                  <div>
                    <span class="mui-badge mui-badge-primary"></span>
                    <p>18:00</p>
                    <p class="item-text">打卡成功</p>
                  </div>
                </li>
              </ul>
            </transition-group>
          </div>
        </div> 
        <AddBtn :btnContent="btnContent" :btns="btns"></AddBtn> 
      </div>
    </div>
</template>
<script>
const month = Array.from(require('../../../../js/data/month.json'))
import AddBtn from '@/components/AddBtn'
export default {
  components: {AddBtn},
  data() {
    return {
      month: month,
      myContent: '1',
      btnContent:'<div style="width: calc(100% - 20px);height: 100px;margin: 0 auto;10px 0;"><textarea style="height:100%;width:100%;text-indent: 10px;padding-top: 5px;"></textarea></div>',
      btns: ['取消', '确定']
    }
  },
  created() {
    this.$nextTick(() => {
      mui('.month-wrap,.log-list-container').scroll({
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false //是否显示滚动条
      })
    })
  },
  methods: {
    selectMonthSilder(num) {
      return (event, start, end) => {
        this.myContent = num
      }
    }
  }
}
</script>
<style lang="less" scoped>
.viewlog {
  .list-enter-active,
  .list-leave-active {
    transition: all 1s;
  }
  .list-enter,
  .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  & > aside {
    width: 20%;
    height: 100%;
    position: relative;
    border-right: 1px solid #eee;
    display: inline-block;
  }
  .month-timer > ul {
    height: 100%;
  }

  .mui-inner-wrap {
    width: 80%;
    display: inline-block;
  }
  .mui-content.log-list-container {
    background-color: #fff;
  }
  .month-tab {
    line-height: 1.2;
    padding: 20px 0;
    .num {
      font-size: 18px;
      color: #666;
    }
    .en {
      font-size: 12px;
    }
  }
  .month-tab.active {
    transition: all 0.3s ease;
    background-color: #efeff4;
  }
  .right-wrapper {
    .log-list-item {
      padding: 15px;
      border-bottom: 1px solid #eee;
      line-height: 1.5;
      position: relative;
      .log-leave-msg {
        padding-bottom: 10px;
      }
      .log-leave-msg > li {
        padding-top: 10px;
      }
      .item-text {
        color: #333;
      }
      .line-early {
        width: 2px;
        position: absolute;
        height: 15px;
        right: 15px;
        top: 15px;
        background-color: #546;
      }
      .line-late {
        width: 2px;
        position: absolute;
        height: 15px;
        right: 15px;
        bottom: 15px;
        background-color: #546;
      }
    }
  }
  border-top: 1px solid #eee;
  margin-top: 20px;
  height: 100%;
}
</style>