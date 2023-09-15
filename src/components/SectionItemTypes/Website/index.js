import { Box } from '@mui/material'
import CopyToClipboardWrapper from 'components/CopyToClipboardWrapper'
import InfoItem from 'components/InfoItem'
import React, { memo } from 'react'

import useStyles from './styles'

const Website = ({ value: { Website, label } }) => {
  const classes = useStyles()

  return (
    <Box p={1}>
      <InfoItem
        title={<CopyToClipboardWrapper value={Website}>{label || 'Website'}</CopyToClipboardWrapper>}
        text={
          <a href={Website} target="_blank" rel="noreferrer" className={classes.link}>
            {Website}
          </a>
        }
        direction={'column'}
      />
    </Box>
  )
}

export default memo(Website)
