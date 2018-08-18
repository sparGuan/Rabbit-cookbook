<template>
    <div  class="officegit" ref="officegit">
    	<!-- 所有的office应用 in here-->
      <!-- 传入很多参数获取，遍历所有应用  -->
      <div class="text-box">
                <h1 class="bevel" style="color:#ffb14f;">NOW</h1>
                <h1 class="diff1" style="color:#ff7166;margin-top: 60px;">It's much</h1>
                <h1 class="diff1" style="color:#ff7166;">easier to Work</h1>
      </div>
      <div class="office-item"
           :class="item.className" 
           v-for="item in officeList" 
           :key="item.id"
           v-bind:style="{ 
             'background-image': 'url('+item.imgSrc+item.id+'.ico)' , 
             'background-size' : '50% 50%' ,
             'background-repeat' : 'no-repeat',
             'transform' : item.transform,
             'background-position' : 'center',
             'background-color' : item.bgColor
             }"
      >
      <a  v-link="item.path"  style="width:100%;height:100%;"></a>
      </div>
    </div>
</template>
<script>
const officeMenus = Array.from(require('../../../../js/data/officeMenus.json'))
export default {
  components: {},
  data() {
    return {
      officeList: officeMenus
    }
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.officegit {
  .text-box {
    width: 230px;
    margin: auto;
    margin-top: 75px;
    text-align: center;
    line-height: 2;
    position: relative;
    & > h1 {
      position: relative;
      letter-spacing: 0.07em;
      font-weight: normal;
      margin: 0 auto;
    }
  }
  .text-box:after {
    content: '';
    background-color: rgba(15, 15, 15, 0.3);
    height: 145px;
    width: 100vw;
    position: absolute;
    top: 75px;
    left: 75px;
    transform: rotate(200deg);
    z-index: -1;
  }
  .diff1 {
    filter: url(#diff1);
  }
  .diff1 {
    font-size: 30px;
    display: inline-block;
    font-weight: bold;
    color: #def;
    text-shadow: 0 0 1px currentColor, -1px -1px 1px #000, 0 -1px 1px #000,
      1px -1px 1px #000, 1px 0 1px #000, 1px 1px 1px #000, 0 1px 1px #000,
      -1px 1px 1px #000, -1px 0 1px #000;
    -webkit-filter: url(#diff1);
    filter: url(#diff1);
  }
  .bevel,
  .bevel:after {
    filter: url(#light2);
  }
  .bevel:after {
    content: 'NOW';
    text-shadow: none;
    opacity: 0.3;
    line-height: 3;
  }
  h1:before,
  h1:after {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
  .bevel {
    font-family: cursive;
    font-size: 3em;
    color: rgba(40, 80, 120, 0.9);
    text-shadow: -1px -1px 1px #000, 0 -1px 1px #000, 1px -1px 1px #000,
      1px 0 1px #000, 1px 1px 1px #000, 0 1px 1px #000, -1px 1px 1px #000,
      -1px 0 1px #000, 0 0 4px #000;
  }
  .paint0 {
    width: 80px;
    height: 80px;
  }
  .paint1 {
    width: 100px;
    height: 100px;
  }
  .paint2 {
    width: 80px;
    height: 80px;
  }
  .paint3 {
    width: 100px;
    height: 100px;
  }
  .paint4 {
    width: 120px;
    height: 120px;
  }
  .paint5 {
    width: 80px;
    height: 80px;
  }
  .paint6 {
    width: 100px;
    height: 100px;
  }
  .paint7 {
    width: 100px;
    height: 100px;
  }

  .office-item {
    position: relative;
    border-radius: 50%;
    box-shadow: 0 0 15px #90c0d8;
  }
  /* 第一个三角形 */
  .office-item:before {
    /* 这里的伪元素用单冒号和双冒号都一样 */
    content: '';
    display: block;
    position: absolute;
  }
  .paint0:before {
    bottom: -14px;
    left: 40px;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #7797d5;
    transform: translate(100deg);
    transform: rotate(170deg);
  }
  .paint1:before {
    bottom: -14px;
    left: 40px;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #8fcf92;
    transform: rotate(190deg);
  }
  .paint2:before {
    bottom: -10px;
    left: 20px;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #ff8759;
    transform: rotate(220deg);
  }
  .paint3:before {
    bottom: -10px;
    left: 25px;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #deb7df;
    transform: rotate(225deg);
  }
  .paint4:before {
    bottom: -16px;
    left: 57px;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #ffb955;
    transform: rotate(175deg);
  }
  .paint5:before {
    bottom: -10px;
    left: 45px;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #7e9adc;
    transform: rotate(165deg);
  }
  .paint6:before {
    bottom: -8px;
    left: 55px;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #ffb955;
    transform: rotate(40deg);
  }
  .paint7:before {
    bottom: -10px;
    left: 35px;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #ea8db5;
    transform: rotate(220deg);
  }
}
@media only screen and (min-width: 767px) and (max-width: 991px) {
  .officegit {
    padding: 5% 30%;
  }
}
</style>