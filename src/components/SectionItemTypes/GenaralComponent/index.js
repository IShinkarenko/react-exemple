import { Box, Typography } from '@mui/material'
import InfoItem from 'components/InfoItem'
import React, { memo } from 'react'

const GenaralComponent = ({ name, value }) => {
  const label = name.replace(/([a-z])([A-Z])/g, '$1 $2')
  const isHeader = name === 'Header'
  const title = isHeader ? '' : value.label ? value.label : label

  return (
    <Box p={1}>
      <InfoItem
        title={title}
        text={isHeader ? <Typography variant="h3">{value[name]}</Typography> : value[name]}
        direction={'column'}
      />
    </Box>
  )
}

export default memo(GenaralComponent)
