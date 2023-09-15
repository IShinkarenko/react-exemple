import EditIcon from '@mui/icons-material/Edit'
import { Tooltip, Typography } from '@mui/material'
import clsx from 'clsx'
import React from 'react'

import useStyles from './styles'

const DisplayComponent = ({ value, valuePrefix, className, placement = 'left-start', variant = 'subtitle1' }) => {
  const classes = useStyles()
  const displayValue = valuePrefix ? `${valuePrefix}${value}` : value

  return (
    <>
      <Tooltip title={<EditIcon className={classes.tooltip} />} placement={placement} arrow>
        <Typography variant={variant} className={clsx(classes.dashed, className)}>
          {displayValue}
        </Typography>
      </Tooltip>
    </>
  )
}
export default DisplayComponent
