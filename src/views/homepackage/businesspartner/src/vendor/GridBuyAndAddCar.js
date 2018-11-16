import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import green from '@material-ui/core/colors/green';
// 加入购物车和购买按钮
const styles = theme => ({
  root: {
    width:70,
  },
  button: {
    padding:0,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit * 5,
    color:green[400],
  },
  buy: {
    color:theme.palette.common.white
  }
});
function GridBuyAndAddCar(props) {
  const {classes} = props
  return (
    <React.Fragment>
      <div className={classes.root}>
        <IconButton className={classNames(classes.button, classes.rightIcon)} aria-label="添加到购物车">
          <AddShoppingCartIcon />
        </IconButton>
        <CssBaseline />
        <Button size="small"  className={classNames(classes.button, classes.buy)}>
            立即购买
        </Button>
      </div>
    </React.Fragment>
  );
}
GridBuyAndAddCar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GridBuyAndAddCar);