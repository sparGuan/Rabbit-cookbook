<template>
    <div data-page="attendance" class="mui-scroll-wrapper ">
      <div class="mui-scroll" ref="datecontent">
      <div class="mui-table-view-cell mui-media">
        <div class="date">
          <h1 style="font-size:36px;">27</h1>
          <p style="color:#fff;">2018/4</p>
        </div>
        <div class="mui-media-body">
            当前状态：<strong>激活</strong>
            <br>
            <p><label>在线时间：</label>0:0:0:53</p>
        </div>
      </div>
      <vue-better-calendar 
      :showDisableDate="false" 
      style="margin:0px 20px 20px 20px;"
      mode="sign"
      >
      </vue-better-calendar>
    </div>
    </div>
</template>
<script>
import VueBetterCalendar from 'vue-better-calendar'
export default {
  components: {VueBetterCalendar},
  created() {
    this.$nextTick(() => {
      this.$refs['datecontent'].childNodes
        .item(2)
        .childNodes.item(0)
        .childNodes.item(0).style.display =
        'none'
        mui('.attendance').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      })
    })
  }
}
</script>
<style lang="less" scoped>
[data-page='attendance'] {
  .mui-media {
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
  }
  .date {
    width: 60px;
    display: inline-block;
    vertical-align: middle;
    background: #94a9fa;
    text-align: center;
    color: #fff;
  }
  .mui-table-view-cell {
    margin: 20px;
  }
  .mui-media-body {
    display: inline-block;
    vertical-align: middle;
    padding: 0 15px;
  }
}
</style>