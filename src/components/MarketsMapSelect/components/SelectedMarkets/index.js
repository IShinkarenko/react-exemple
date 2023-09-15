import { Chip, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React from 'react'

import useStyles from './styles'

const SelectedMarkets = ({ markets, handleRemoveMarket }) => {
  const { t } = useTranslation('tags')
  const classes = useStyles()

  const handleRemoval = (market) => {
    handleRemoveMarket(market)
  }

  return (
    <>
      <Typography variant="h5" className={classes.marketTitle}>
        {t('Where do you primarily operate?')}
      </Typography>

      {markets.map((market) => (
        <Chip
          key={market.value}
          label={market.label}
          color="primary"
          className={classes.marketChip}
          onDelete={() => handleRemoval(market)}
        />
      ))}
    </>
  )
}

export default SelectedMarkets
