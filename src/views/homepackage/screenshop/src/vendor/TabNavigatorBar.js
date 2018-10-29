import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { Link, Route, BrowserRouter, Switch } from "react-router-dom";
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
    <Typography component="div" dir={dir} style={{ padding: 5 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const PageShell = (Page, previous) => {
  return props => (
    <div className="page">
      <ReactCSSTransitionGroup
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={600}
        transitionName={props.match.path === "/one" ? "SlideIn" : "SlideOut"}
      >
        {console.log(props)}
        <Page {...props} />
      </ReactCSSTransitionGroup>
    </div>
  );
};

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
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <BrowserRouter>
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
                <Tab label={item.name} component={Link} to={item.class} key={item.key} classes={{
                  labelContainer:classes.labelContainer
                }}/>
              ))
            }
            </Tabs>
          <Switch>
            {
              menuData.map(item => (
                // 传入不用的路由，跳转后台获取所取数据
                <TabContainer key={item.key}>
                  <Route path={`/${item.class}`} component={PageShell(AppGridList)} />
                </TabContainer>
              ))
            }
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);
