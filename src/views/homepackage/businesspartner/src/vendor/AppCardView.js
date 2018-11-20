import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import PhoneForwardedIcon from '@material-ui/icons/PhoneForwarded';
import AppCardViewImageGridList from './AppCardViewImageGridList'
// import Scroll from 'react-bscroll'
// import 'react-bscroll/lib/react-scroll.css'
const styles = theme => ({
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
			boxShadow:
				'1px -1px 8px rgba(0, 0, 0, 0.100), 8px -9px 0 #ffff, 14px -17px 0px #fcfcfc',
			'&:after': {
				content: "''",
				display: 'block',
				width: '100%',
				height: '100%',
				position: 'absolute',
				top: -9,
				zIndex: -1,
				left: 8,
				borderRadius: 10,
				boxShadow: '1px -1px 0px 0px #f5f5f5'
			}
		}
  },
  fabButton:{
    position:'absolute',
    bottom: 20,
    left: 65
  },
  ForButton: {
    position: 'absolute',
    right: 50,
    bottom: 20
  }
});
// 卡片视图类
class AppCardView extends React.Component {
	constructor(props, context) {
		super(props, context);
	}
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
		el.style.transform = `translate3d(${this.doc_width * val}px,${this
			.top_val * 2.2}px,0px)`;
		el.style.transitionDuration = '0.3s';
		// 此处要删除掉了，看看是在哪里删除掉的
		var moveTime = setTimeout(() => {
      // 直接从原数组里面删除掉，重新渲染就好了
      // 重新渲染之后重新归为
      this.props.handleCardMapChange()
      el.style.transform = `translate3d(0px,0px,0px)`;
      el.style.transitionDuration = '0s';
      this.activeEl(el)
      // this.props.cardMap.shift(); // 删除数组元素，重新渲染 ==>去告诉父组件更新数据
			this.run = true;
		}, 300);
	}
	// 触摸开始
	touchCardStart(e) {    
		if (!this.run) {
			return;
		}
		var ev = e || window.event;
		this._x_start = ev.touches[0].pageX;
		this._y_start = ev.touches[0].pageY;
	}
	// 移位
	touchCardMove(e) {    
		if (!this.run) {
			return;
		}
		var ev = e || window.event;
		this._x_move = ev.touches[0].pageX;
		this._y_move = ev.touches[0].pageY;
		var act_el = ev.currentTarget; //需要移动的元素
		this.rmActiveEl(act_el);
		this.top_val = parseFloat(this._y_move) - parseFloat(this._y_start); // 上移动的值
    this.left_val = parseFloat(this._x_move) - parseFloat(this._x_start); // 左移动的值
		act_el.style.transform = `translate3d(${this.left_val}px,${
			this.top_val
		}px,0px)`;
		act_el.style.transitionDuration = '0s';
	}
	touchCardEnd(e) {    
		if (!this.run) {
			return;
		}
		var ev = e || window.event;
		this._x_end = ev.changedTouches[0].pageX;
		this._y_end = ev.changedTouches[0].pageY;
		var act_el = ev.currentTarget;
		if (
			this.left_val > 0 &&
			this.left_val > this.doc_width / 2 - this.doc_width / 4.5
		) {
			// 此处要删除掉了
			this.animateMove(act_el, 1);
		} else if (
			this.left_val < 0 &&
			this.left_val < -this.doc_width / 2 + this.doc_width / 4.5
		) {
			this.animateMove(act_el, -1);
		} else {
			// 此处是回归原位
			this.animateReset(act_el);
			this.activeEl(act_el);
		}
	}
	/*复位动画*/
	animateReset(el) {
		/*CSS3动画方式*/
		el.style.transform = 'translate3d(0px,0px,0px)';
		el.style.transitionDuration = '.3s';
		var resetTime = setTimeout(function() {
			el.style.transitionDuration = '0s';
		}, 1000);
	}
	/* 激活层 */
	activeEl(el) {
		el.classList.add('active');
	}
	rmActiveEl(el) {
		el.classList.remove('active');
	}
	// /*清除位置*/
	clearLocation() {
		this.left_val = 0;
	}
	render() {
    const { cardMap,  handleCardMapChange , classes, history } = this.props;
    // 数据发生变化就可以render了
		return cardMap.map((item, index) => {
      return (
        <Typography
          component="div"
          ref={`ind-${index}`}
          onTouchStart={this.touchCardStart.bind(this)}
          onTouchMove={this.touchCardMove.bind(this)}
          onTouchEnd={this.touchCardEnd.bind(this)}
          className={classNames(
            index === 0 ? 'active' : '',
            classes.cardView
          )}
          key={index}
          style={{
            zIndex: cardMap.length - index,
            transform: 'translate3d(0px, 0px, 0px)',
            transitionDuration: '0s'
          }}
        >
            <AppCardViewImageGridList />
            {
              // 名称
              // 简介
              // 附件
              // 标签
              // 需求：
              // 盈利能力，回报周期，可能存在风险
              // 参与人数
              // 项目计划：时间轴
            }
            <div>
							
            </div>
            <Button variant="fab" color="secondary" aria-label="Add" className={classes.fabButton}>
                <LoyaltyIcon fontSize="large"/>
            </Button>

            <Button variant="fab" color="secondary" aria-label="Add" className={classes.ForButton}>
                <PhoneForwardedIcon fontSize="large"/>
            </Button>

      </Typography>
      )
    });
	}
}
AppCardView.propTypes = {
	classes: PropTypes.object.isRequired
};
export default withStyles(styles)(AppCardView);
