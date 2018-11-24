// TODO: 完成项目发布页面
// 只做简单的时间轴列表，告诉用户操作方式，用户到达指定站点进行发布详情的操作
// 因为该发布需要审核流程，需要完善的资料流程，不能只使用app进行
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { View } from 'react-native';
import AppReleasePageTopTabs from './AppReleasePageTopTabs';
const styles = theme => ({
  
});
class AppReleasePage extends React.Component {
   
  render() {
    const { classes } = this.props;
    return (
      <View>
         {
           // 标签内容
         }
          <AppReleasePageTopTabs/>
      </View>
    );
  }
}
AppReleasePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppReleasePage);