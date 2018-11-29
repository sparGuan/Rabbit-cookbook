<template>
  <div class="left-weather-forecast">
    <div class="forecast-wrapper">
        <!-- 天气图标 -->
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
      const data = {
        key: "5d98a829bc563fe63d264addfe948a8b",
        city: city,
        extensions: "all"
      }
      app.api.customerGather.getCityWeather({
          data,
          success: data => {
            console.log(data);
            this.weatherData = data;
          }
      })
      
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