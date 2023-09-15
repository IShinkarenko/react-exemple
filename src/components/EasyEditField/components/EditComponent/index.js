import { TextField } from '@mui/material'
import clsx from 'clsx'
import React from 'react'

import useStyles from './styles'

const EditComponent = ({ setParentValue, value, textfiled, className, ...rest }) => {
  const classes = useStyles()

  const handleChange = (event) => setParentValue(event.target.value)

  return (
    <TextField
      value={value}
      onChange={handleChange}
      className={clsx(classes.input, className)}
      multiline={textfiled}
      rows={textfiled && 5}
      variant="standard"
      inputProps={{
        autoComplete: 'new-password',
      }}
      {...rest}
    />
  )
}
export default EditComponent
