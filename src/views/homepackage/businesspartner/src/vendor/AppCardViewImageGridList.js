import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import tileData from './tileData';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',    
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderRadius: 10,
    width: 'calc(100% - 20px)',
    margin: 10
  },
  // gridList: {
  //   width: 500,
  //   height: 450,
  // },
  subheader: {
    width: '100%',
  },
});
function ImageGridList(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <GridList cellHeight={80} className={classes.gridList} cols={3}>
        {tileData.map((tile,index) => (
          index < 5 && 
          <GridListTile key={tile.img} cols={tile.cols || 1}>
            <img src={tile.img} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

ImageGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageGridList);