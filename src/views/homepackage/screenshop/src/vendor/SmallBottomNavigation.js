import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';
import RenderSvgIcon from './RenderSvgIcon';
import classNames from 'classnames';
const styles = theme => ({
  root: {
    position:'absolute',
    right:0,
    backgroundColor:'transparent'
  },
  selected : {
    color: theme.palette.text.secondary,
  },
  nopadding: {
    paddingLeft:0,
    paddingRight:0
  }
});

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
        classes={{
          root:classes.root
        }}
      >
      <BottomNavigationAction label="附近的" 
        classes={{
          label:classes.selected
        }}
        className={classNames(classes.nopadding)}
        icon={<RenderSvgIcon path="M18 8c0-3.31-2.69-6-6-6S6 4.69 6 8c0 4.5 6 11 6 11s6-6.5 6-11zm-8 0c0-1.1.9-2 2-2s2 .9 2 2-.89 2-2 2c-1.1 0-2-.9-2-2zM5 20v2h14v-2H5z" />} />

        <BottomNavigationAction label="商品上架" 
        classes={{
          label:classes.selected
        }}
        className={classNames(classes.nopadding)}
        icon={<RenderSvgIcon path="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z" />} />
      </BottomNavigation>
    );
  }
}

SmallBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SmallBottomNavigation);