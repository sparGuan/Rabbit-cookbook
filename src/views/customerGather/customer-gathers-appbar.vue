<template>
    <header id="header" class="mui-bar mui-bar-nav gathers-app-bar">
          <div class="wall midground"></div>
          <div class="mui-row gathers-app-bar-container">
              <div class="mui-col-xs-4">
                  <!-- TODO: 实现正在播放的音乐 🎵 -->
                  <div class="wrap-icon" @click="$emit('openMusicContro')">
                    <!-- <div class="circle"></div> -->
                    <div class="signature i-listen">
                        <svg style="transform: scale(.5);"  width="38px" height="46px" viewbox="0 0 38 46" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
                            <g  sketch:type="MSLayerGroup" transform="translate(-23.000000, -21.000000)" stroke-width="2" stroke="#FFFFFF">
                                <g >
                                    <path  d="M32.7889925,54.2496095 C32.0407882,53.9527455 31.220712,53.7889482 30.3607794,53.7889482 C26.8478178,53.7889482 24,56.5224851 24,59.8944741 C24,63.2664631 26.8478178,66 30.3607794,66 C33.873741,66 36.4864865,63.266462 36.4864865,59.894473 L36.4864865,28.2173072 C36.4864865,26.7276256 37.6777699,25.305107 39.1384738,25.0416138 L56,22 M56.125123,50.0883192 C55.3223124,49.7487797 54.43417,49.5602048 53.5,49.5602048 C49.9101489,49.5602048 47,52.3449476 47,55.7801024 C47,59.2152572 49.9101489,62 53.5,62 C57.0898511,62 60,59.2152572 60,55.7801024 L60,21"></path>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div class="listen-text">
                        <svg width="141px" height="42px" viewbox="0 0 141 42" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
                                <g id="svg-listen" sketch:type="MSLayerGroup" transform="translate(-113.000000, -22.000000)" fill="#FFFFFF">
                                    <g id="Page-1" sketch:type="MSShapeGroup">
                                        <path id="Listen" d="M253.755,63 L251.885,63 L251.885,47.05 C251.885,43.1266471 251.335005,40.2575091 250.235,38.4425 C249.134994,36.6274909 247.375012,35.72 244.955,35.72 C243.634993,35.72 242.342506,35.958331 241.0775,36.435 C239.812494,36.9116691 238.639172,37.5716625 237.5575,38.415 C236.475828,39.2583376 235.522504,40.2483277 234.6975,41.385 C233.872496,42.5216724 233.276668,43.7683266 232.91,45.125 L232.91,63 L231.04,63 L231.04,34.4 L232.8,34.4 L232.8,41.55 C233.38667,40.4133277 234.129162,39.3775047 235.0275,38.4425 C235.925838,37.5074953 236.924994,36.7100033 238.025,36.05 C239.125005,35.3899967 240.289161,34.8766685 241.5175,34.51 C242.745839,34.1433315 244.00166,33.96 245.285,33.96 C248.291682,33.96 250.454993,35.0324893 251.775,37.1775 C253.095007,39.3225107 253.755,42.5399786 253.755,46.83 L253.755,63 L253.755,63 Z M222.9,47.93 C222.789999,46.1333244 222.405003,44.4833409 221.745,42.98 C221.084997,41.4766592 220.214172,40.1750055 219.1325,39.075 C218.050828,37.9749945 216.81334,37.122503 215.42,36.5175 C214.02666,35.912497 212.523341,35.61 210.91,35.61 C209.296659,35.61 207.79334,35.9216636 206.4,36.545 C205.00666,37.1683365 203.778339,38.0299945 202.715,39.13 C201.651661,40.2300055 200.79917,41.5316592 200.1575,43.035 C199.51583,44.5383409 199.140001,46.1699912 199.03,47.93 L222.9,47.93 L222.9,47.93 Z M211.075,63.55 C209.131657,63.55 207.316675,63.1558373 205.63,62.3675 C203.943325,61.5791627 202.467506,60.4975069 201.2025,59.1225 C199.937494,57.7474931 198.947504,56.1525091 198.2325,54.3375 C197.517496,52.5224909 197.16,50.5883436 197.16,48.535 C197.16,46.5183233 197.50833,44.6300088 198.205,42.87 C198.90167,41.1099912 199.873327,39.5700066 201.12,38.25 C202.366673,36.9299934 203.814992,35.8850039 205.465,35.115 C207.115008,34.3449962 208.911657,33.96 210.855,33.96 C212.798343,33.96 214.613325,34.3449962 216.3,35.115 C217.986675,35.8850039 219.453327,36.93916 220.7,38.2775 C221.946673,39.61584 222.936663,41.1833244 223.67,42.98 C224.403337,44.7766757 224.77,46.6833233 224.77,48.7 C224.77,48.7733337 224.760833,48.9199989 224.7425,49.14 C224.724167,49.3600011 224.715,49.4883332 224.715,49.525 L199.085,49.525 C199.195001,51.2850088 199.59833,52.9258257 200.295,54.4475 C200.99167,55.9691743 201.880828,57.2799945 202.9625,58.38 C204.044172,59.4800055 205.28166,60.3508301 206.675,60.9925 C208.06834,61.6341699 209.553325,61.955 211.13,61.955 C212.193339,61.955 213.229162,61.8175014 214.2375,61.5425 C215.245838,61.2674986 216.189996,60.8733359 217.07,60.36 C217.950004,59.8466641 218.719997,59.2325036 219.38,58.5175 C220.040003,57.8024964 220.571665,57.0233376 220.975,56.18 L222.68,56.62 C222.276665,57.610005 221.680837,58.535829 220.8925,59.3975 C220.104163,60.259171 219.196672,60.992497 218.17,61.5975 C217.143328,62.202503 216.025006,62.6791649 214.815,63.0275 C213.604994,63.3758351 212.35834,63.55 211.075,63.55 L211.075,63.55 L211.075,63.55 Z M194.3,61.68 C194.226666,61.7166669 194.034168,61.8174992 193.7225,61.9825 C193.410832,62.1475008 193.007502,62.3308323 192.5125,62.5325 C192.017498,62.7341677 191.44917,62.9083326 190.8075,63.055 C190.16583,63.2016674 189.460004,63.275 188.69,63.275 C187.99333,63.275 187.32417,63.1650011 186.6825,62.945 C186.04083,62.7249989 185.481669,62.4133354 185.005,62.01 C184.528331,61.6066647 184.143335,61.1116696 183.85,60.525 C183.556665,59.9383304 183.41,59.278337 183.41,58.545 L183.41,36.05 L179.34,36.05 L179.34,34.4 L183.41,34.4 L183.41,24.555 L185.28,24.555 L185.28,34.4 L192.1,34.4 L192.1,36.05 L185.28,36.05 L185.28,58.27 C185.353334,59.3333387 185.756663,60.1399973 186.49,60.69 C187.223337,61.2400028 188.066662,61.515 189.02,61.515 C189.60667,61.515 190.165831,61.450834 190.6975,61.3225 C191.229169,61.194166 191.705831,61.0475008 192.1275,60.8825 C192.549169,60.7174992 192.879165,60.5616674 193.1175,60.415 C193.355835,60.2683326 193.511666,60.1766669 193.585,60.14 L194.3,61.68 L194.3,61.68 Z M164.82,63.55 C162.619989,63.55 160.566676,63.183337 158.66,62.45 C156.753324,61.716663 155.066674,60.5800077 153.6,59.04 L154.645,57.775 C156.185008,59.1683403 157.761659,60.2133299 159.375,60.91 C160.988341,61.6066702 162.78499,61.955 164.765,61.955 C167.44168,61.955 169.604992,61.3866724 171.255,60.25 C172.905008,59.1133277 173.73,57.5183436 173.73,55.465 C173.73,54.5116619 173.519169,53.7141699 173.0975,53.0725 C172.675831,52.4308301 172.061671,51.8808356 171.255,51.4225 C170.448329,50.9641644 169.449173,50.5608351 168.2575,50.2125 C167.065827,49.8641649 165.700008,49.5066685 164.16,49.14 C162.583325,48.7733315 161.217506,48.4158351 160.0625,48.0675 C158.907494,47.7191649 157.945004,47.3066691 157.175,46.83 C156.404996,46.353331 155.836668,45.748337 155.47,45.015 C155.103331,44.281663 154.92,43.3466724 154.92,42.21 C154.92,40.7799929 155.194997,39.5516718 155.745,38.525 C156.295003,37.4983282 157.037495,36.6458367 157.9725,35.9675 C158.907505,35.2891633 159.989161,34.7850017 161.2175,34.455 C162.445839,34.1249984 163.75666,33.96 165.15,33.96 C167.460012,33.96 169.449158,34.3449962 171.1175,35.115 C172.785842,35.8850039 174.004996,36.8566608 174.775,38.03 L173.51,38.965 C172.703329,37.8649945 171.520841,37.0216696 169.9625,36.435 C168.404159,35.8483304 166.745009,35.555 164.985,35.555 C163.848328,35.555 162.785005,35.6741655 161.795,35.9125 C160.804995,36.1508345 159.93417,36.5358307 159.1825,37.0675 C158.43083,37.5991693 157.835002,38.2683293 157.395,39.075 C156.954998,39.8816707 156.735,40.8349945 156.735,41.935 C156.735,42.8150044 156.881665,43.5483304 157.175,44.135 C157.468335,44.7216696 157.93583,45.2074981 158.5775,45.5925 C159.21917,45.9775019 160.025828,46.3074986 160.9975,46.5825 C161.969172,46.8575014 163.15166,47.1599984 164.545,47.49 C166.305009,47.8933354 167.863327,48.2966647 169.22,48.7 C170.576673,49.1033354 171.731662,49.5799973 172.685,50.13 C173.638338,50.6800028 174.362498,51.3583293 174.8575,52.165 C175.352502,52.9716707 175.6,53.9983271 175.6,55.245 C175.6,56.5283398 175.343336,57.6741616 174.83,58.6825 C174.316664,59.6908384 173.592505,60.561663 172.6575,61.295 C171.722495,62.028337 170.58584,62.5874981 169.2475,62.9725 C167.90916,63.3575019 166.433341,63.55 164.82,63.55 L164.82,63.55 L164.82,63.55 Z M145.405,27.47 L145.405,22.85 L147.275,22.85 L147.275,27.47 L145.405,27.47 L145.405,27.47 Z M145.405,63 L145.405,34.4 L147.275,34.4 L147.275,63 L145.405,63 L145.405,63 Z M113.89,63 L113.89,23.95 L115.76,23.95 L115.76,61.24 L139.74,61.24 L139.74,63 L113.89,63 L113.89,63 Z"></path>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>
                  <!-- <div class="music-pic "><i class="iconfont icon-ziyuanldpi" @click="$emit('openMusicContro')"></i></div> -->
              </div>
              <div class="mui-col-xs-4 arrow-area" style="position:relative;" @click="show = !show">
                  <!-- TODO: 实现下拉式的仿QQ看点 -->
                  <div class="">最新<i class="iconfont icon-arrow-down" :class="show ? 'arrow-up' : ''"></i></div>
              </div>
              <customerGathersMenudown v-model="show"/>
              <div class="offer-backdrop" v-show="show" @click="show = false"></div>
              <!-- 弹出的最新菜单 -->
            <!-- end -->
              <div class="mui-col-xs-4">
                <!--  TODO: 实现天气预报式的顶部 -->
                 <weatherForecast />
              </div>
          </div> 
          <!-- 搜索窗口 -->
          <div class="music-palyer">
              <customerGathersPalyer v-if="$store.state.appData.isShowPalyer"/>
          </div> 
		</header>
</template>
<script>
import weatherForecast from './customer-gathers-weatherforecast'
import customerGathersPalyer from './customer-gathers-palyer'
import customerGathersMenudown from './customer-gathers-menudown'
export default {
  components: {  
    weatherForecast,
    customerGathersPalyer,
    customerGathersMenudown
  },
  props: ["value"],
	data() {
	return  {
        show: false
     };
    },
	mounted(){
        // 轮播
        this.$nextTick( () => {
            require('@/js/lib/signature')
        })
	},
	methods: {
        
	}
}
</script>
<style lang="less" scoped>
@import url('../../less/_colors-vars.less');
  .icon-ziyuanldpi {
        width: 50px;
        display: block;
        height: 30px;
        line-height: 30px;
    }
    .offer-backdrop {
        height: 100vh;
        position: absolute;
        z-index: 998;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
        width: 100vw;
    }
    .arrow-area {
    text-align: center;
    line-height: 45px;
    letter-spacing: 2px;
    .icon-arrow-down {
    font-size: 12px;
    display: block;
    position: absolute;
    top: 15px;
    right: 28px;
    transition: all .3s ease;
    transform: scale(0.6) rotate(180deg);
    }
    }
    .gathers-app-bar {
    position: fixed;
    height: auto;
    background: #000;//linear-gradient(to right,#635499,#526d8e,#5b5d8f);
    color:#fff;
    top: 0;
    left: 0;
    border-bottom-left-radius: 25px;
    .midground {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-image: url('../../imgs/custom/midground.png');
      background-size:contain;
      background-position: center;
      -webkit-animation: cc 153s linear infinite;
      -o-animation: cc 153s linear infinite;
      -moz-animation: cc 153s linear infinite;
      animation: cc 153s linear infinite;
    }
    .gathers-app-bar-container {
      height:100%;
    //   &>div {
    //     height:100%;
    //   }
      .music-pic {
        height: 45px;
        line-height: 45px;
      }
    }
    .arrow-up {
        transform: scale(0.6) rotate(0deg);
    }
    .music-palyer {
      width: calc(~'100% + 20px');
      height: 50px;
      border-bottom-left-radius: 25px;
      transform: translateX(-10px);
      background-repeat: no-repeat;
      background-position: 40px;
      background-size: contain;
      border-radius: 25px;
      border-bottom-left-radius: 25px;
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
      overflow: hidden;
    }
    @-webkit-keyframes cc {
    from{
        background-position: 0 0;
        transform: translateY(10px);
    }
    to{
        background-position: 600% 0;
    }
}
@-o-keyframes cc {
    from{
        background-position: 0 0;
        transform: translateY(10px);
    }
    to{
        background-position: 600% 0;
    }
}
@-moz-keyframes cc {
    from{
        background-position: 0 0;
        transform: translateY(10px);
    }
    to{
        background-position: 600% 0;
    }
}
@keyframes cc {
    0%{
        background-position: 0 0;
    }
    100%{
        background-position: 600% 0;
    }
}

@keyframes da {
    0%{
        background-position: 0 0;
    }
    100%{
        background-position: 0 600%;
    }
}
@-webkit-keyframes da {
    0%{
        background-position: 0 0;
    }
    100%{
        background-position: 0 600%;
    }
}
@-moz-keyframes da {
    0%{
        background-position: 0 0;
    }
    100%{
        background-position: 0 600%;
    }
}
@-ms-keyframes da {
    0%{
        background-position: 0 0;
    }
    100%{
        background-position: 0 600%;
    }
}
// 动画标题字
.i-listen {
    position: absolute;
    top: 0;
    left: 0;
}
.listen-text {
    -webkit-animation: show 3s;
    -moz-animation: show 3s;
    -ms-animation: show 3s;
    -o-animation: show 3s;
    animation: show 3s;
    svg {
        transform: scale(.3);
    }
}
@-webkit-keyframes show {
    0%, 50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
@-moz-keyframes show {
    0%, 50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
@-ms-keyframes show {
    0%, 50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
@-o-keyframes show {
    0%, 50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
@keyframes show {
    0%, 50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
}
</style>