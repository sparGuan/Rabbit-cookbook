import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react'
import Slide from './Slide'
import banner1 from './banner1.png'
import banner2 from './banner2.png'
import banner3 from './banner3.png'
// 加入购物车和购买按钮
const styles = theme => ({
 
});
function AppDetilPage(props) {
  const {classes} = props
  return (
    
  );
}
AppDetilPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppDetilPage);



const opts = [{
	link: 'javascript:;',
	src: banner1
},{
	src: banner2
},{
	link: '#',
	src: banner3
}]

class Home extends Component {
	render() {
		return (
			<Slide opts={opts} />
		)
	}
}

export default Home;