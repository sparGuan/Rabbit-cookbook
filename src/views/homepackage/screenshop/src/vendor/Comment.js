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
  }
});
// 评论功能
// 一直滚动的评论区
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
            <Typography className={classes.participate}>评论数</Typography>
        </Badge>
        {
          // 图片淡入淡出评论
        }
        <Card className={classes.card}>
            
        </Card>
      </div>  
  );
}
}
 Comment.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Comment);