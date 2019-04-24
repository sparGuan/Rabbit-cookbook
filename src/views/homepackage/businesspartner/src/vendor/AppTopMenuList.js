import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreIcon from '@material-ui/icons/MoreVert';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AppLoginDialog from './AppLoginDialog'
const styles = theme => ({
  MenuButtom: {
    marginRight:-16
  },
});
class AppTopMenuList extends React.Component {
  state = {
    anchorEl: null,
    detals: '登录',
    open: false,
  };
  componentDidMount() {
    window.onload = () => {
      this.state.detals = top.app.globalService.isLogin() ? '登出' : '登录';
    }
  }
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
   this.setState({ anchorEl: null });
  };
  // goLog
  handleLog = () => {
    // 如果已经登录了，就去登出
    if (top.app.globalService.isLogin()) {
      top.mui.confirm('确定登出？', '', ['取消','确定'], e => {
        if (e.index == 1) {
          top.app.globalService.logOut();
          this.state.detals = '登录';
        } else {
          this.state.open = false;
        }
      });
    } else {
      // 去登录
      this.openLoginWindow()
    }
  }
  //弹出登录窗口
  openLoginWindow = () => {
    this.setState({ anchorEl: null });
    this.setState({ open: true });
  }
  // 关闭登录窗口
  handleCloseLoginWindow = () => {
    this.setState({ open: false });
  };

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <IconButton color="inherit" className={classes.MenuButtom} aria-label="Open drawer" 
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}>
            <MoreIcon />
        </IconButton> 
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleLog}>{this.state.detals}</MenuItem>
          <MenuItem onClick={this.handleClose}>编辑菜单</MenuItem>
          <MenuItem onClick={this.handleClose}>Logout</MenuItem>
        </Menu>
        {/*  弹窗登录  */}
        <AppLoginDialog open={this.state.open} handleCloseLoginWindow={this.handleCloseLoginWindow.bind(this)}/>
      </div>
    );
  }
}

export default withStyles(styles)(AppTopMenuList);