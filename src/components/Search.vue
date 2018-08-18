<template>
    <div class="head-container">
        <div  class="search layout-1 mui-search" ref="search" :class="className">
            <i class="icon-reddit reddit"> </i>
            <input type="search" class="smart mui-input-clear" :placeholder="placeholder">
        </div>
        <div  class="rightool icon-yelp" ref="rightool" :class="className"></div>
    </div>
</template>
<script>
module.exports = {
  props: ['className'],
  data() {
    return {
      placeholder: '搜一搜所有桌游、房间号...',
      rightToolClass: 'layout-1'
    }
  }
}
</script>
<style lang="less" scoped>
.head-container {
  .search {
    background-color: #f1f1f1;
    border-radius: 5px;
    position: relative;
    .reddit {
      line-height: 30px;
      font-size: 18px;
      height: 100%;
      display: block;
      text-align: center;
      width: 35px;
    }
    .smart {
      color: rgba(102, 102, 102, 0.73);
      margin: 0px;
      border-radius: 0px;
      background-color: #f1f1f1;
      height: 80%;
      padding: 0;
      line-height: 1;
      top: calc(50% - 40px) !important;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      border: 0;
      width: calc(100% - 50px);
      left: 35px !important;
      font-size: 12px;
      position: absolute;
      top: 8px;
      left: 35px;
    }
  }
  .rightool {
    width: 30px;
    height: 30px;
    position: absolute;
    right: 10px;
    top: 0px;
    border-radius: 5px;
    text-align: center;
    line-height: 30px;
    margin: 7px auto;
    font-size: 30px;
    color: #007aff;
  }
}
</style>