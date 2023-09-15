import { Box, Step, StepLabel, Stepper, Typography } from '@mui/material'
import clsx from 'clsx'
import { BaseButton, TagTypeIndustrial, TagTypeMarkets, TagTypeObjectives } from 'components'
import { SIGN_IN, SIGN_UP } from 'constant'
import { useAppDispatch } from 'hooks/useAppState'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { memo, useCallback } from 'react'
import routes from 'routes'

import QontoStepIcon from './components/QontoStepIcon'
import useStyles, { QontoConnector } from './styles'

const AssistedResearchForm = ({
  steps,
  activeStep,
  handleBack,
  handleNext,
  tagsValues,
  errors,
  auth = true,
  handleChangeTags,
  className,
}) => {
  const { t } = useTranslation(['unauthenticatedSearch'])
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const isLastStep = activeStep === steps.length - 1

  const handleSignUp = useCallback(() => {
    dispatch({ type: 'SET_AUTH_FORM_TYPE', payload: SIGN_UP })
    router.push(routes.signIn)
  }, [dispatch, router])

  const handleSignIn = useCallback(() => {
    dispatch({ type: 'SET_AUTH_FORM_TYPE', payload: SIGN_IN })
    router.push(routes.signIn)
  }, [dispatch, router])

  const onHandleBack = useCallback(() => {
    handleBack()
  }, [handleBack])
  const onHandleNext = useCallback(() => {
    handleNext()
  }, [handleNext])

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <>
            <Typography className={classes.stepTitle}>
              {t('Which keywords apply within your current sector or a desired growth sector?')}
            </Typography>
            <TagTypeIndustrial
              handleChange={handleChangeTags}
              tags={tagsValues}
              errors={errors}
              freeSoloUUIDHashValue
            />
          </>
        )
      case 1:
        return (
          <>
            <Typography className={classes.stepTitle}>
              {t('Where do you currently do business or would like to do business in the future?')}
            </Typography>
            <TagTypeMarkets handleChange={handleChangeTags} tags={tagsValues} errors={errors} />
          </>
        )
      case 2:
        return (
          <>
            <Typography className={classes.stepTitle}>
              {t('What do you want to achieve with better data, resources, and community?')}
            </Typography>
            <TagTypeObjectives handleChange={handleChangeTags} tags={tagsValues} errors={errors} freeSolo={false} />
          </>
        )
      default:
        return null
    }
  }

  return (
    <Box className={clsx(classes.formInner, className)}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />} className={classes.stepper}>
        {steps.map(({ label }) => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={QontoStepIcon}
              classes={{
                labelContainer: classes.labelContainer,
                active: classes.activeLabel,
                completed: classes.completedLabel,
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {!isLastStep && <Box className={classes.stepFields}>{getStepContent(activeStep)}</Box>}

      {!isLastStep && (
        <Box className={classes.buttons}>
          <BaseButton title={t('Back')} onClick={onHandleBack} disabled={activeStep === 0} variant="outlined" />
          <BaseButton title={t('Next')} onClick={onHandleNext} />
        </Box>
      )}

      {auth && (
        <>
          <Typography variant="caption" className={clsx(classes.captionSignUp, classes.caption)}>
            {t('New to Expandigo?')}
            <span onClick={handleSignUp} aria-hidden="true" className={classes.link}>
              {t('Sign Up now')}
            </span>
          </Typography>
          <Typography variant="caption" className={clsx(classes.captionSignIn, classes.caption)}>
            {t('Already have an account?')}
            <span onClick={handleSignIn} aria-hidden="true" className={classes.link}>
              {t('Sign In')}
            </span>
          </Typography>
        </>
      )}
    </Box>
  )
}

export default memo(AssistedResearchForm)
