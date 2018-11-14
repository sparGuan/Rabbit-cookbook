import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
const styles = theme => ({
  text: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  subHeader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

function BottomAppBar(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
            <BottomNavigation
            showLabels
            >
            <BottomNavigationAction label="客服" icon={<HeadsetMicIcon />} />
            <BottomNavigationAction label="Recents" icon={<SearchIcon />} />
            <BottomNavigationAction label="Recents" icon={ <MoreIcon />} />
          </BottomNavigation>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

BottomAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomAppBar);