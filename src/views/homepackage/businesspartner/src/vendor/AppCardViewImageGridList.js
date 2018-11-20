import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import tileData from './tileData';
import Grid from '@material-ui/core/Grid';
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',    
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: 'calc(100% - 20px)',
    margin: 10
  },
  demand: {
    fontSize:12,
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
      {
        // 项目名称
      }
      <Grid item xs={12}>
          <span >项目名称：</span><p>睡够城市电商1期269号</p>
      </Grid>
      <Grid item xs={12}>
          <span> 编号：</span><p>52699421</p>
      </Grid>
      <Grid item xs={12}>
      <span>项目需求：</span>
      </Grid>
      <Grid item xs={12} >
        <span className={classes.demand}>1。睡够致力于打造一个中国的雷宇美国costco超市经营理念的线上+线下平台。</span>
        <span className={classes.demand}>2。睡够通过线下社区生鲜为突破口，占据地域消费入口、宣传入口、通过线下社区生</span>
        <span className={classes.demand}>3。鲜店，线下异业联盟，打造线上线下流量新媒介，深耕本地生活服务；线上随着实</span>
      </Grid>
    </div>
  );
}

ImageGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageGridList);