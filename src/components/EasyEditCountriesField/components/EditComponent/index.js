import { Autocomplete, TextField } from '@mui/material'
import React from 'react'

const EditComponent = ({ value, setParentValue, options, className }) => {
  const handleChange = (event, value) => {
    setParentValue(value || '')
  }

  return (
    <Autocomplete
      options={options}
      autoHighlight
      value={value}
      clearIcon={null}
      className={className}
      onChange={handleChange}
      getOptionLabel={(option) => option.country || option}
      renderOption={(props, option) => (
        <React.Fragment {...props}>
          {option.country} ({option.code})
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a country"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autocomplete: 'new-password',
          }}
        />
      )}
    />
  )
}
export default EditComponent
