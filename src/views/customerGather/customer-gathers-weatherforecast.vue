<template>
  <div class="left-weather-forecast">
    <div class="forecast-wrapper">

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      weatherData: {}
    };
  },
  mounted() {
    this.cityWeather('佛山')
  },
  methods: {
    /**
     * @param 调用公共天气预报接口数据
     * 一天只调用一次，后台处理
     */
    cityWeather(city) {
      this.weatherData = {};
      app.api.customerGather.getCityWeather({
          data: {
          location: city, // 城市
          output: "json", // 格式
          ak: "bdEv6dBwm0tHGyfELGnc67PMREZullTl" // 百度地图ak
          },
          success: data => {
            console.log(data);
            this.weatherData = data;
          }
      })
      // $.ajax({
      //   type: "POST", //默认是GET
      //   url: "http://api.map.baidu.com/telematics/v3/weather",
      //   dataType: "jsonp",
      //   data: {
      //     location: city, // 城市
      //     output: "json", // 格式
      //     ak: "ohA7QHfg0BBrpiY4kyuIAAsD" // 百度地图ak
      //   },
      //   success: data => {
      //     console.log(data);
      //     this.weatherData = data;
      //   }
      // });
    }
  }
};
</script>
<style lang="less" scoped>
.left-weather-forecast {
  width: 100%;
  height: 100%;
  .forecast-wrapper {
    max-width: 80px;
    height: 100%;
    float: left;
    width: 100%;
  }
}
</style>