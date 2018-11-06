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
<<<<<<< HEAD
=======
import classNames from 'classnames';
>>>>>>> 91c5169eaf21440dedc051dbb70ad3109a152a64
const styles = theme => ({
  card: {
    width: '100%',
    boxShadow: 'unset',
    height: '100vh'
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
<<<<<<< HEAD
  headUnit:{
=======
  headpanel: {
>>>>>>> 91c5169eaf21440dedc051dbb70ad3109a152a64
    padding:10,
  }
});

class RecipeReviewCard extends React.Component {
<<<<<<< HEAD
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
=======
  state = { expanded: false };
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
>>>>>>> 91c5169eaf21440dedc051dbb70ad3109a152a64
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
<<<<<<< HEAD
          title="Shrimp and Chorizo Paella"          
        />
        {/* <CardMedia
          className={classes.media}
          image="/static/images/cards/paella.jpg"
          title="Contemplative Reptile"
        /> */}
        <AppSlide images={this.images} 
                  slideChangeTransitionStart={this.slideChangeTransitionStart}
                  slideChangeTransitionEnd={this.slideChangeTransitionEnd}
        />
=======
          className={classNames(classes.headpanel)}
          title="Shrimp and Chorizo Paella"
        />
        <AppSlide />
>>>>>>> 91c5169eaf21440dedc051dbb70ad3109a152a64
        <CardContent>
          <Typography component="p">
            This impressive paella is a perfect party dish and a fun meal to cook together with your
            guests. Add 1 cup of frozen peas along with the mussels, if you like.
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
              minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
              heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
              browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
              chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
              salt and pepper, and cook, stirring often until thickened and fragrant, about 10
              minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
              without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat
              to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and
              cook again without stirring, until mussels have opened and rice is just tender, 5 to 7
              minutes more. (Discard any mussels that don’t open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then serve.
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