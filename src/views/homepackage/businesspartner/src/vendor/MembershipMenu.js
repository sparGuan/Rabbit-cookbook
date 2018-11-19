import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
const WithState = toRenderProps(withState('anchorEl', 'updateAnchorEl', null));
import Chip from '@material-ui/core/Chip';
const styles = theme => ({
  chip: {
    margin: theme.spacing.unit,
    position:'fixed',
    right: 0,
    bottom: 66,
    zIndex:theme.zIndex.drawer,
    boxShadow:theme.shadows[5],
    backgroundColor:theme.palette.background.paper,
    border:'unset',
    color:'#333',
    '&:focus': {
      color:theme.palette.background.paper
    }
  },
})
// 用户查看功能实现
function BottomMenu(props) {
  const { classes } = props;
  return (
    <WithState>
      {({ anchorEl, updateAnchorEl }) => {
        const open = Boolean(anchorEl);
        const handleClose = () => {
          updateAnchorEl(null);
        };
        return (
          <React.Fragment>
            <Chip
                avatar={<Avatar alt="Natacha" src="/static/images/uxceo-128.jpg" />}
                label="会员信息"
                color="primary"
                className={classes.chip}
                variant="outlined"
                clickable={true}
                onClick={event => {
                  updateAnchorEl(event.currentTarget);
                }}
                aria-owns={open ? 'render-props-menu' : null}
                aria-haspopup="true"
            />
            <Menu id="render-props-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </React.Fragment>
        );
      }}
    </WithState>
  );
}
BottomMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(BottomMenu);