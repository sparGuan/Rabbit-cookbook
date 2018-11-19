import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
// 实现类手风琴折叠卡片
const styles = theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
    justifyContent: 'space-around',
	},
  photo_box: {    
      width:'100vw',
      position: 'relative',
  },
  cardView: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 10,
    textAlign: 'center',
    height: 'calc(100vh - 250px)',
    zIndex: 1,
    '&.active': {
      boxShadow: '-1px 0px 5px rgba(0, 0, 0, 0.100), 8px -9px 0 #ffff, 14px -17px 0px #fcfcfc',
      '&:after': {
        
        content:"''",
        display:'block',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: -9,
        zIndex: -1,
        left: 10,    
        borderRadius: 10,
        boxShadow: '1px -2px 0 #f5f5f5'

      }
    },
    
  }
});
/**
 * 拖拽一个组件，自动再渲染一个组件，拖拽完成后，销毁原来的组件
 */
class AppFoldingCard extends React.Component {
	// 构造
	constructor(props, context) {
		super(props, context);
	}
	/*用户信息数组*/
	imgArr = [
    '/static/images/cards/paella.jpg',
    '/static/images/cards/paella.jpg',
    '/static/images/cards/paella.jpg',
    '/static/images/cards/paella.jpg',
    '/static/images/cards/paella.jpg',
  ];
	/*元素位置*/
	site = {
		_x_start: 0,
		_y_start: 0,
		_x_move: 0,
		_y_move: 0,
		_x_end: 0,
		_y_end: 0,
		top_val: 0,
		left_val: 0
  };
  doc_width = window.innerWidth;
  doc_height = window.innerHeight;
	/*当前下标*/
	index = 0;
	/*是否允许动画*/
	run = true;
	/*是否加载完成*/
	load = false;
  /*移动动画*/
  // 移动的时候出现两个数据
  // 干掉当前这一个，显示下一个
  /**
   * 
   * @param {*} el 
   * @param {*} val 
   * @param {*} arrIndex 原数据下镖
   */
	animateMove(el, val) {
		if (!this.run) {
			return;
		}
		this.run = false;
    /*CSS3动画方式*/
    el.style.cssText = `translate3d(${this.doc_width * val}px,${this.top_val * 2.2}px,0px);transition-duration:0.3s`
		// el.css({
		// 	transform:
		// 		'translate3d(' +
		// 		doc_width * val +
		// 		'px,' +
		// 		this.top_val * 2.2 +
		// 		'px,0px)',
		// 	'transition-duration': '0.3s'
    // });
    // 此处要删除掉了，看看是在哪里删除掉的
		var moveTime = setTimeout( () => {
      // 直接从原数组里面删除掉，重新渲染就好了            
      this.imgArr.shift()// 删除数组元素，重新渲染
			// var ind_el = $('#ind-' + this.index);
			// this.activeEl(ind_el);
      // this.index++;
		//	$('#photo_box>div>div').append(this.imgHtml());
			this.run = true;
		}, 300);
  }
  // 放置卡片
  putCardView (cardMap) {
    // index告诉别人传入的是第几个
    const {classes} = this.props  
    return cardMap.map( (item,index) => 
      <Typography component="div"  ref={`ind-${index}`}
        onTouchStart={this.touchCardStart.bind(this)}
        onTouchMove={this.touchCardMove.bind(this)}
        onTouchEnd={this.touchCardEnd.bind(this)}
        className={classNames(index === 0 ? 'active':'',classes.cardView)}
        key={index}
        style={{
          zIndex: (cardMap.length - index),
          transform: 'translate3d(0px, 0px, 0px)',
          transitionDuration: '0s'
        }}>
            <div >第{index}个</div>
            <div >
              本demo只支持移动端
            </div>
            <div >左右滑动试试</div>
            <div >本demo仅实现滑动效果</div>
            <div >
              数据交互相关代码请各位自行添加
            </div>
            <div >
              如何修改请查看文件源码(未压缩)
            </div>
            <div >
              适用浏览器：360、FireFox、Chrome、Safari、Opera、傲游、搜狗、世界之窗.
              不支持IE8及以下浏览器。
            </div>
            <div >
              来源：
              <a href="http://www.lanrenzhijia.com/" target="_blank">
                懒人
              </a>
            </div>
      </Typography>
    )
  }
	// 触摸开始
	touchCardStart(e) {
		if (!this.load || !this.run) {
			return;
		}
		var ev = e || window.event;
		this._x_start = ev.touches[0].pageX;
		this._y_start = ev.touches[0].pageY;
  }
  // 移位
	touchCardMove(e) {
		if (!this.load || !this.run) {
			return;
		}
		var ev = e || window.event;
		this._x_move = ev.touches[0].pageX;
		this._y_move = ev.touches[0].pageY;
    var act_el = ev.currentTarget; //需要移动的元素
    activeEl(act_el) // 增加active
		this.top_val = parseFloat(this._y_move) - parseFloat(this._y_start); // 上移动的值
		this.left_val = parseFloat(this._x_move) - parseFloat(this._x_start); // 左移动的值
    act_el.style.cssText = `transform: translate3d(${this.left_val}px,${this.top_val}px,0px);transition-duration:0s;`;

		// act_el.css({
		// 	transform:
		// 		'translate3d(' +
		// 		this.left_val +
		// 		'px,' +
		// 		this.top_val +
		// 		'px,0px)',
		// 	'transition-duration': '0s'
		// });
  }
  touchCardEnd(e) {
    if(!this.load || !this.run){
        return;
    }
    var ev = e || window.event;
    this._x_end = ev.changedTouches[0].pageX;
    this._y_end = ev.changedTouches[0].pageY;
    var act_el = ev.currentTarget;;
    if(this.left_val > 0 && this.left_val > this.doc_width / 2 - this.doc_width / 4.5){
        // 此处要删除掉了
        this.animateMove(act_el,1);
    }else if(this.left_val < 0 && this.left_val < (-this.doc_width) / 2 + this.doc_width / 4.5){
        this.animateMove(act_el,-1);
    }else {
        // 此处是回归原位
        this.animateReset(act_el);
    }
  }
	/*复位动画*/
	animateReset(el) {
    /*CSS3动画方式*/
    el.style.cssText = `translate3d(0px,0px,0px);transition-duration:0.3s;`
		var resetTime = setTimeout(function() {
      el.style.transitionDuration = '0s'			
		}, 1000);
	}
	/* 激活层 */
	activeEl(el) {
		el.classList.add('active')
  }
  rmActiveEl (el) {
    el.classList.remove('active')
  }
	// /*清除位置*/
	// clearLocation() {
	// 	this.left_val = 0;
	// }
	// 传入产品ID获取跳转链接
	linkToDetail(productId) {
		// 先去get数据
		// 跳转到详情
		this.props.history.push({
			pathname: '/appDetilPage',
			state: { productId }
		});
	}
	render() {
    const { classes, history } = this.props;
    // 数据发生变化就可以render了
    console.log(11111)
		return (
			<div
      className={classes.root}
			>
        <div className={classes.photo_box}>
          {
              // 每次拖拽删除当前数据
              // 不如简单点实现，循环10个数据，拖一个删掉一个
              this.putCardView(this.imgArr)
            }
        </div>
			</div>
		);
	}
	componentDidMount() {
		this.load = true;
	}
}

AppFoldingCard.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppFoldingCard);
