import { Backdrop, CircularProgress } from '@mui/material'
import React, { memo } from 'react'

import useStyles from './styles'

const PageLoader = () => {
  const classes = useStyles()

  return (
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress color="primary" />
    </Backdrop>
  )
}

export default memo(PageLoader)
