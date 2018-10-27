import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';
import classNames from 'classnames';
const styles = {
  root: {
    width: 500,
  },
  selected : {
    color:'red'
  }
};

class SmallBottomNavigation extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
      >
        {/* <BottomNavigationAction label="Recents" icon={<RestoreIcon />} /> */}
        <BottomNavigationAction label="商品上架" 
        className={classNames(classes.selected)}
        icon={<StoreMallDirectoryIcon />} />
      </BottomNavigation>
    );
  }
}

SmallBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SmallBottomNavigation);