import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import QueueIcon from '@material-ui/icons/Queue';
import AppReleasePageTopTabs from './AppReleasePageTopTabs';
import { connect } from 'react-redux'
import mapDispatchToProps from 'UTIL/mapDispatchToProps'
const styles = theme => ({
  root: {
    flexGrow: 1,
    '&>header':{
      boxShadow:'unset'
    },
    '&>header>div': {
      paddingLeft: 0
    }
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10,
  },
  releaseAddition:{
    position: 'absolute',
    right: 0
  }
});

@connect(
	// 功能同 UTIL/createContainer
	({ displayAnyBottom }) => ({ displayAnyBottom }),
  // mapDispatchToProps()
  require('ACTION/displayAnyBottom').default
)
class AppReleasePageTop extends React.Component {
  state = {
    
  }
  // 到达步骤页
  toPageStep() {
    console.log(this.props)
    this.props.displayAnyBottomCreator(false)
    this.props.history.push({ pathname:'/appReleasePageStep',state:{} })
  }
  render() {
    const { classes,goBack } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar variant="dense" >
            <IconButton className={classes.arrowButtom} color="inherit" aria-label="Open drawer" onClick={goBack}>
            <ArrowBackIcon />
            </IconButton>
            <Typography component="div" align="center" color="inherit">
              我的项目
            </Typography>
            <IconButton color="inherit" className={classes.releaseAddition} onClick={this.toPageStep.bind(this)}>
                <QueueIcon />
            </IconButton>
          </Toolbar>
          {/* <AppReleasePageTopTabs /> */}
        </AppBar>
      </div>
    );
  }
}
AppReleasePageTop.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppReleasePageTop);