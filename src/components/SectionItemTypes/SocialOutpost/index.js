import { Box } from '@mui/material'
import CopyToClipboardWrapper from 'components/CopyToClipboardWrapper'
import InfoItem from 'components/InfoItem'
import React, { memo } from 'react'
import { capitalizeFirstLetter } from 'utils'

const SocialOutpost = ({ value: { SocialOutpost } }) => {
  const { hostname } = new URL(SocialOutpost)
  const parsedHost = hostname.replace('.com', '')

  return (
    <Box p={1}>
      <InfoItem
        title={capitalizeFirstLetter(parsedHost)}
        text={
          <CopyToClipboardWrapper value={SocialOutpost}>
            <a href={SocialOutpost} target="_blank" rel="noreferrer">
              {SocialOutpost}
            </a>
          </CopyToClipboardWrapper>
        }
        direction={'column'}
      />
    </Box>
  )
}

export default memo(SocialOutpost)
