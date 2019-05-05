import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import ApphasSearchTop from './ApphasSearchTop'
import AppReleasePageTop from './AppReleasePageTop'

const styles = theme => ({

});

/**
 * @param classes 样式表
 * @param history 路由跳转信息
 * @param topText {String} 头部显示信息 
 * @param {*} props 
 */
@connect(
	// 功能同 UTIL/createContainer
	({ displayAnyTop }) => ({ displayAnyTop }),
  require('ACTION/displayAnyTop').default
)
class CommonAppTopBar extends React.Component {
  render() {
    const { classes, history, topText , displayAnyTop} = this.props;
    return (
      <div className={classes.root}>
        {
          displayAnyTop.showType === 0 &&
          displayAnyTop.isShow &&
          <ApphasSearchTop goBack={history.goBack} history={history}/>
        }
        {/* {
           displayAnyTop.showType === 1 &&
           displayAnyTop.isShow &&
          <AppReleasePageTop goBack={history.goBack} history={history}/>
        } */}
      </div>
    );
  }
}

CommonAppTopBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommonAppTopBar);