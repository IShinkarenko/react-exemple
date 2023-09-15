import EditIcon from '@mui/icons-material/Edit'
import { Tooltip, Typography } from '@mui/material'
import React, { memo } from 'react'

import useStyles from './styles'

const DisplayComponent = ({ value, extractLabel }) => {
  const classes = useStyles()

  return (
    <>
      <Tooltip title={<EditIcon className={classes.tooltip} />} placement={'left-start'} arrow>
        <Typography variant="subtitle1" className={classes.dashed}>
          {(value || []).map((item, index) => (
            <span key={index} className={classes.chip}>
              {extractLabel(item)}
            </span>
          ))}
        </Typography>
      </Tooltip>
    </>
  )
}
export default memo(DisplayComponent)
