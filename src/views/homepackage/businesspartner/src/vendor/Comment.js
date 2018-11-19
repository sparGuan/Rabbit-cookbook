import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import classnames from 'classnames';
import Reel from './Reel';

// 评论
const styles = theme => ({
  root: {
    marginTop: 25,
    width: '100%',
    height: 300,
    textAlign: 'right'
  },
  card: {
    maxWidth: 345,
    height:200,
    margin:'0 auto'

  },
  media: {
    height: 140,
  },
  badgecap:{
    marginRight: 28,
    marginBottom:15
  },
  participate: {
    fontSize:theme.typography.caption.fontSize,
    padding: `0 ${theme.spacing.unit * 2}px`,
  },
  cardExceptSpacing: {
    padding:'0 !important'
  },
  videoHeight: {
    height:205,
    overflow:'hidden',
    '& > video': {
      objectFit: 'cover',
      objectPosition: 'center center'
    }
  }
});
// 评论功能
// 一直滚动的评论区
// 制作一个卷轴， 用来带动所有的评论进行滚动
class Comment extends React.Component {
  // 构造
  constructor(props) {
    super(props);
 }
 render() {    
  const { classes } = this.props;    
  return (
      <div className={classes.root}>
        <Badge className={classes.badgecap} badgeContent={253} color="secondary">
            <Typography className={classes.participate}>总评</Typography>
        </Badge>
        {
          // 视频评论
          // 完成飞出的字幕
        }
        <Card  className={classnames(classes.card,classes.cardSmallSpacing,classes.disableVideoView)}>
                <CardContent className={classes.cardExceptSpacing}>
                    {
                      // 放置卷轴评论
                    }
                    <Reel />
                    <CardMedia
                      component={
                        () => 
                        (<Video autoPlay loop muted
                            controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                            poster="http://sourceposter.jpg"
                            className={classes.videoHeight}
                            onCanPlayThrough={() => {
                                // Do stuff
                            }}>
                            <source 
                            src="https://tbm-auth.alicdn.com/VIIlksjrCptwSqsJDKZ/p4nNuYRovXp4xws8uZP@@hd_hq.mp4?auth_key=1541579090-0-0-8e4b66b2e5575957a526085ab4f7f6c9" type="video/webm" />
                            <track label="English" kind="subtitles" srcLang="cn" src="http://source.vtt" default />
                        </Video>)
                      }
                      className={classes.cover}
                      title="Live from space album cover"
                    />
                </CardContent>
            </Card>
      </div>  
  );
}
}
 Comment.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Comment);