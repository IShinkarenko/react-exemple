import React from 'react'

import useStyles from './styles'

export const IconButton = ({ type, label, small, focusOnly, disabled, onClick }) => {
  const classes = useStyles()
  return (
    <button
      className={classes.CSVImporter_IconButton}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      data-small={!!small}
      data-focus-only={!!focusOnly}
    >
      <span data-type={type} />
    </button>
  )
}
