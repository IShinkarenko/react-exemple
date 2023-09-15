import { Box, Typography } from '@mui/material'
import React from 'react'

const FullNotification = ({ message }) => {
  return (
    <Box mt={3}>
      <Typography variant="body2" color="textSecondary" component="p">
        {message}
      </Typography>
    </Box>
  )
}

export default FullNotification
