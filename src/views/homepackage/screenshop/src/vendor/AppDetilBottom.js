import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Button from '@material-ui/core/Button';
import NavigationIcon from '@material-ui/icons/Navigation';
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
            <BottomNavigationAction label="订单" icon={<MonetizationOnIcon />} />
          </BottomNavigation>
          <Button variant="extendedFab" size="small" aria-label="Delete" className={classes.button}>
              <NavigationIcon className={classes.extendedIcon} />
                加入购物车
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

BottomAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomAppBar);