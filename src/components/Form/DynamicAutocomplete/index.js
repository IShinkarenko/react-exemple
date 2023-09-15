import { TextField } from '@mui/material'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import React, { memo } from 'react'

const DynamicAutocomplete = ({ field, form: { setFieldValue } }) => {
  const filter = createFilterOptions()

  const getUniqueArray = (value) => Array.from(new Set([...field.value, value]))

  const handleChange = (event, newValue) => {
    event.stopPropagation()
    event.preventDefault()

    if (typeof newValue === 'string') {
      // Create a new value with enter, right from the input
      setFieldValue(field.name, getUniqueArray(newValue))
    }

    if (newValue && newValue.inputValue) {
      // Create a new value click on -Add "xxx"-
      setFieldValue(field.name, getUniqueArray(newValue.inputValue))
    }
  }

  return (
    <Autocomplete
      {...field}
      freeSolo
      clearOnBlur
      selectOnFocus
      handleHomeEndKeys
      onChange={handleChange}
      filterOptions={(options, params) => {
        const filtered = filter(options, params)
        const isValueNotExist = !field.value.includes(params.inputValue)

        if (params.inputValue !== '' && isValueNotExist) {
          filtered.push({
            inputValue: params.inputValue,
            title: `Add "${params.inputValue}"`,
          })
        }

        return filtered
      }}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue
        }
        // Regular option
        return option.title || ''
      }}
      disableClearable={true}
      options={field.value}
      renderOption={(props, option) => {
        if (typeof option === 'string') {
          return option
        } else {
          return option.title
        }
      }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label={`Enter New Option (${field.value.length} options)`}
            variant="outlined"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password',
            }}
          />
        )
      }}
    />
  )
}

export default memo(DynamicAutocomplete)
