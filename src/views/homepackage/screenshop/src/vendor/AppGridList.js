import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import tileData from './tileData';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    justifyContent: 'space-around',   
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100vw',
    height: 'calc(100vh - 150px)',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  }
});
 const AppGridList = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <GridList  spacing={5} className={classes.gridList}>
          {tileData.map(tile => (
            <GridListTile key={tile.img} cols={tile.featured ? 2 : 1} rows={tile.featured ? 2 : 1}>
              <img src={tile.img} alt={tile.title} className={classes.test}/>
              <GridListTileBar
                title={tile.title}
                titlePosition="top"
                actionIcon={
                  <IconButton className={classes.icon}>
                    <StarBorderIcon />
                  </IconButton>
                }
                actionPosition="left"
                className={classes.titleBar}
              />
               <GridListTileBar
                  title={tile.title}
                  subtitle={<span>by: {tile.author}</span>}
                  actionIcon={
                    <IconButton className={classes.icon}>
                      <InfoIcon />
                    </IconButton>
                  }
                />
            </GridListTile>
          ))}
        </GridList>
    </div>
  );
}

AppGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppGridList);