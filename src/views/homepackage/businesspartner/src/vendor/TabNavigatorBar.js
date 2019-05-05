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
        padding: '30px 30px 5px 15px',backgroundColor:'#eee',height:'calc(100vh - 85px)' }}>
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
    value: 0,
    meishiType: []
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleChangeIndex = index => {
    this.setState({ value: index });
  };
   // 获取datav数据
   toQueryMeishiTypeData() {
    const data = {};
    top.app.api.datavMeishiChina.queryDatavMeishichinaTypeList({
      data,
      success: res => {  
        if (res.error_code === 0) {
          console.log(42134134213414)
          this.setState({
            meishiType: res.data
          })
        }
      }
    });
  }
  componentDidMount() {
    this.toQueryMeishiTypeData();
  }
  render() {
    const { classes, theme,history } = this.props;
    return (      
      <div className={classes.root}>
          <Tabs
             value={this.state.value}
             onChange={this.handleChange}
             indicatorColor="secondary"
             textColor="secondary"
             variant="fullWidth"
             variant="scrollable"
             scrollButtons="auto"
          >
          {
            console.log(this.state.meishiType)
          }
            {
              this.state.meishiType.map(item => (
                <Tab label={item.name}  key={item._id} classes={{
                  labelContainer:classes.labelContainer
                }}/>
              ))
            }
          </Tabs>
          {
            this.state.meishiType.map((item,index) => (
              // 传入不用的路由，跳转后台获取所取数据
              this.state.value === index && 
              <TabContainer key={index} className={classes.wrapContainer}> 
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
