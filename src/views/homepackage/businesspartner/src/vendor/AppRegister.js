import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';


const styles = theme => ({
  root: {
    
  },
  paperContent: {
    boxShadow: 'unset'
  },
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexBasis: 200,
  },
});

class AppRegister extends React.Component {
  state = {
    showPassword: false,
  };
  toRegister() {
    const { registerData } = this.props
    if (registerData.passWord === '') {
      top.app.mui.toast('请输入密码!');
      return;
    } else if (registerData.Mobile === '') {
      top.app.mui.toast('请输入手机号!');
      return;
    } else if (registerData.validCode === '') {
      top.app.mui.toast('请输入验证码!');
      return;
    }
    // 判断都正确进入
    if (registerData.passWord !== '' && registerData.Mobile !== '' && registerData.validCode !== '') {
      if (registerData.checkValidCode === Number(registerData.validCode)) {
        top.app.api.user.register({
          data: {
            Mobile: registerData.Mobile,
            passWord: registerData.passWord
          },
          success: res => {
            if (res.message === 'success') {
              this.$emit('close', false);
              app.mui.toast('注册成功!');
              top.app.vueApp.$socket.emit('isLogin', res.UserModel);
            }
          },
          complete: () => {
            // 这里进行倒数
          }
        });
      } else {
        top.app.mui.toast('验证码输入不正确!');
      }
    } else {
      return;
    }
  }
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  render() {
    const { classes, openPages } = this.props;
    return (
      <Zoom in={ openPages === 2 } style={{
        display:openPages === 2 ? 'block':'none'
      }}>
          <Paper elevation={4} className={classes.paperContent}>
                {/** 注册  */}
              <FormControl className={classes.margin}>
                  <InputLabel htmlFor="input-with-icon-adornment">请输入手机号</InputLabel>
                  <Input
                    id="input-with-icon-adornment"
                    startAdornment={
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    }
                  />
              </FormControl>

            <FormControl className={classNames(classes.margin, classes.textField)}>
              <InputLabel htmlFor="adornment-password">验证码</InputLabel>
              <Input
                id="adornment-password"
                type={this.state.showPassword ? 'text' : 'password'}
                value={this.state.password}
                onChange={this.handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <FormControl className={classNames(classes.margin, classes.textField)}>
              <InputLabel htmlFor="adornment-password">中英文8位密码</InputLabel>
              <Input
                id="adornment-password"
                type={this.state.showPassword ? 'text' : 'password'}
                value={this.state.password}
                onChange={this.handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Paper>
      </Zoom>
    );
  }
}

AppRegister.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(AppRegister);