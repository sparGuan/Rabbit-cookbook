import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import QueueIcon from '@material-ui/icons/Queue';

const styles = theme => ({
  root: {
    flexGrow: 1,
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
class AppReleasePageTop extends React.Component {
  state = {
    
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar variant="dense">
            <IconButton className={classes.arrowButtom} color="inherit" aria-label="Open drawer">
            <ArrowBackIcon />
            </IconButton>
            <Typography component="div" align="center" color="inherit">
              我的项目
            </Typography>
            <IconButton color="inherit" className={classes.releaseAddition}>
                <QueueIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
AppReleasePageTop.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppReleasePageTop);