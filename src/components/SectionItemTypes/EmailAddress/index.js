import { Box } from '@mui/material'
import CopyToClipboardWrapper from 'components/CopyToClipboardWrapper'
import InfoItem from 'components/InfoItem'
import React, { memo } from 'react'

const EmailAddress = ({ value: { EmailAddress, label } }) => {
  return (
    <Box p={1}>
      <InfoItem
        title={<CopyToClipboardWrapper value={EmailAddress}>{label || 'Email'}</CopyToClipboardWrapper>}
        text={<a href={`mailto:${EmailAddress}`}>{EmailAddress}</a>}
        direction={'column'}
      />
    </Box>
  )
}

export default memo(EmailAddress)
