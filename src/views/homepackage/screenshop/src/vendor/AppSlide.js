import React from 'react'
import ReactSwipe from 'react-swipe';
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
    root: {

    },
    carousel: {

    },
    slide:{
         textAlign:'center'
    }
  });
// 轮播插件
class Carousel extends React.Component {
    render() {
        
        const { classes } = this.props;         
        return (
            <ReactSwipe className={classes.carousel} swipeOptions={
                {
                    continuous: false,
                    speed:500,
                    auto:1000
                }} >
                <Typography component="div" className={classes.slide}>
                    <img src={'/static/images/cards/paella.jpg'}></img>
                </Typography>
                <Typography component="div" className={classes.slide}>
                    <img src={'/static/images/cards/paella.jpg'}></img>
                </Typography>
                <Typography component="div" className={classes.slide}>
                    <img src={'/static/images/cards/paella.jpg'}></img>
                </Typography>
                <Typography component="div" className={classes.slide}>
                    <img src={'/static/images/cards/paella.jpg'}></img>
                </Typography>
            </ReactSwipe>
        );
    }
}
export default withStyles(styles)(Carousel);
