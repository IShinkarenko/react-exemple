import EditIcon from '@mui/icons-material/Edit'
import { Tooltip, Typography } from '@mui/material'
import clsx from 'clsx'
import React from 'react'

import useStyles from './styles'

const DisplayComponent = ({ value, className, placement = 'left-start' }) => {
  const classes = useStyles()

  return (
    <>
      <Tooltip title={<EditIcon className={classes.tooltip} />} placement={placement} arrow>
        <Typography variant="subtitle1" className={clsx(classes.dashed, className)}>
          {new Date(value).getFullYear()}
        </Typography>
      </Tooltip>
    </>
  )
}
export default DisplayComponent
