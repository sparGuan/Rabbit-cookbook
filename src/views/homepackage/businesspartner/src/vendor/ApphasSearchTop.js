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
import MoreIcon from '@material-ui/icons/MoreVert';
import TabNavigatorBar from './TabNavigatorBar';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  dense: {
    marginTop: 19,
  },
  textField: {
    marginLeft: theme.spacing.unit,    
    width: '90%',
    transform: 'translateY(-5px)',
    marginTop:0,
    marginBottom:0
  },
  MenuButtom: {
    marginRight:-16
  },
  arrowButtom: {
    marginLeft: -12,
    marginRight: 20,
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
  searchIcon: {
    width: theme.spacing.unit * 6,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
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
  render() {
    const { classes,history, topText } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton className={classes.arrowButtom} color="inherit" aria-label="Open drawer">
                <ArrowBackIcon />
            </IconButton> 
            <div className={classes.search} >
               <TextField
                 id="standard-dense"
                 label="请输入搜索内容..."
                 className={classNames(classes.textField, classes.dense)}
                 margin="dense"
               />
               <div className={classes.searchIcon}>
                 <SearchIcon />
               </div>
              </div>
              <IconButton color="inherit" className={classes.MenuButtom} aria-label="Open drawer">
              <MoreIcon />
              </IconButton>  
          </Toolbar>
          <Grid container spacing={24}>
              <Grid item xs={12}>
                  <TabNavigatorBar history={history}/>
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

export default withStyles(styles)(ApphasSearchTop) ;