import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import BottomNavigation from './SmallBottomNavigation';
const styles = theme => ({
  text: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  paper: {
    paddingBottom: 50,
  },
  shopcararea: {
    border: '1px solid #f5f5f5',
    transform: 'translate3d(15px,-15px,0)',
    backgroundColor: '#f3f3f3',
    boxShadow: '0 0 2px 2px rgba(224, 224, 224, 0.6) inset',
    '&:hover': {
      backgroundColor: '#f3f3f3'
    }
  },
  list: {
    marginBottom: theme.spacing.unit * 2,
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
    padding:'0',
  },
  fabButton: {
    position: 'absolute',
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  GoShopUp: {
    position:'relative',
  },
  sellnum: {
    borderRadius:'50%',
    width:15,
    height:15,
    borderRadius: '50%',
    position: 'absolute',
    right: -5,
    bottom: 0,
    backgroundColor: theme.palette.secondary.main,
    color: '#fff',
    lineHeight: '15px',    
  }
});

function BottomAppBar(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <BottomNavigation />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

BottomAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomAppBar);