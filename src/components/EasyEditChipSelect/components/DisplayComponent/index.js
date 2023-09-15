import EditIcon from '@mui/icons-material/Edit'
import { Tooltip, Typography } from '@mui/material'
import clsx from 'clsx'
import React, { memo } from 'react'

import useStyles from './styles'

const DisplayComponent = ({ value, className, placement = 'left-start' }) => {
  const classes = useStyles()

  return (
    <>
      <Tooltip title={<EditIcon className={classes.tooltip} />} placement={placement} arrow>
        <Typography variant="subtitle1" className={clsx(classes.dashed, className)}>
          {(value || []).map(({ label }) => label).join(', ')}
        </Typography>
      </Tooltip>
    </>
  )
}
export default memo(DisplayComponent)
