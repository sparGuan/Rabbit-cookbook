import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import tileData from './tileData';
import Grid from '@material-ui/core/Grid';
import PeopleIcon from '@material-ui/icons/People';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

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
    display: 'block',
    textAlign: 'left'
  },
  gridOneRow: {
    textAlign:'left',
    '&>p': {
      marginBottom:0
    }
  },
  axisIcos: {
    display: 'inline-block',
  },
  badge: {
    top: 1,
    right: -15,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`,
  },
  badgeThousand: {
    top: 1,
    right: -15
  },
  demandTxt: {
    display: 'inline-block',
    width: 'calc(100% - 110px)',
  },
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
      <Grid item xs={12} className={classes.gridOneRow}>
          <p><span >项目名称：</span><span>睡够城市电商1期269号</span></p>
      </Grid>
      <Grid item xs={12} className={classes.gridOneRow}>
          <p><span> 编号：</span><span>52699421</span></p>
      </Grid>
      <Grid item xs={12} className={classes.gridOneRow}>
          <div style={{
            display:'block'
          }}>
              <span className={classes.demandTxt}>项目需求：</span> 
              <div className={classes.axisIcos}>
                {
                  // 运营资金
                }
                <IconButton aria-label="people">
                  <Badge badgeContent={`4万`} color="primary" classes={{ badge: classes.badgeThousand }}>
                      <AttachMoneyIcon />
                  </Badge>
                </IconButton>
                {
                  // 项目人数
                 }
                <IconButton aria-label="people">
                  <Badge badgeContent={4} color="primary" classes={{ badge: classes.badge }}>
                      <PeopleIcon />
                  </Badge>
                </IconButton>
              </div>
          </div>
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