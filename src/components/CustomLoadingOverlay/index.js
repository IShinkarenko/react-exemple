import { Box, LinearProgress } from '@mui/material'
import { GridOverlay } from '@mui/x-data-grid'
import React from 'react'

const CustomLoadingOverlay = () => {
  return (
    <GridOverlay>
      <Box style={{ position: 'absolute', top: 0, width: '100%' }}>
        <LinearProgress />
      </Box>
    </GridOverlay>
  )
}

export default CustomLoadingOverlay
