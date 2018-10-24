import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {LefButton ,RightButton, MiddleTabs} from './HeadMenu'
 console.log(LeftButton)
const styles = {
  root: {
    flexGrow: 1,
  },
};

 const SimpleAppBar = (props) => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
            {/* <LeftButton />
            <MiddleTabs />
            <RightButton /> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);
