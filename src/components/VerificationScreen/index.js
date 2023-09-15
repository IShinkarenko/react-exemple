import { Box, Paper, Typography } from '@mui/material'
import { BaseButton } from 'components'
import Image from 'next/image'
import React, { memo, useCallback } from 'react'

import useStyles from './styles'

const VerificationScreen = ({ companyName, handleBack }) => {
  const classes = useStyles()

  const handleClick = useCallback(() => {
    handleBack()
  }, [handleBack])

  return (
    <Paper className={classes.verificationContainer}>
      <Box className={classes.verificationInner}>
        <Image src="/static/expandigo-logo.png" alt="Expandigo" width={210} height={90} />

        <Typography variant="h4" className={classes.verificationTitle}>
          {companyName} is under verification!
        </Typography>
        <Typography variant="body2">
          Expandigo is currently verifying your claim to this profile. This could take up to 72 hours. Thank you for
          your patience.
        </Typography>

        <BaseButton title="Back to Default Company" className={classes.verificationButton} onClick={handleClick} />
      </Box>
    </Paper>
  )
}

export default memo(VerificationScreen)
