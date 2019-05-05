import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import RenderSvgIcon from './RenderSvgIcon'
import AccessTimeIcon from '@material-ui/icons/AccessTime';

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
    width: 50,
    left: 0,
    top: 9
  },
  badgeThousand: {
    top: 10,
    left: -1,
    width: 40,
    padding: 0
  },
  demandTxt: {
    display: 'inline-block',
    width: 'calc(100% - 110px)',
  },
  subheader: {
    width: '100%',
  },
  dec: {
    width: 'calc(100% - 145px)',
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  timer: {
    marginLeft: 18
  },
  muiGrid: {
    maxHeight: 75
  }
});
class ImageGridList extends React.Component {
  state = {
  };
  render() {
    const { classes, tile } = this.props;
    return (
        <div className={classes.root}>
              <GridList cellHeight={80} className={classes.gridList} cols={3}>
                {tile.images && tile.images.map((item,index) => (
                  index <= 5 && 
                  <GridListTile key={index} >
                    <img src={item} />
                  </GridListTile>
                ))}
              </GridList>

              <Grid item xs={12} className={classes.gridOneRow}>
                  <p><span >美食名称：</span><span>{tile.name}</span></p>
              </Grid>
              <Grid item xs={12} className={classes.gridOneRow}>
                  <p><span> 来自：</span><span>{tile.source}</span></p>
              </Grid>
              <Grid item xs={12} className={classes.gridOneRow}>
                  <div style={{
                    display:'block'
                  }}>
                      <span className={classes.demandTxt} className={classes.dec}>详细描述：</span> 
                      <div className={classes.axisIcos}>
                        {
                          // 运营资金
                        }
                        <IconButton aria-label="people">
                          <Badge badgeContent={`口味: ${tile.taste}`} color="primary" classes={{ badge: classes.badgeThousand }}>
                              {/* <AttachMoneyIcon /> */}
                              <RenderSvgIcon path = "M9.17 16.83c1.56 1.56 4.1 1.56 5.66 0 1.56-1.56 1.56-4.1 0-5.66l-5.66 5.66zM18 2.01L6 2c-1.11 0-2 .89-2 2v16c0 1.11.89 2 2 2h12c1.11 0 2-.89 2-2V4c0-1.11-.89-1.99-2-1.99zM10 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM7 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm5 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
                          </Badge>
                        </IconButton>
                        {
                          // 项目人数
                        }
                        <IconButton aria-label="people" className={classes.timer}>
                          <Badge badgeContent={`时间：${tile.cook_time}`} color="primary" classes={{ badge: classes.badge }}>
                              <AccessTimeIcon />
                          </Badge>
                        </IconButton>
                      </div>
                  </div>
              </Grid>
              <Grid item xs={12} className={classes.muiGrid}>
                {
                  tile.practice && tile.practice.map((data, index) => (
                    <span className={classes.demand} key={index}>{data}</span>
                  ))
                }
              </Grid>
          </div>
    );
  }
}

ImageGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ImageGridList);