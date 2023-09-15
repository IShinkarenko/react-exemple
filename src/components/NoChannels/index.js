import { Box, Typography } from '@mui/material'
import { BaseButton } from 'components'
import { useTranslation } from 'next-i18next'
import React from 'react'

const NoChannels = () => {
  const { t } = useTranslation('companyProfile')

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" flex={1}>
      <Box mb={2}>
        <Typography variant="h5">{t('You have no channels. Please create a channel.')}</Typography>
      </Box>

      <BaseButton title={`${t('Add Channel')}`} />
    </Box>
  )
}

export default NoChannels
