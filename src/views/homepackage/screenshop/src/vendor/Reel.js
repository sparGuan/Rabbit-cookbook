import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import tileData from './tileData';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
// 只做渲染有渐变的svg图标
const styles = theme => ({
  root: {
    width: 500,
    height:'200px',
    backgroundColor:'transparent',
    '&>ul>li': {
      display:'block',
      float: 'left'
    }
  }
  ,
  chip: {
    backgroundColor:'transparent',
    fontSize:theme.typography.caption.fontSize
  }
});

// 制作卷轴评论区
function Reel(props) {
  const { classes } = props;
  
  return (
    <div className={classes.root} >
        <ul>
            {
              tileData.map(tile => (
                <li>
                  <Chip
                    avatar={<Avatar alt="Natacha" src={tile.img} />}
                    label="Deletable Chip"
                    className={classes.chip}
                  />
                </li>
              ))
            }
        </ul>
    </div>
  );
}

Reel.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(Reel);