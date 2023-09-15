import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const SectionLoader = ({ sx }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems={'center'} height="100%" sx={sx}>
      <CircularProgress size={30} thickness={2} />
    </Box>
  )
}

export default SectionLoader
