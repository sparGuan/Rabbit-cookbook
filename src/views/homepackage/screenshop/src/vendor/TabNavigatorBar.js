import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from 'react-swipeable-views';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import AppGridList from './AppGridList';
import menuData from './menuData';
// 样式表
const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 1,
    width: '100%'
  },
  labelContainer:{
    paddingLeft:6,
    paddingRight:6,
  },
});
function TabContainer({ children, dir }) {
  return (
    <ReactCSSTransitionGroup
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={600}
        transitionName={'SlideOut'}
      >
      <Typography component="div" dir={dir} style={{ padding: 5 }}>
          {children}
      </Typography>
    </ReactCSSTransitionGroup>
  );
}
TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};
// todo 将此函数放置redux全局调用

class FullWidthTabs extends React.Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleChangeIndex = index => {
    this.setState({ value: index });
  };
 
  render() {
    const { classes, theme,history } = this.props;
    console.log(this.props)
    return (      
      <div className={classes.root}>
          <Tabs
             value={this.state.value}
             onChange={this.handleChange}
             indicatorColor="secondary"
             textColor="secondary"
             fullWidth
             scrollable
             scrollButtons="auto"
          >
            {
              menuData.map(item => (
                <Tab label={item.name}  key={item.key} classes={{
                  labelContainer:classes.labelContainer
                }}/>
              ))
            }
          </Tabs>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={this.state.value}
            onChangeIndex={this.handleChangeIndex}
          >
            {
              menuData.map(item => (
                // 传入不用的路由，跳转后台获取所取数据
                <TabContainer key={item.key} dir={theme.direction}>      
                  <AppGridList history={history}/>
                </TabContainer>
              ))
            }
          </SwipeableViews>
        </div>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);
