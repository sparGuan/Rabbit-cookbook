import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
  stepperRoot: {
    padding: 15
  },
  outbox: {
    width: 150,
    height: 150,
    position: 'relative',
    overflow: 'hidden',
    '& > img': {
      top: '50%',
      width: '100%',
      position: 'relative',
      transform: 'translateY(-50%)'
    }
  }
});


class AppStepingInDetail extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
    this.props.goTop();
  }

  render() {
    const { classes, data } = this.props;
    const steps = data.practice; // getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical" className={classes.stepperRoot}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{`第${index + 1}步`}</StepLabel>
              <StepContent>
                <Typography>{label}</Typography>
                <div className={classes.outbox}><img src={data.images[index]}/></div>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.button}
                    >
                      返回
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? '结束' : '继续'}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Button onClick={this.handleReset} className={classes.button}>
              回到顶部
            </Button>
          </Paper>
        )}
      </div>
    );
  }
}

AppStepingInDetail.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(AppStepingInDetail);