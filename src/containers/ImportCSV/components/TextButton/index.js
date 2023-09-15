import { Button } from '@mui/material'
import React from 'react'

import useStyles from './styles'

export const TextButton = ({ disabled, onClick, children }) => {
  const classes = useStyles()
  return (
    <Button variant="contained" className={classes.CSVImporter_TextButton} disabled={disabled} onClick={onClick}>
      {children}
    </Button>
  )
}
