import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import RenderSvgIcon from './RenderSvgIcon'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',    
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: 'calc(100% - 20px)',
    margin: 10,
    marginBottom: 0
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
  },
  tileName: {
    color: theme.palette.secondary.main,
    verticalAlign: 'middle'
  },
  track: {
    display:'inline-block',
    verticalAlign: 'middle'
  }
});
class ImageGridList extends React.Component {
  state = {
  };
  jumpTo(tile) {
    this.props.history.push( {pathname:'/AppDetailPage', state: tile})
  }
  render() {
    const { classes, tile, history } = this.props;
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
                  <p><span >美食名称：</span><span className={classes.tileName} onClick={this.jumpTo.bind(this, tile)}>{tile.name}</span><RenderSvgIcon path = "M20,18.69L12.7,22.74C12.2,23 11.7,23 11.2,22.74L4,18.69L17.05,5.54L17.4,5.44C17.7,5.44 17.87,5.57 17.9,5.84L20,18.69M9.35,5.74L4.8,13.29L6.7,1.34C6.73,1.07 6.9,0.94 7.2,0.94C7.4,0.94 7.53,1 7.6,1.19L9.75,5.14L9.35,5.74M13.85,7L4.3,16.59L11.55,4.29C11.65,4.09 11.8,4 12,4C12.2,4 12.33,4.09 12.4,4.29L13.85,7Z"/></p>
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
                              <RenderSvgIcon path = "M22,18C22,20.21 20.21,22 18,22H15C12.79,22 11,20.21 11,18V16H17.79L20.55,11.23L22.11,12.13L19.87,16H22V18M9,22H2C2,19 2,16 2.33,12.83C2.6,10.3 3.08,7.66 3.6,5H3V3H4L7,3H8V5H7.4C7.92,7.66 8.4,10.3 8.67,12.83C9,16 9,19 9,22Z"/>
                          </Badge>
                        </IconButton>
                        {
                          // 项目人数
                        }
                        <IconButton aria-label="people" className={classes.timer}>
                          <Badge badgeContent={`时间：${tile.cook_time}`} color="primary" classes={{ badge: classes.badge }}>
                          <RenderSvgIcon path = "M12,20C8.13,20 5,16.87 5,13C5,9.13 8.13,6 12,6C15.87,6 19,9.13 19,13C19,16.87 15.87,20 12,20M12,4C7.03,4 3,8.03 3,13C3,17.97 7.03,22 12,22C16.97,22 21,17.97 21,13C21,8.03 16.97,4 12,4M12.5,8H11V14L15.75,16.85L16.5,15.62L12.5,13.25V8M7.88,3.39L6.6,1.86L2,5.71L3.29,7.24L7.88,3.39M22,5.72L17.4,1.86L16.11,3.39L20.71,7.25L22,5.72Z"/>
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