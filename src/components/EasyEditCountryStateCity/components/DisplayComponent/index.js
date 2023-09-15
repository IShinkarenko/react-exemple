import EditIcon from '@mui/icons-material/Edit'
import { Tooltip, Typography } from '@mui/material'
import React from 'react'
import { splitLocation } from 'utils'

import useStyles from './styles'

const DisplayComponent = ({ value, className, placement = 'left-start' }) => {
  const classes = useStyles()
  const location = JSON.parse(value)

  // TODO

  return (
    <Tooltip title={<EditIcon className={classes.icon} />} placement={placement} arrow>
      <Typography variant="subtitle1" className={className}>
        {location ? splitLocation(location) : value}
      </Typography>
    </Tooltip>
  )
}
export default DisplayComponent
