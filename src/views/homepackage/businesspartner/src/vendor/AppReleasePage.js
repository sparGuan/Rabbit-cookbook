// TODO: 完成项目发布页面
// 只做简单的时间轴列表，告诉用户操作方式，用户到达指定站点进行发布详情的操作
// 因为该发布需要审核流程，需要完善的资料流程，不能只使用app进行
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import AppReleasePageTop from './AppReleasePageTop';
import { View } from 'react-native';
const styles = theme => ({
  
});
class AppReleasePage extends React.Component {
   
  render() {
    console.log(111111)
    const { classes } = this.props;
    return (
      <View>
          <AppReleasePageTop />     
      </View>
    );
  }
}
AppReleasePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(AppReleasePage));