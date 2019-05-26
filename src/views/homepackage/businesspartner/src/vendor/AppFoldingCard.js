import React from 'react';
import PropTypes from 'prop-types';
import AppCardView from './AppCardView';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
// 实现类手风琴折叠卡片
const styles = theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around'
	},
	photo_box: {
		width: '100vw',
		position: 'relative'
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
  // 数据源
  state = {
    	/*用户信息数组*/
    tileData: [
    ],
    page: 1
  }
   // 获取datav数据
   toQueryLileData(page = 1) {
    const type = this.props.type;
    const data = {
      type,
      page
    };
    top.app.api.datavMeishiChina.queryDavavMeishiChinaList({
      data,
      success: res => {  
        if (res.error_code === 0) {
          this.setState({
            tileData: res.data
          })
        }
      }
    });
  }
  componentDidMount() {
    this.toQueryLileData();
  }
  // 更新信息数组
  handleCardMapChange () {
    this.setState(state => ({ cardMap:state.tileData.shift() }));
    if (this.state.tileData.length <= 0) {
      this.setState(state => ({ page: ++state.page }));
      this.toQueryLileData(this.state.page)
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data.length > 0) {
      this.setState({ tileData: nextProps.data})
    }
  }
	render() {
    const { classes, history } = this.props;
		// 数据发生变化就可以render了
		return (      
			<div className={classes.root}>
				<div className = {
          classNames(
          classes.photo_box
        )}>
            {
              // 每次拖拽删除当前数据
              // 不如简单点实现，循环10个数据，拖一个删掉一个
              <AppCardView history={history} cardMap={this.state.tileData} handleCardMapChange ={this.handleCardMapChange.bind(this)}/>
            }
				</div>
			</div>
		);
	}
}

AppFoldingCard.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppFoldingCard);
