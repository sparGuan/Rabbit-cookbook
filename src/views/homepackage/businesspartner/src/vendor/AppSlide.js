import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css';
import classNames from 'classnames';
const styles = theme => ({
	root: {},
	carousel: {},
	slide: {
		textAlign: 'center'
    },
    swiperSlide: {
        textAlign: 'center',
        '&>img': {
            borderRadius: 10,
            boxShadow: '0 7px 10px rgba(0,0,0,.6), 0 10px 10px 5px rgba(0,0,0,.4) inset',
            marginBottom: 30,
            transition: 'transform .3s ease',
        },
        '&>img.scale-img-view':{
            transform: 'scale(.8)'
        }
    },

    pagination: {
        height:10
    }
});
// 轮播插件
class Carousel extends React.Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		// 传入背景图数组
		const { classes, images } = this.props;
		return (
        <div className='swiper-container' >
            {
                images.length>0 && 
                <div className="swiper-wrapper" >
                    {images.map((item, index) => (
                        <Typography
                            component="div"
                            key={index}
                            className={classNames('swiper-slide',classes.swiperSlide)}
                        >   
                            <img src={item} />
                        </Typography>
                    ))}
			    </div>
            }
            <div  className={classNames('swiper-pagination',classes.pagination)}></div>
        </div>
		);
	}
	componentDidMount() {  
        const { slideChangeTransitionStart ,slideChangeTransitionEnd, images,spaceBetween, loop, centeredSlides,pagination,effect } = this.props;      
		new Swiper('.swiper-container', {
            //循环
            spaceBetween : spaceBetween || 15,
            loop: loop || true,
            centeredSlides : true, 
            speed:600,           
			//自动播放，注意：直接给autoplay:true的话，在点击之后不能再自动播放了
			autoplay: {
				delay: 3000,
				//户操作swiper之后，是否禁止autoplay。默认为true：停止。
				disableOnInteraction: false
            },
            effect:effect || 'slide',
           // autoplay:false,
            on: {
                slideChangeTransitionStart: function(){                  
                  if(typeof slideChangeTransitionStart === 'function') {
                    slideChangeTransitionStart(this)
                  }
                },
                slideChangeTransitionEnd: function(){
                    if(typeof slideChangeTransitionEnd === 'function') {
                        slideChangeTransitionEnd(this)
                    }
                },
            },            
			pagination: pagination === true ? {
                el: '.swiper-pagination',
                dynamicBullets:true,
                dynamicMainBullets: 2,
				clickable: true // 允许点击跳转
			} : false
		});
	}
}
export default withStyles(styles)(Carousel);
