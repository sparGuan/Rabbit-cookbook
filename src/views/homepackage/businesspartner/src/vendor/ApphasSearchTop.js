import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import TabNavigatorBar from './TabNavigatorBar';
import Grid from '@material-ui/core/Grid';
import AppTopMenuList from './AppTopMenuList'
import ControlPointDuplicate from '@material-ui/icons/ControlPointDuplicate'

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  textField: {
    marginLeft: theme.spacing.unit,    
    width: '90%',
    marginTop:0,
    marginBottom:0,
    '& #standard-dense': {
      width: 'calc(100% - 30px)'
    }
  },
  MenuButtom: {
    marginRight:-16
  },
  arrowButtom: {
    marginLeft: -12,
    marginRight: 5,
    paddingRight: 0
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  insert: {
    width: 'calc(100% - 30px)'
  },
  searchIcon: {
    width: theme.spacing.unit * 6,
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    top: 0,
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 6,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});
/**
 * @param classes 样式表
 * @param history 路由跳转信息
 * @param topText {String} 头部显示信息 
 * @param {*} props 
 */
class ApphasSearchTop extends React.Component {
  state = {
    showModal: false,
    open: false,
    name: '',
    page: 1,
    data: [],
    value: 0
  };
  // 实现搜索
  searchFoods() {
    // 父组件将子组件的value设置为 -1
    this.handleChange
    if (this.state.name !== '') {
      top.app.api.datavMeishiChina.querySearchDatavMeishichina({
        data: {
          name: this.state.name,
          page: this.state.page
        },
        success: res => {
          if (res.error_code === 0) {
              // 替换数据
              this.setState({ data: res.data})
          }
        }
      })
    }
  }
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  handleChangeIndex = (event, value) => {
    this.setState({ value });
  };
  render() {
    const { classes, goBack, history } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton className={classes.arrowButtom} color="inherit" aria-label="Open drawer" >
                <ControlPointDuplicate fontSize="large" style={{paddingRight: 5}} color="inherit"/>
            </IconButton> 
            <div className={classes.search} >
               <TextField
                 id="standard-dense"
                 label="请输入搜索内容..."
                 className={classNames(classes.textField)}
                 margin="dense"
                 onChange={this.handleChange('name')}
               />
                <IconButton className={classes.searchIcon} aria-label="Search" onClick={this.searchFoods.bind(this)}>
                  <SearchIcon />
                </IconButton>
              </div>
              <AppTopMenuList />
          </Toolbar>

          <Grid container spacing={24}>
              <Grid item xs={12}>
                  <TabNavigatorBar history={history} data={this.state.data} value={this.state.value} handleChangeIndex={this.handleChangeIndex.bind(this)} />
              </Grid>
          </Grid>
        </AppBar>
      </div>
    );
  }
}

ApphasSearchTop.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ApphasSearchTop);