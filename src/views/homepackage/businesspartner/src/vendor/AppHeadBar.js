import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
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
@connect( // 功能同 UTIL/createContainer
  ({displayTopSearch}) => ({displayTopSearch}),
  dispatch => bindActionCreators(require('ACTION/displayTopSearch').default,dispatch)
)
class CommonAppTopBar extends React.Component {
  render() {
    const { classes,history, topText ,displayTopSearch} = this.props;
    return (
      <div className={classes.root}>
        {
          (() => {
            if(displayTopSearch === 0) {
              return <ApphasSearchTop />
            } else {
              return <AppReleasePageTop />
            }
          })()
        }
      </div>
    );
  }
}

CommonAppTopBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommonAppTopBar) ;