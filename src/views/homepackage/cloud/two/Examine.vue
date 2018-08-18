<template>
    <div  class="examine" ref="examine">
      <!-- 流程栏目 -->
       <div class="technological">
            <label class="cur-tech">当前：<span>调休申请</span></label>
            <Step :now-step="nowStep" :step-list="stepList"></Step>
       </div>
      <!-- 申请审批的项目 -->
      <div class="examine-card">
        <div class="row-item row-item-0">
          <div class="row-item-pic"></div><div class="row-item-desc">
            <label style="margin-right: 20px;">
              工作日加班
              <p class="row-item-care">加班计算加班费</p>
            </label><label>
              节假日加班
              <p class="row-item-care">加班计算调休</p>
            </label>
          </div>
        </div>
        <div class="row-item row-item-1">
          <div class="row-item-pic">
          </div><div class="row-item-desc"><label>调休</label>&nbsp;&nbsp;/&nbsp;&nbsp;<label>事假</label>&nbsp;&nbsp;/&nbsp;&nbsp;<label>年假</label>&nbsp;&nbsp;/&nbsp;&nbsp;<label>产假</label></div>
        </div>
        <ul class="col-group">
          <li class="col-group-item mui-btn" v-for="(item,index) in cardData" :key="index" >
            <div class="fixed-inner">
              <div class="small-ico" :style="'background-image:url(../../../src/imgs/cloud/apply/apply'+index+'.png)'">
              </div><label v-text="item"></label>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
import Step from '@/components/Step.vue'
export default {
  components: { Step },
  data() {
    return {
      nowStep: 2,
      stepList: ['已发起', '审批中', '审批完成'],
      cardData: [
        '报销审核',
        '用车审批',
        '出差申请',
        '采购申请',
        '其他申请',
        '转正/离岗/调岗'
      ]
    }
  },
  created() {},
  methods: {}
}
</script>
<style lang="less" scoped>
.examine {
  height: 100%;
  .technological {
    padding: 15px;
    border-bottom: 3px dotted #333;
    .cur-tech {
      margin-bottom: 10px;
      display: block;
    }
  }
  .examine-card {
    height: calc(~'100% - 133px');
    background-color: #f0f0e8;
    padding: 15px;
    .row-item {
      height: 80px;
      background-color: #fff;
      border-radius: 5px;
      margin-bottom: 15px;
      box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
    }
    .col-group-item {
      width: calc(~'33.3333333333333% - 10px');
      padding-top: calc(~'33.3333333333333% - 10px');
      margin-right: 15px;
      margin-bottom: 15px;
      border-radius: 5px;
      float: left;
      background-color: #fff;
      position: relative;
    }
    .col-group-item:nth-child(3n) {
      margin-right: 0px;
    }
    .row-item-pic {
      width: 90px;
      height: 100%;
      background-size: 55px;
      background-repeat: no-repeat;
      background-position: center;
      display: inline-block;
      vertical-align: middle;
    }
    .row-item-0 {
      .row-item-pic {
        background-image: url(../../../../imgs/cloud/apply/apply0_0.png);
      }
      .row-item-desc {
        display: inline-block;
        vertical-align: middle;
        width: calc(~'100% - 90px');
        & > label {
          display: inline-block;
          max-width: 49%;
        }
      }
    }
    .row-item-1 {
      .row-item-pic {
        background-image: url(../../../../imgs/cloud/apply/apply0_1.png);
      }
      .row-item-desc {
        display: inline-block;
        vertical-align: middle;
        width: calc(~'100% - 90px');
        & > label {
          display: inline-block;
          max-width: 49%;
        }
      }
    }
    .fixed-inner {
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      position: absolute;

      & > label {
        display: block;
        text-align: center;
        padding: 0 5px;
        font-size: 12px;
      }
    }
    .small-ico {
      width: 100%;
      height: 70%;
      background-size: 40px;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
}
</style>