import InfoIcon from '@mui/icons-material/Info'
import { Box, Tooltip, Typography } from '@mui/material'
import clsx from 'clsx'
import React, { memo } from 'react'

import useStyles from './styles'

const InfoItem = ({ title, tooltipTitle, text, tooltip = false, direction = 'row', className }) => {
  const classes = useStyles()
  const columnClass = direction === 'column' && classes.columnClass

  return (
    <Box className={clsx(classes.companyInfoItem, columnClass, className)} flexDirection={direction}>
      <Box className={classes.itemTitleBox}>
        <Typography component="div" className={classes.itemTitle}>
          {title}
        </Typography>

        {tooltip && (
          <Tooltip title={tooltipTitle}>
            <InfoIcon />
          </Tooltip>
        )}
      </Box>
      <Box className={classes.itemValue}>{text}</Box>
    </Box>
  )
}

export default memo(InfoItem)
