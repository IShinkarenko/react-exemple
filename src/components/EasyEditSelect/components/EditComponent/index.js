import { MenuItem, TextField } from '@mui/material'
import clsx from 'clsx'
import React from 'react'

import useStyles from './styles'

const EditComponent = ({ setParentValue, value, className, options, selectProps }) => {
  const classes = useStyles()

  const handleChange = (event) => {
    setParentValue(event.target.value)
  }

  return (
    <TextField
      select={true}
      value={value}
      onChange={handleChange}
      className={clsx(classes.input, className)}
      variant="standard"
      SelectProps={selectProps}
    >
      {options &&
        options.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
    </TextField>
  )
}
export default EditComponent
