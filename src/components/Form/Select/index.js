import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { getIn } from 'formik'
import React, { useRef } from 'react'

const SelectField = ({
  extractId = (option) => option.value,
  extractValue = (option) => option.value,
  extractLabel = (item) => item.label,
  options = [],
  label,
  field,
  shrink,
  variant = 'outlined',
  form: { errors, touched },
  ...rest
}) => {
  const inputLabel = useRef(null)
  const errorMessage = getIn(errors, field.name)
  const isError = errorMessage && getIn(touched, field.name)

  const renderValue = (selected) => extractLabel(options.find((item) => extractValue(item) === selected) || {})

  return (
    <FormControl variant={variant} margin="normal" fullWidth={true} error={isError}>
      <InputLabel ref={inputLabel} shrink={shrink}>
        {label}
      </InputLabel>

      <Select {...field} {...rest} renderValue={renderValue} MenuProps={{ disablePortal: true }}>
        {options.map((option) => (
          <MenuItem key={extractId(option)} value={extractValue(option)}>
            {extractLabel(option)}
          </MenuItem>
        ))}
      </Select>
      {isError && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  )
}

export default SelectField
