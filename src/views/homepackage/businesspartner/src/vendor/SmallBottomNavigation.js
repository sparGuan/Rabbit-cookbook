import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RenderSvgIcon from './RenderSvgIcon';
const styles = theme => ({
  root: {
    width: '100vw'
  },
  selected : {
    color: theme.palette.text.secondary,
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
          root:classes.root,
          
        }}
      >
      <BottomNavigationAction label="发现" icon={<RenderSvgIcon path="M2.53 19.65l1.34.56v-9.03l-2.43 5.86c-.41 1.02.08 2.19 1.09 2.61zm19.5-3.7L17.07 3.98c-.31-.75-1.04-1.21-1.81-1.23-.26 0-.53.04-.79.15L7.1 5.95c-.75.31-1.21 1.03-1.23 1.8-.01.27.04.54.15.8l4.96 11.97c.31.76 1.05 1.22 1.83 1.23.26 0 .52-.05.77-.15l7.36-3.05c1.02-.42 1.51-1.59 1.09-2.6zM7.88 8.75c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-2 11c0 1.1.9 2 2 2h1.45l-3.45-8.34v6.34z" />} classes={
        {
          selected:classes.selected
        }
      }/>
      <BottomNavigationAction label="Favorites" icon={<RenderSvgIcon path="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z" />} classes={
        {
          selected:classes.selected
        }
      }/>
    
      </BottomNavigation>
    );
  }
}

SmallBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SmallBottomNavigation);