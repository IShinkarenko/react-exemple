import RemoveIcon from '@mui/icons-material/Remove'
import React from 'react'

import useStyles from './styles'

const EmptyData = () => {
  const classes = useStyles()

  return <RemoveIcon fontSize="small" className={classes.empty} />
}

export default EmptyData
