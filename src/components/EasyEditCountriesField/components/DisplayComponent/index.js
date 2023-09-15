import EditIcon from '@mui/icons-material/Edit'
import { Tooltip, Typography } from '@mui/material'
import React from 'react'

import useStyles from './styles'

const DisplayComponent = ({ value, className, placement = 'left-start' }) => {
  const classes = useStyles()
  const isValueObj = typeof value === 'object'

  return (
    <Tooltip title={<EditIcon className={classes.icon} />} placement={placement} arrow>
      <Typography variant="subtitle1" className={className}>
        {isValueObj ? value.country : value}
      </Typography>
    </Tooltip>
  )
}
export default DisplayComponent
