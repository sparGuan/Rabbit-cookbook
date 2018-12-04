<template>
  <div class="left-weather-forecast">
    <div class="forecast-wrapper">
        <!-- 温度 -->
      <div class="weather-info">
          <span v-text="(Object.keys(weatherData).length > 0 &&  `${weatherData.forecasts[0].casts[0].daytemp}℃`) || '0 ℃'" style="    font-size: 16px;"></span>
          <br>
          <span v-text="(Object.keys(weatherData).length > 0 &&  weatherData.forecasts[0].casts[0].dayweather) || ''" style="font-size: 12px;display: block;"></span>
          <span style="position: absolute;right: 0px;top: 23px;font-size: 12px;">
            {{ formatWeek() }}
          </span>
      </div>
        <!-- 天气图标 -->
        <customerGathersWeatherIco :whatisWeather="whatisWeather" />
    </div>
  </div>
</template>
<script>
import customerGathersWeatherIco from './customer-gathers-weatherIco'
export default {
  components: {  
    customerGathersWeatherIco
  },
  data() {
    return {
      whatisWeather: 0,
      weatherData: {}
    };
  },
  mounted() {
    this.cityWeather('佛山')
  },
  methods: {
    formatWeek() {
     if (Object.keys(this.weatherData).length > 0) {
       console.log(this.weatherData.forecasts[0].casts[0].week)
        switch(Number(this.weatherData.forecasts[0].casts[0].week))
        {
        case 1:
          return '周一'
        case 2:
          return '周二'
        case 3:
          return '周三'
        case 4:
          return '周四'
        case 5:
          return '周五'
        case 6:
          return '周六'
        case 7:
        console.log(11111)
          return '周日'
        default:
          break;
        }
      }
    },
    showWeatherIco() {
      if (this.weatherData.forecasts[0].casts[0].dayweather === '晴') {
        this.whatisWeather = 0
      } else if (this.weatherData.forecasts[0].casts[0].dayweather === '雨') {
        this.whatisWeather = 1
      } else if (this.weatherData.forecasts[0].casts[0].dayweather === '多云') {
        this.whatisWeather = 2
      } else if (this.weatherData.forecasts[0].casts[0].dayweather === '雪') {
        this.whatisWeather = 3
      } else if (this.weatherData.forecasts[0].casts[0].dayweather === '大雾') {
        this.whatisWeather = 4
      } else if (this.weatherData.forecasts[0].casts[0].dayweather === '台风') {
        this.whatisWeather = 5
      }
    },
    /**
     * @param 调用公共天气预报接口数据
     * 一天只调用一次，后台处理
     */
    cityWeather(city) {
      this.weatherData = {};
      mui.getJSON('https://restapi.amap.com/v3/weather/weatherInfo',{key:'5d98a829bc563fe63d264addfe948a8b',city,extensions:'all'}, data => {
        //获得服务器响应
        this.weatherData = data;
        this.showWeatherIco()
      }
      );
    }
  }
};
</script>
<style lang="less" scoped>
.left-weather-forecast {  
  height: 100%;
  .forecast-wrapper {
    height: 100%;    
    width: 100%;
    text-align: right;
    .weather-info {
      width: auto;
      display: inline-block;
    }
  }
}
</style>