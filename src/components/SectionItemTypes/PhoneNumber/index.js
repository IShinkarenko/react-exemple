import { Box } from '@mui/material'
import InfoItem from 'components/InfoItem'
import React, { memo } from 'react'

const PhoneNumber = ({ value: { PhoneNumber, label } }) => {
  return (
    <Box p={1}>
      <InfoItem title={label || 'Phone'} text={PhoneNumber} direction={'column'} />
    </Box>
  )
}

export default memo(PhoneNumber)
