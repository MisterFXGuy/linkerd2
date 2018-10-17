import PropTypes from 'prop-types';
import React from 'react';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import { incompleteMeshMessage } from './util/CopyUtils.jsx';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

function getSteps(numResources, resource) {
  return [
    { label: 'Controller successfully installed' },
    { label: `${numResources ? numResources : 'No'} ${resource}s detected` },
    { label: `Connect your first ${resource}`, content: incompleteMeshMessage() }
  ];
}

class CallToAction extends React.Component {
  render() {
    const { resource, numResources } = this.props;
    const steps = getSteps(numResources, resource);
    const activeStep = _.size(steps) - 1; // hardcode the last step as the active step

    return (
      <React.Fragment>
        <Typography>The service mesh was successfully installed!</Typography>
        <Stepper
          activeStep={activeStep}
          orientation="vertical">
          {
            steps.map((step, i) => {
              const props = {};
              props.completed = i < steps.length - 1; // select the last step as the currently active one

              return (
                <Step key={step.label} {...props}>
                  <StepLabel>{step.label}</StepLabel>
                  <StepContent>{step.content}</StepContent>
                </Step>
              );
            })
          }
        </Stepper>
      </React.Fragment>
    );
  }
}

CallToAction.propTypes = {
  numResources: PropTypes.number,
  resource: PropTypes.string.isRequired,
};

CallToAction.defaultProps = {
  numResources: null
};

export default withStyles(styles)(CallToAction);
