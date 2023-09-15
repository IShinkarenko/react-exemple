import { Box, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { memo } from 'react'

import useStyles from './styles'

const Footer = ({ fullWidth, className, ml = '260px' }) => {
  const { t } = useTranslation('footer')
  const classes = useStyles()

  return (
    <Box sx={{ left: fullWidth ? 0 : ml }} className={classes.footer}>
      <Box className={className}>
        <Typography variant="caption">v2.4.5 &bull; {t('Copyright')} 2022 &bull; Expandigo LLC</Typography>
      </Box>
    </Box>
  )
}

export default memo(Footer)
