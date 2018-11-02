import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import tileData from './tileData';
import { Link, Route, BrowserRouter, Switch } from "react-router-dom";
// import InfoIcon from '@material-ui/icons/Info';
import GridBuyAndAddCar from './GridBuyAndAddCar'
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
/**
 * 打开对应详情页
 * @param {id} 详情页id
 * 先到后台获取详情页数据，跳转到对应路由
 */
class AppGridList extends React.Component {
  // 构造
  constructor(props) {
    super(props);
  }
  // 传入产品ID获取跳转链接
  linkToDetail(productId)  {
    // 先去get数据
    this.props.history.push({ pathname:'/appDetilPage',state:{productId} });
  }
  render() {
    const { classes } = this.props;
    return (
      <BrowserRouter>
        <div className={classes.root}>
          <GridList  spacing={5} className={classes.gridList}>
              {tileData.map(tile => (
                <GridListTile key={tile.productId} cols={tile.featured ? 2 : 1} rows={tile.featured ? 2 : 1}>
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
                      onClick={this.linkToDetail.bind(this, tile.productId)}
                      actionIcon={
                        <GridBuyAndAddCar />
                      }
                    />
                  
                </GridListTile>
                
              ))}
            </GridList>
          </div>
        </BrowserRouter>
    );
  }
}

AppGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppGridList);