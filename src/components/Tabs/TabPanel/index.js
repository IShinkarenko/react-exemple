import { Box } from '@mui/material'
import React from 'react'

const TabPanel = ({ children, value, index, ...props }) => (
  <Box role="tabpanel" hidden={value !== index} {...props} height={'100%'}>
    {value === index && <Box height={'100%'}>{children}</Box>}
  </Box>
)

export default TabPanel
