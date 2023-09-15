import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material'
import { isEmpty } from 'lodash'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useState } from 'react'
import { getTagsByType } from 'utils'

import { requiredTagTypes, setupSteps, typeLabel } from './constants'
import useStyles from './styles'

const CompanySetupStepper = ({ handleUpdateTags, isTagsUpdated, handleCreateDefaultChannel }) => {
  const { t } = useTranslation('companySetup')
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const [tagsValues, setTagsValues] = useState([])
  const [errors, setErrors] = useState([])
  const isLastStep = activeStep === setupSteps.length - 1

  useEffect(() => {
    const existTags = localStorage.getItem('tags')

    if (existTags) {
      setTagsValues(JSON.parse(existTags))
    }
  }, [])

  const submitCompanySetup = () => {
    const checkRequredTypes = requiredTagTypes.filter((tagType) => isEmpty(getTagsByType(tagsValues, tagType)))

    if (isEmpty(checkRequredTypes)) {
      setErrors([])
      handleCreateDefaultChannel(tagsValues)
      handleUpdateTags(tagsValues)
      localStorage.removeItem('tags')
    } else {
      setErrors(checkRequredTypes)
    }
  }

  const handleNext = () => {
    if (isLastStep) {
      submitCompanySetup()
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleChangeTags = (data) => {
    setTagsValues(data)
  }

  return (
    <>
      <Box p={4} bgcolor="#f5f5f5">
        <Typography variant="h5">{t('Company Description')}</Typography>
        <Typography variant="subtitle2">
          {t(
            'Please tell us about your company below. If a selection is not available, you can type it and press Enter to add it. As a preview participant, we will keep you informed of our progress towards the beta release, and new features as they become available.'
          )}
        </Typography>
      </Box>
      {!isEmpty(errors) && (
        <Box mt={2} mb={3}>
          <Alert severity="error">
            <AlertTitle>Please, add some information in the next section(s)</AlertTitle>
            <ul>
              {errors.map((error) => (
                <li key={error}>{typeLabel[error]}</li>
              ))}
            </ul>
          </Alert>
        </Box>
      )}
      <Stepper activeStep={activeStep} orientation="vertical" nonLinear>
        {setupSteps.map(({ label, component: StepTags, types }) => {
          const isValid = isEmpty(errors.filter((error) => types.includes(error)))

          return (
            <Step key={label}>
              <StepLabel>
                <Typography variant="body1" color={isValid ? 'initial' : 'error'}>
                  {t(`${label}`)}
                </Typography>
              </StepLabel>
              <StepContent>
                <StepTags handleChange={handleChangeTags} tags={tagsValues} />

                <Box display="flex">
                  <Button disabled={activeStep === 0 || isTagsUpdated} onClick={handleBack}>
                    Back
                  </Button>
                  <Box className={classes.wrapper}>
                    <Button variant="contained" color="primary" onClick={handleNext} disabled={isTagsUpdated}>
                      {isLastStep ? t('Finish') : t('Next')}
                    </Button>
                    {isTagsUpdated && <CircularProgress size={24} className={classes.buttonProgress} />}
                  </Box>
                </Box>
              </StepContent>
            </Step>
          )
        })}
      </Stepper>
    </>
  )
}

export default CompanySetupStepper
