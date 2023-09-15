import { Box } from '@mui/material'
import cx from 'classnames'
import { BaseButton } from 'components'
import { useTranslation } from 'next-i18next'
import * as React from 'react'

import useStyles from './styles'

const NavigationButtons = ({
  activeStep,
  handlerNext,
  disabled,
  skip,
  lastStep,
  className,
  isSubmit = true,
  withoutSave = false,
  skipHandler,
  fullBtnWidth,
}) => {
  const classes = useStyles()
  const { t } = useTranslation('common')

  const handleBack = () => handlerNext(activeStep - 1)

  const handleSkip = () => {
    skipHandler && skipHandler()
    handlerNext(activeStep + 1)
  }

  const handleNext = () => !lastStep && handlerNext(activeStep + 1)

  return (
    <Box className={cx(classes.navContainer, className)}>
      <Box className={cx(classes.boxBtn, { fullBtnWidth: fullBtnWidth })}>
        {activeStep !== 0 && <BaseButton title={t('Back')} variant="outlined" onClick={handleBack} />}

        {skip && <BaseButton title={t('Skip')} onClick={handleSkip} />}

        {isSubmit && !withoutSave && (
          <BaseButton type="submit" title={lastStep ? t('Save') : t('Next')} onClick={handleNext} disabled={disabled} />
        )}
      </Box>
    </Box>
  )
}

export default NavigationButtons
