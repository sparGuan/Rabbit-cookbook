import React from 'react'
import ReactSwipe from 'react-swipe';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// 只做渲染有渐变的svg图标
const styles = theme => ({
  icon: {
   
  }
});
class RunSwipeSilder extends React.Component {
    render() {
      const { classes } = this.props;
      return (
          <ReactSwipe className="carousel" swipeOptions={{continuous: false}}>
              <div>PANE 1</div>
              <div>PANE 2</div>
              <div>PANE 3</div>
          </ReactSwipe>
      );
    }
}
RunSwipeSilder.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(RunSwipeSilder);