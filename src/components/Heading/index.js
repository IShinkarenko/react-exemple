import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import { Box, Typography } from '@mui/material'
import { INSTANCE_STATUS_SUGGESTED } from 'constant'
import React from 'react'

import useStyles from './styles'

const ChannelName = ({ name, instanceStatus }) => {
  const classes = useStyles()

  return (
    <Box display="flex" alignItems="center">
      <DragIndicatorIcon color="disabled" className={classes.dragIndicatorIcon} />
      <Typography
        className={instanceStatus === INSTANCE_STATUS_SUGGESTED ? classes.dragSuggestion : classes.dragText}
        type="body2"
      >
        #{name}
      </Typography>
    </Box>
  )
}

export default ChannelName
