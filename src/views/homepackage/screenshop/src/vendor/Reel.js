import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import tileData from './tileData';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import classNames from 'classnames';
// 只做渲染有渐变的svg图标
const styles = theme => ({
  root: {
    width: 500,
    height:200,
    backgroundColor:'transparent',
    position:'relative',
    '&>ul>li': {
      display:'block',
    }
  }
  ,
  chip: {
    backgroundColor:'transparent',
    fontSize:theme.typography.caption.fontSize
  },
  chipItem: {
    transition: 'all ease .3s'
  }
});

// 制作卷轴评论区
// 制作滚动轴
// 每循环一次赋值随机速度
// 然后从右往左滚动，无论覆盖不解决先
// css:{z-index opacity transform} speed 是否结束
// 每一帧10个
// 当最后一个显示完了，后面10个跟着滚
class Reel extends React.Component {
  constructor(props) {
		super(props);
	}
  initData = [];
  // 随机属性
   randomSpeed()  {
    // 先去get数据
    const speed = Math.floor(Math.random() * 10 + 1)// 获取随机速度
    return speed
  }
  // 随机透明度-->当两个chip越接近，透明度越低
  randomOpacity(pos_top,oldInitData) {
    if (oldInitData && oldInitData.pos_top - pos_top <= 5 ) {
      return  Math.random(1) //1以内的随机值
    } else {
      return  1
    }
  }
  randomInitial() {
    for(let i = 0; i<tileData.length; i++) {
      const pos_right = 0 // 初始默认都是最右角
      const pos_top = Math.floor(Math.random() * 40 + 1) // 随机初始头部位置
      const opacities = this.randomOpacity(pos_top,this.initData[i - 1]) // 增加透明度，防止重叠
      this.initData[i] = {
          opacities, //透明度
          pos_right,
          pos_top
      }
    }
  }
  loopMove() {
    
    // 传一个dom对象进来执行
    const chipItems = document.querySelectorAll('.chip-item')
    setInterval(() => {
      for (let i= 0; i<chipItems.length; i++) {
        // i等价于render里面的index
        let distance_x = this.initData[i].speed + Number((chipItems[i].style.right || '').replace('px','')) // 计算移动距离
        if (distance_x > window.innerWidth * 2) {
          distance_x = -100
          chipItems[i].style.top = Math.floor(Math.random() * 40 + 1)
          if (chipItems[i - 1]) {
             chipItems[i].style.opacity = (Number(chipItems[i].style.top.replace('px','')) - Number(chipItems[i - 1].style.top.replace('px',''))) <= 5 ?  Math.random(1) : 1;
          }
          chipItems[i].style.display = 'none'
        }
        chipItems[i].style.right = `${distance_x}px`
        const timer = setTimeout(() => {
          chipItems[i].style.display = 'block'
          clearTimeout(timer)
        }, 50);
      }
    },100)
  }
  componentDidMount() { 
    this.loopMove()
  }
  render() {
    const { classes } = this.props;
    this.randomInitial() // 初始值
    return (
      <div className={classes.root} >
          <ul>
              {
                tileData.map((tile,index) => {
                  this.initData[index].speed = this.randomSpeed() // 初始化速度
                  return (
                   <li key={tile.img}  className={classNames('chip-item',classes.chipItem)} style={{
                     right:this.initData[index].pos_right,
                     top:this.initData[index].pos_top,
                     position:'absolute',
                     opacity:this.initData[index].opacities, // 第index个透明度,
                   }
                   }>
                      <Chip
                        avatar={<Avatar alt="Natacha" src={tile.img} />}
                        label="Deletable Chip"
                        className={classes.chip}
                      />
                  </li>
                )
                })
              }
          </ul>
      </div>
    );
  }
}

Reel.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(Reel);