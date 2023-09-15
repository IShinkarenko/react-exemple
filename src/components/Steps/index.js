import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import clsx from 'clsx'
import React from 'react'

import useStyles from './styles'

const Steps = ({ orientation = 'horizontal', activeStep, setStep, steps, className }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} className={clsx(classes.stepper, className)} orientation={orientation}>
        {steps.map((label, index) => {
          const stepProps = {}
          const labelProps = {
            onClick: () => {
              setStep && setStep(index)
            },
          }

          return (
            <Step key={label} {...stepProps}>
              <StepLabel className={classes.stepLabel} {...labelProps}>
                {label}
              </StepLabel>
            </Step>
          )
        })}
      </Stepper>
    </div>
  )
}

export default Steps
