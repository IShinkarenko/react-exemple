import EditIcon from '@mui/icons-material/Edit'
import { Tooltip, Typography } from '@mui/material'
import React from 'react'

import useStyles from './styles'

const DisplayComponent = ({ value, className, placement = 'left-start' }) => {
  const classes = useStyles()

  return (
    <Tooltip title={<EditIcon className={classes.tooltip} />} placement={placement} arrow>
      <Typography variant="subtitle1" className={className}>
        {value}
      </Typography>
    </Tooltip>
  )
}
export default DisplayComponent
