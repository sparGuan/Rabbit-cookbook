import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { View } from 'react-native';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import AppStepingInDetail from './AppStepingInDetail'
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
const styles = theme => ({
	AppBarRoot: {
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    boxShadow: 'unset'
  },
  grow: {
    fontSize: 12,
    width: 'calc(100% - 100px)',
    textAlign: 'center'
  },
  card: {
    boxShadow: 'unset'
  },
  media: {
    height: '100vw'
  },
  pageContent: {
    maxHeight: 'calc(100vh - 30px)',
    'overflow-y': 'auto'
  },
  cardCon: {
    overflow: 'unset',
    boxShadow: 'unset'
  },
  padd10: {
    padding:10
  },
  chip: {
    minWidth: 50,
    marginRight: 15,
    marginBottom: 10
  },
  chipContent: {
    padding: '0px 15px',
    boxShadow: 'unset'
  },
  mainMaterial: {
    display: 'inline-block',
    verticalAlign: 'text-bottom'
  }
});
class AppDetailPage extends React.Component {
  state = {
    open: true
  }
  goTop = () => {
    const pageContent = document.querySelector(`.${this.refs.pageContent.props.className}`);
    pageContent.scrollTop = window.innerWidth;
  }
	render() {
    const { classes, history, location} = this.props;
		return (
			<View>
        <AppBar position="fixed" classes={{
          root: classes.AppBarRoot
        }}>
          <Toolbar>
            <IconButton className={classes.arrowButtom} color="inherit" aria-label="Open drawer" onClick={history.goBack}>
                <ArrowBackIcon />
            </IconButton> 
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {location.state.name}
            </Typography>
          </Toolbar>
        </AppBar>
        {/**
          大图
          菜单引言
          来自
          步骤
         */}
         {/** 大图展示 */}
         <View className={classes.pageContent} ref="pageContent">
            <Card className={classes.card} classes={{
                    root: classes.cardCon
                  }}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={location.state.big_image}
                  title="Contemplative Reptile"
                />
                <CardContent className={classes.padd10}>
                  <Typography gutterBottom  component="h2">
                    菜单引言
                  </Typography>
                  <Typography component="p">
                    {location.state.source.introduction || '这是来自其他网站的分享，阅读完毕小手一个Start🌟吧'}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions style={{padding:0}}>
                <Button size="small" color="secondary">
                  <span style={{
                    display:'inline-block',
                    verticalAlign: 'middle'
                  }}>Start</span>
                  <StarBorderIcon style={{
                    marginLeft: 5,
                    fontSize: 18,
                    verticalAlign: 'middle'
                  }}/>
                </Button>
                <Button size="small" color="secondary">
                  <span style={{
                    display:'inline-block',
                    verticalAlign: 'middle'
                  }}>FORK</span>
                  <CallSplitIcon style={{
                    marginLeft: 5,
                    fontSize: 18,
                    verticalAlign: 'middle'
                  }}/>
                </Button>
              </CardActions>
            </Card>
            {/** TODO: 材料环节和附近购买的便利超市 */}
            <Paper className={classes.chipContent}>
              <Grid item xs={12}>
                  烹饪 
              </Grid>
              <Grid item xs={12}>
                <span className={classes.mainMaterial}>主料：</span>
                {location.state.purchase_details && location.state.purchase_details.map((item,index) => (
                      item.type === 0 && <Chip label={item && `${item.name} ${item.num}`} className={classes.chip} key={index}/>
                ))
                }
              </Grid>
            </Paper>
            
            <Paper className={classes.chipContent}>
              <Grid item xs={12}>
                <span className={classes.mainMaterial}>辅料：</span>
                {location.state.purchase_details && location.state.purchase_details.map((item,index) => (
                      item.type === 1 && <Chip label={item && item.name} className={classes.chip} key={index}/>
                ))
                }
              </Grid>
            </Paper>
            {/** 步骤 */}
            <Card classes={{
                    root: classes.cardCon
                  }}>
                <CardContent style={{padding:0}}>
                  <AppStepingInDetail data={location.state} goTop={this.goTop.bind(this)}/>
                </CardContent>
            </Card>
          </View>
			</View>
		);
	}
}
AppDetailPage.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppDetailPage);
