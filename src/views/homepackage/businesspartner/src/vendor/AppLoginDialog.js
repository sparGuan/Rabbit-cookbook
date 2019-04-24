import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import RenderSvgIcon from './RenderSvgIcon'; 
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Paper from '@material-ui/core/Paper';
import PropTypes from "prop-types";
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AppRegister from './AppRegister';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
const styles = theme => ( {
    paper: {
      width: '90%'
    },
    titleSet: {
      padding:'5px 10px'
    }, 
    titleSetTxt: {
      verticalAlign: 'middle',
      fontSize: 14
    },
    margin: {
      margin: theme.spacing.unit,
    },
    textField: {
      flexBasis: 200,
    },
    forgetPwd: {
      margin: 0,
      float: 'right'
    },
    loginByElse: {

    },
    oauthAreaWx: {
      backgroundImage:'url(../static/images/third/wechat.png)',
      width: 35,
      height: 35,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      marginLeft: 17,
      display: 'inline-block',
      verticalAlign: 'middle'
    },
    oauthAreaQQ: {
      backgroundImage:'url(../static/images/third/social-qq.png)',
      width: 35,
      height: 35,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      display: 'inline-block',
      verticalAlign: 'middle',
      marginLeft:15
    },
    paperContent: {
      boxShadow: 'unset'
    },
    vanerWrapper: {
      paddingBottom: 0
    },
    loginByElse: {
      height: 35,
      maxWidth: 115,
      display: 'inline-block'
    },
    diaButtom: {
      display: 'block',
      alignItems: 'unset',
      'justify-content':'unset'
    },
    extendedIcon: {
      marginRight: theme.spacing.unit,
    },
    commit: {
      width: '100%',
      height: 35,
      margin: 0,
      marginBottom: 15
    }
}); 
class AppLoginDialog extends React.Component {
  state = {
    checkValidCode: '',
    validCodeTxt: '获取验证码',
    auths: {}, // 授权信息
    authId: {}, // 授权ID
    showModal: false,
    tenancyName: 'default',
    Mobile: '15099883651',
    passWord: '123456',
    focusName: '',
    socketId: '',
    openPages: 1,
    showPassword: false,
    registerData: {
      passWord: '',
      checkValidCode: '',
      validCode: '',
      Mobile: ''
    }
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  plusReady () {
    //第三方登录
    let authBtns = ['qq', 'weixin'] //配置业务支持的第三方登录
    plus.oauth.getServices(
      services => {
        for (let i in services) {
          let service = services[i]
          this.auths[service.id] = service
          if (~authBtns.indexOf(service.id)) {
            this.state.authId[authBtns[i]] = service.id
            //alert(JSON.stringify(this.authId))
          }
        }
      },
      e => {
        oauthArea.style.display = 'none'
        plus.nativeUI.toast('获取登录认证失败：' + e.message)
      }
    )
  };
  // 登录
  sumbit (e) {
    if (!this.state.Mobile) {
      this.state.focusName = 'Mobile'
      top.app.mui.toast('请输入手机号登录')
      return;
    }
    if (!this.state.passWord) {
      this.state.focusName = 'passWord'
      top.app.mui.toast('请输入密码')
      return;
    }
    top.app.mui(e.target).button('loading')
    // 失效时间中间件由后台生产，不做处理
    //登录的时候要做websocket的与服务器的对接
    top.app.api.user.useMobileLogin({
      data: {
        Mobile: this.state.Mobile,
        passWord: this.state.passWord
      },
      success: res => {
        if (res.message === 'success') {
          top.app.vueApp.$socket.emit('isLogin', res.user);
        }
      },
      complete: () => {
        app.mui(e.target).button('reset')
      }
    })
  };
  // 第三方登录，只为微信、QQ服务
  openThirdLogin (authId) {
    if (authId) {
      this.state.tenancyName = authId
      let auth = this.state.auths[authId]
      let waiting = plus.nativeUI.showWaiting()
      auth.login(
        () => {
          waiting.close()
          plus.nativeUI.toast(auth + '登录认证成功')
          auth.getUserInfo(
            () => {
              plus.nativeUI.toast('获取用户信息成功')
              let name = auth.userInfo.nickname || auth.userInfo.name
              // 因为是微信登录所有没有账户，先帮他注册一个账户
              // 如果有账户了就不注册了直接登录
              app.utils.getlocation(position => {
                const longitude = position.coords.longitude; //获取经度
                const latitude = position.coords.latitude;
                app.api.user.useWxOrQQLogin({
                  data: {
                    tenancyName: this.state.tenancyName, // 是QQ还是微信--第三方服务名
                    nickName: name, // 昵称
                    openid: auth.userInfo.openid, // opid
                    headImg: auth.userInfo.headimgurl, // 头像图片
                    location: [Number(longitude), Number(latitude)]
                  },
                  success: res => {
                    if (res.message === 'success') {
                      app.mui.toast('已登录')
                      this.$socket.emit('isLogin', res.user);
                    }
                  },
                  complete: () => {
                    plus.nativeUI.toast(data.message)
                    // app.mui(e.target).button('reset')
                  }
                })
              })
            },
            e => {
              plus.nativeUI.toast('获取用户信息失败：' + e.message)
            }
          )
        },
        e => {
          waiting.close()
          plus.nativeUI.toast('登录认证失败：' + e.message)
        }
      )
    }
  };
  // 获取验证码
  sendValid (Mobile, isRegister, e) {
    let myreg = /^[1][3,4,5,7,8][0-9]{9}$/
    if (Mobile !== '' && myreg.test(Mobile)) {
      // 失效时间中间件由后台生产，不做处理
      app.api.user.msgValid({
        data: {
          Mobile: Mobile,
          register: isRegister // 是注册验证要加上这个参数
        },
        success: data => {
          let reg = /^[0-9]*$/
          if (reg.test(Number(data.message))) {
            this.setState({checkValidCode: data.message, validCodeTxt: 5})
            // this.checkValidCode = data.message
            // this.validCodeTxt = 5
            let timer = setInterval(() => {
              this.state.validCodeTxt--
              if (this.state.validCodeTxt <= 0) {
                clearInterval(timer)
                e.target.removeAttribute('disabled')
                this.state.validCodeTxt = '重新获取'
              }
            }, 1000)
          } else {
            app.mui.toast(data.message)
          }
        },
        complete: () => {
          e.target.setAttribute('disabled', 'disabled')
        }
      })
    } else if (!myreg.test(this.state.Mobile) && this.state.Mobile !== '') {
      app.mui.toast('请输入正确的手机号!')
    } else {
      app.mui.toast('请输入手机号!')
    }
  }
  backoff (cur) {
    this.setState({ openPages: 1, checkValidCode: '', validCodeTxt: '获取验证码' });
  };
  goLogin () {
    this.setState({ openPages: 1 });
  }
  //注册业务
  goRegister () {
    this.setState({ openPages: 2 });
  };
  goForgetPwd () {
    this.setState({ openPages: 3 });
  };
  componentDidMount() {
  };
  render() {
    const { classes } = this.props;
    const { checked } = this.state;
    return (
      <div>
        <Dialog
          open={this.props.open || false}
          TransitionComponent={Transition}
          keepMounted
          maxWidth={'md'}
          classes =  { {
            paper:classes.paper, 
            }}
          onClose={this.props.handleCloseLoginWindow}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title" className={classes.titleSet}>
            < RenderSvgIcon  path = "M2.53 19.65l1.34.56v-9.03l-2.43 5.86c-.41 1.02.08 2.19 1.09 2.61zm19.5-3.7L17.07 3.98c-.31-.75-1.04-1.21-1.81-1.23-.26 0-.53.04-.79.15L7.1 5.95c-.75.31-1.21 1.03-1.23 1.8-.01.27.04.54.15.8l4.96 11.97c.31.76 1.05 1.22 1.83 1.23.26 0 .52-.05.77-.15l7.36-3.05c1.02-.42 1.51-1.59 1.09-2.6zM7.88 8.75c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-2 11c0 1.1.9 2 2 2h1.45l-3.45-8.34v6.34z"/>
            <span className={classes.titleSetTxt}>{'Sign In'}</span>
          </DialogTitle>
          <DialogContent className={classes.vanerWrapper}>
              {/** 显示 ß*/}
              <Zoom in={this.state.openPages === 1 } style={{
                display:this.state.openPages === 1 ? 'block':'none'
              }}>
                  <Paper elevation={4} className={classes.paperContent}>
                    {/** 账号密码出错警告  */}
                    <FormControl className={classes.margin} required error={this.state.focusName === 'Mobile'}>
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
                    <FormControl className={classNames(classes.margin, classes.textField)} error={this.state.focusName === 'passWord'}>
                      <InputLabel htmlFor="adornment-password">中英文8位密码</InputLabel>
                      <Input
                        id="adornment-password"
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        required
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
              {/** 注册  */}
              <AppRegister registerData={this.state.registerData}/>
              {/** 找回  */}
              <Zoom in={this.state.openPages === 3 } style={{
                display:this.state.openPages === 3 ? 'block':'none'
              }}>
                  <Paper elevation={4} className={classes.paperContent}>
                        {/** 手机号 验证码 密码  */}
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
                      <InputLabel htmlFor="adornment-password">重置中英文8位密码</InputLabel>
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
              
              <Button color="secondary" className={classes.forgetPwd} style={{clear:'both'}} onClick={this.goForgetPwd.bind(this)}>
                忘记密码？
              </Button>
              {/** 确认登录 */}
              <Fab variant="extended" color="primary" aria-label="Add" className={classes.commit}>
                确认
              </Fab>

          </DialogContent>
          <DialogActions className={classes.diaButtom}>
            <div className={classes.loginByElse}>
              <p style={{paddingLeft: 19, paddingBottom:15, display:'inline-block','verticalAlign': 'middle', 'marginTop':0, 'marginBottom':0}}>
                {'社交账号登陆'}
              </p>
              <div className={classes.oauthAreaWx} onClick={this.openThirdLogin(this.state.authId.weixin)}>
              </div>
              <div className={classes.oauthAreaQQ} onClick={this.openThirdLogin(this.state.authId.qq)}></div>
            </div>  
            <Button onClick={this.goRegister.bind(this)} color="secondary" >
              注册
            </Button>
            <Button onClick={this.goLogin.bind(this)} color="secondary">
              登录
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
AppLoginDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(AppLoginDialog) ;