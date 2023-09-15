import { Box, Typography } from '@mui/material'
import { BaseButton } from 'components'
import { useTranslation } from 'next-i18next'
import React, { useCallback } from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'

import useStyles from './styles'

const GeneralProgress = ({ generalScore, handleCompleteProfile, isDisabled }) => {
  const { t } = useTranslation('auth')

  const classes = useStyles()

  const handleClick = useCallback(() => {
    handleCompleteProfile()
  }, [handleCompleteProfile])

  return (
    <Box className={classes.progressWrap}>
      <Box className={classes.progressLeft}>
        <Box className={classes.progressbar}>
          <CircularProgressbar
            value={generalScore}
            text={`${generalScore.toFixed()}%`}
            strokeWidth={5}
            styles={buildStyles({
              textColor: '#333',
              pathColor: '#74D3D1',
            })}
          />
        </Box>

        <Box className={classes.progressTitle}>
          <Typography variant="h4">{t('Complete Your Profile')}</Typography>
          <Typography variant="body2">
            {t('You are close to publishing your own company profile for others to find you in match results.')}
          </Typography>
          <Typography variant="body2">{t('Create an account for free and customize your profile!')}</Typography>
        </Box>
      </Box>

      <BaseButton title={t('Complete')} disabled={isDisabled} className={classes.completeBtn} onClick={handleClick} />
    </Box>
  )
}

export default GeneralProgress
