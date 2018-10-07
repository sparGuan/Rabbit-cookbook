<template>    
      <div  class="mirror" ref="mirror">
        <div class="path-slider">
          <!-- Slider items -->
           <router-link :to="{name: 'cloud'}"  class="path-slider__item path-slider__item--1" exact>
             <div class="item__circle"></div>
          </router-link>
          <router-link :to="{name: 'games'}"  class="path-slider__item path-slider__item--2" exact >
              <div class="item__circle" ></div>
          </router-link>
          <router-link :to="{name: 'games'}"  class="path-slider__item path-slider__item--3" exact >
              <div class="item__circle"></div>
          </router-link>
          <router-link :to="{name: 'plan'}"  class="path-slider__item path-slider__item--4" exact >
              <div class="item__circle" ></div>
          </router-link> 
          <router-link :to="{name: 'cloud'}"  class="path-slider__item path-slider__item--4" exact >
              <div class="item__circle"></div>
          </router-link>   
        </div>
      </div>    
</template>
<script>
import PathSlider from '@/js/lib/path-slider'
const { getSinPath } = require('@/js/lib/get-sin-path')
const anime = require('@/js/lib/anime.min')
export default {
  components: {  },
  data() {
    return {
      slider: null,
      around: {
        // backgroundImage: 'url(' + require('../../imgs/fm/around.png') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      },
      Points: [],
      TweezerOnSet: { x: 0, y: 0 },
      Name: ''
    }
  },
  mounted() {
    this.$nextTick( () => {
      this.initUI()
    })
    // this.Points = this.$_mirror_putPoints()
    //this.$set(this.Points,this.putPoints())//这样set会变成数据格式
  },
  methods: {
    initUI() {
      let svgNS = 'http://www.w3.org/2000/svg';
      let svgEl = document.createElementNS(svgNS, 'svg');
      const pathEl = document.createElementNS(svgNS, 'path');
      pathEl.setAttribute('d', getSinPath());      
      pathEl.setAttribute('class', 'path-slider__path');
      svgEl.appendChild(pathEl);
      // 将路径写道svg上面去么
      document.body.appendChild(svgEl);
      let items = document.querySelectorAll('.path-slider__item');
      let images = [];
      for (let j = 0; j < items.length; j++) {
          images.push(getComputedStyle(items[j].querySelector('.item__circle')).getPropertyValue('background-image'));
      }
      let imgAnimation;
      let lastIndex;
      const setImage =  (index) => {
          if (imgAnimation) {
              imgAnimation.pause();
              // sliderContainer.style['background-image'] = images[lastIndex];
              // sliderContainerBackground.style['opacity'] = 0;
          }
          lastIndex = index;
          sliderContainerBackground.style['background-image'] = images[index];
          imgAnimation = anime({
              targets: sliderContainerBackground,
              opacity: 1,
              easing: 'linear'
          });
      };      
      let sliderContainer = document.querySelector('.path-slider');
      let sliderContainerBackground = document.createElement('div');
      sliderContainerBackground.setAttribute('class', 'path-slider__background');
      setImage(0);
      sliderContainer.appendChild(sliderContainerBackground);
      let options = {
          anime: anime,
          startLength: 'center',
          paddingSeparation: 100,
          easing: 'easeOutCubic',
          begin:  (params) => {
              if (params.selected) {
                  setImage(params.index);
              }
          }
      };
      this.slider = new PathSlider(pathEl, '.path-slider__item', options);
      window.addEventListener('resize', () => {
        pathEl.setAttribute('d', getSinPath());
        this.slider.updatePositions();
      });
    }
  }
}
</script>
<style lang="less" scoped>
.mirror {
  height: 100%;
    background-image: url('../../imgs/overlay.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: bottom;
    transition: all .5s ease;
  .around {
    background-color: rgba(247, 247, 240, 0.15);
    border-top-left-radius: 1000px;
    border-bottom-left-radius: 1000px;
    background-position: 10px 10px;
    // box-shadow: 0 0 5px #cad2da;
  }

.path-slider {
  position: relative;
  width: 100%;
  height: 100%;
  background-position: center;
}


.path-slider__background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-position: center;
}

svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.path-slider__path {
  stroke-width: 10px;
  stroke: rgba(0, 0, 0, 0.5);
  fill: none;
}

.path-slider__item {
  position: absolute;
  left: -100px;
  top: -100px;
  cursor: pointer;
  z-index: 1;
}

.item__circle {
  display: inline-block;
  width: 160px;
  height: 160px;
  background-position: center;
  border-radius: 100%;
  -webkit-transform: scale(0.5);
      -ms-transform: scale(0.5);
          transform: scale(0.5);
  transition: 0.5s -webkit-transform;
  transition: 0.5s transform;
  transition: 0.5s transform, 0.5s -webkit-transform;
  border: 20px solid rgb(227, 226, 229);
  box-shadow: 0 0 0 50px rgba(255, 255, 255, 0.3);
   background-position: -3px 4px;
    background-size: cover;
    background-repeat: no-repeat;
}
.path-slider__current-item {
  z-index: 2;
}

.path-slider__current-item .item__circle {
  -webkit-transform: scale(1);
      -ms-transform: scale(1);
          transform: scale(1);                  
}

.path-slider__item--1 .item__circle {
  background-image: url('../../imgs/NR/activities.png');
}

.path-slider__item--2 .item__circle {
  background-image: url('../../imgs/NR/agent.png');
}

.path-slider__item--3 .item__circle {
  background-image: url('../../imgs/NR/radio.png');
}

.path-slider__item--4 .item__circle {
  background-image: url('../../imgs/NR/video.png');
      background-size: 100px 100px;
    background-repeat: no-repeat;
    background-position: center;
}

}
/*End*/

/*主要CSS*/


</style>