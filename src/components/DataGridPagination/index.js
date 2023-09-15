import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Box, IconButton } from '@mui/material'
import React, { memo } from 'react'

const DataGridPagination = ({ handleNext, handlePrev, isNextActive, isBackActive }) => {
  return (
    <Box>
      <IconButton size="large" onClick={handlePrev} disabled={isBackActive}>
        <KeyboardArrowLeftIcon />
      </IconButton>

      <IconButton size="large" onClick={handleNext} disabled={isNextActive}>
        <KeyboardArrowRightIcon />
      </IconButton>
    </Box>
  )
}

export default memo(DataGridPagination)
