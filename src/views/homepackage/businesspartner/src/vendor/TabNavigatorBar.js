import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import AppFoldingCard from './AppFoldingCard';
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
  wrapContainer: {
    
  }
});
function TabContainer({ children }) {
  return (
    <ReactCSSTransitionGroup
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={600}
        transitionName={'SlideOut'}
      >
      <Typography component="div"  style={{ 
        padding: '45px 20px 5px',backgroundColor:'#f5f5f5',height:'100vh' }}>
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
          {
            menuData.map((item,index) => (
              // 传入不用的路由，跳转后台获取所取数据
              this.state.value === index && 
              <TabContainer key={item.key} className={classes.wrapContainer}>      
                <AppFoldingCard history={history}/>
              </TabContainer>
            ))
          }
        </div>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);