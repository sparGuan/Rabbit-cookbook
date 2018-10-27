import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Link, Route, BrowserRouter, Switch } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import AppGridList from './AppGridList';
// 样式表
const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 1,
    width: '100%'
  }
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

function ItemOne(theme) {
  return (
      <AppGridList />    
  );
}

function ItemTwo(theme) {
  return (
    <Paper>
      <div>Item two</div>
    </Paper>
  );
}

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
              <Tab label="Item One" component={Link} to="/one" />
              <Tab label="Item Two" component={Link} to="/two" />
              <Tab label="Item Three" component={Link} to="/three"/>
              <Tab label="Item Four" component={Link} to="/four"/>
              <Tab label="Item Five" component={Link} to="/five"/>
              <Tab label="Item Six" component={Link} to="/six"/>
              <Tab label="Item Seven" component={Link} to="/seven"/>
            </Tabs>

          <Switch>
            {value === 0 &&
            <TabContainer>
                <Route path="/one" component={PageShell(ItemOne)} />
            </TabContainer>}

            {value === 1 &&
            <TabContainer>
                <Route path="/two" component={PageShell(ItemTwo)} />
            </TabContainer>}

            {value === 2 &&
            <TabContainer>
                <Route path="/two" component={PageShell(ItemOne)} />
            </TabContainer>}

            {value === 3 &&
            <TabContainer>
                <Route path="/two" component={PageShell(ItemOne)} />
            </TabContainer>}

             {value === 4 &&
            <TabContainer>
                <Route path="/two" component={PageShell(ItemOne)} />
            </TabContainer>}

             {value === 5 &&
            <TabContainer>
                <Route path="/two" component={PageShell(ItemOne)} />
            </TabContainer>}

            {value === 6 &&
            <TabContainer>
                <Route path="/two" component={PageShell(ItemOne)} />
            </TabContainer>}
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
