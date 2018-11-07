import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AppSlide from './AppSlide';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
const styles = theme => ({
  card: {
    width: '100%',
    boxShadow: 'unset',
    height: '100vh',
    'overflowY': 'auto'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  headUnit:{
    padding:10,
  },
  unsetSpacing: {
    padding:0
  },
  ariaTitle:{
    position: 'absolute',
    right: '45px',
    fontSize: '12px'
  },
  relativeAuto: {
    position:'relative',
  },
  reviewExpand: {
    padding:'0 10px'
  },
  drawBorderBottom: {
    borderBottom: '3px solid rgb(245, 245, 245)'
  },
  showPrice: {
    position: 'absolute',
    right: 45,
  }
});

class RecipeReviewCard extends React.Component {
  state = { 
    expanded: false,
    sliding:1,
   };
  images = [
    '/static/images/cards/paella.jpg',
    '/static/images/cards/paella.jpg',
    '/static/images/cards/paella.jpg',
    '/static/images/cards/paella.jpg',
    '/static/images/cards/paella.jpg',
  ];
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  slideChangeTransitionStart = (swiper) => {
    // 执行收缩    
    Array.from(swiper.slides).forEach(item => {
      item.firstChild.classList.add('scale-img-view')
    }) 
    console.log(swiper.realIndex)         
  };
  slideChangeTransitionEnd = (swiper) => {    
    Array.from(swiper.slides)[swiper.activeIndex ].firstChild.classList.remove('scale-img-view')
  } 
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          className={classes.headUnit}
          avatar={
            <ArrowBackIcon />
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"          
        />
        <AppSlide images={this.images} 
                  slideChangeTransitionStart={this.slideChangeTransitionStart}
                  slideChangeTransitionEnd={this.slideChangeTransitionEnd}
        />
        <CardContent>
          <Typography component="p">
            This impressive paella is a perfect party dish and a fun meal to cook together with your
            guests. Add 1 cup of frozen peas along with the mussels, if you like.
          </Typography>
          {
            // 产品价格
          }
          <p className={classes.showPrice}>￥15</p>
        </CardContent>
        
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
        </CardActions>
        <CardActions className={classnames(classes.actions,classes.unsetSpacing,classes.relativeAuto)} disableActionSpacing>
              <span className={classes.ariaTitle}>参数列表</span>
               <IconButton
                  className={classnames(classes.expand, classes.reviewExpand,{
                    [classes.expandOpen]: this.state.expanded,
                  })}
                  onClick={this.handleExpandClick}
                  aria-expanded={this.state.expanded}
                  aria-label="Show more"
                >
                  <ExpandMoreIcon />
              </IconButton>
        </CardActions>
        {
          // unmountOnExit
          // 添加该参数组件不渲染
        }
        
        <Collapse in={this.state.expanded} timeout="auto"  collapsedHeight="3px" className={classes.drawBorderBottom}>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
              minutes.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(RecipeReviewCard));