import { Box } from '@mui/material'
import React from 'react'

import { statusColor } from './constants'
import useStyles from './styles'

const Badge = ({ status }) => {
  const classes = useStyles()

  return <Box className={classes.badge} bgcolor={statusColor[status]}></Box>
}

export default Badge
