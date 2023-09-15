import { Box, Typography } from '@mui/material'
import React, { memo } from 'react'

import useStyles from './styles'

const SubHead = ({ title, description, mt = 2, mb = 1 }) => {
  const classes = useStyles()

  return (
    <Box mt={mt} mb={mb} className={classes.radioLabel}>
      <Typography>{title}</Typography>
      <Typography variant="caption">{description}</Typography>
    </Box>
  )
}

export default memo(SubHead)
