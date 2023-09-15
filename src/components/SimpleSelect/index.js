import InfoIcon from '@mui/icons-material/Info'
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import FormHelperText from '@mui/material/FormHelperText'
import React from 'react'

const SimpleSelect = ({
  extractValue = (option) => option.value,
  extractLabel = (option) => option.label,
  extractDisabled = (option) => option.disabled,
  name,
  value,
  label,
  handleChange,
  options,
  className,
  margin = 'normal',
  helperText,
  variant = 'outlined',
  ...rest
}) => {
  return (
    <FormControl variant={variant} fullWidth margin={margin} className={className}>
      {label && <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>}

      <Select
        name={name}
        variant={variant}
        value={value}
        onChange={(e) => {
          e.stopPropagation()
          handleChange(e)
        }}
        className={className}
        label={label && label}
        {...rest}
      >
        {options.map((option) => (
          <MenuItem key={extractValue(option)} value={extractValue(option)} disabled={extractDisabled(option)}>
            {extractLabel(option)}
          </MenuItem>
        ))}
      </Select>

      {helperText && (
        <FormHelperText component="div">
          <Box display="flex" alignItems="center" ml={'-14px'}>
            <Box mr={1} display="flex" alignItems="center">
              <InfoIcon />
            </Box>
            {helperText}
          </Box>
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default SimpleSelect
