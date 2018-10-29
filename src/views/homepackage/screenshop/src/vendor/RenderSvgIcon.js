import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import SvgIcon from '@material-ui/core/SvgIcon';
// 只做渲染有渐变的svg图标
const styles = theme => ({
  icon: {
   // margin: theme.spacing.unit * 2,
  },
  // iconHover: {
  //   margin: theme.spacing.unit * 2,
  //   '&:hover': {
  //     color: red[800],
  //   },
  // },
});

function HomeIcon(props) {
  const {path} = props
  return (
    <SvgIcon {...props}>
      <path d={path} />
    </SvgIcon>
  );
}

function SvgIcons(props) {
  const { classes,path,stopColor={color1:blue[400],color2:red[400]},fontSize="default",color="primary" } = props;
  return (
    <HomeIcon
        className={classes.icon}
        color={color}
        fontSize={fontSize}
        path={path}
        component={svgProps => (
          <svg {...svgProps}>
            <defs>
              <linearGradient id="gradient1">
                <stop offset="30%" stopColor={stopColor.color1} />
                <stop offset="70%" stopColor={stopColor.color2} />
              </linearGradient>
            </defs>
            {React.cloneElement(svgProps.children[0], { fill: 'url(#gradient1)' })}
          </svg>
        )}
      />
  );
}

SvgIcons.propTypes = {
  classes: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired
};

export default withStyles(styles)(SvgIcons);