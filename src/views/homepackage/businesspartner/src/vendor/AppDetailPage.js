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
    marginTop: 55,
    boxShadow: 'unset'
  },
  media: {
    height: '100vw'
  }
});
class AppDetailPage extends React.Component {
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
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={location.state.big_image}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                菜单引言
              </Typography>
              <Typography component="p">
                {location.state.source.introduction || '这是来自其他网站的分享，阅读完毕小手一个Start🌟吧'}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
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
        {/** 步骤 */}
        <Card className={classes.card}>
              <CardContent>
                <AppStepingInDetail />
              </CardContent>
        </Card>
			</View>
		);
	}
}
AppDetailPage.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppDetailPage);
