import { Box } from '@mui/material'
import InfoItem from 'components/InfoItem'
import React, { memo } from 'react'

const Custom = ({ value: { editorMarkup, Custom } }) => {
  return (
    <Box p={1}>
      <InfoItem
        text={<div dangerouslySetInnerHTML={{ __html: editorMarkup }}></div>}
        direction={'column'}
        title={Custom}
      />
    </Box>
  )
}

export default memo(Custom)
