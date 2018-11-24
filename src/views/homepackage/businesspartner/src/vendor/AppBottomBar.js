import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import SmallBottomNavigation from './SmallBottomNavigation';
import { connect } from 'react-redux'
const styles = theme => ({
	appBar: {
		top: 'auto',
		bottom: 0
	},
	toolbar: {
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '0'
	}
});
@connect(
	// 功能同 UTIL/createContainer
	({ displayAnyBottom }) => ({ displayAnyBottom }),
  require('ACTION/displayAnyBottom').default
)
class BottomAppBar extends React.Component {
	render() {
		const { classes, history,displayAnyBottom } = this.props;
		return (
			<React.Fragment>
				<CssBaseline />
        {
            displayAnyBottom.isShow && 
            <AppBar
            position="fixed"
            color="primary"
            className={classes.appBar}
          >
            <Toolbar className={classes.toolbar}>
              {
                // 以后可能有多种appbar所以就抽出来写了
              }
              <SmallBottomNavigation history={history} />
            </Toolbar>
          </AppBar>
        }
			</React.Fragment>
		);
	}
}
BottomAppBar.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BottomAppBar);
