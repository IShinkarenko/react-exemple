import { Box } from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
import React from 'react'

const LinkSkeleton = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
      <Skeleton variant="circular" width={40} height={40} />
      <Box flex="0.85" ml={2}>
        <Skeleton variant="text" height="40px" />
      </Box>
    </Box>
  )
}

export default LinkSkeleton
