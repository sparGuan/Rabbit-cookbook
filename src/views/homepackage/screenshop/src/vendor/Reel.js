import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import tileData from './tileData';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
// 只做渲染有渐变的svg图标
const styles = theme => ({
  root: {
    width: '100%',
    height:'200px',
    backgroundColor:'transparent'
  }
  ,
  chip: {
    backgroundColor:'transparent'
  }
});

// 制作卷轴评论区
function Reel(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
        {
          tileData.map(tile => (
            <Chip
              avatar={<Avatar alt="Natacha" src={tile.img} />}
              label="Deletable Chip"
              className={classes.chip}
            />
          ))
        }
    </div>
  );
}

Reel.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(Reel);