import React from 'react'

import { TextButton } from './../TextButton'
import useStyles from './styles'

// eslint-disable-next-line react/display-name
export const FormatErrorMessage = React.memo(({ onCancelClick, children }) => {
  const classes = useStyles()

  return (
    <div className={classes.CSVImporter_FormatErrorMessage}>
      <span>{children}</span>
      <TextButton onClick={onCancelClick}>Go Back</TextButton>
    </div>
  )
})
