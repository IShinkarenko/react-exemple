import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material'
import { Box } from '@mui/system'
import { isEmpty } from 'lodash'
import React, { memo, useCallback, useState } from 'react'

const ObjectivesFilter = ({ options, handleFilter }) => {
  const [selectedValue, setSelectedValue] = useState(['Any'])

  const handleChange = useCallback((event) => {
    const {
      target: { value },
    } = event
    setSelectedValue(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }, [])

  const handleClose = useCallback(() => {
    if (isEmpty(selectedValue)) {
      setSelectedValue(['Any'])
      handleFilter(['Any'])
    } else {
      handleFilter(selectedValue)
    }
  }, [selectedValue, handleFilter])

  const handleRenderValue = useCallback((selected) => selected.join(', '), [])

  return (
    <Box>
      <FormControl sx={{ mb: '14px', width: 350 }}>
        <InputLabel id="demo-multiple-checkbox-label">Objective Filter</InputLabel>

        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedValue}
          onChange={handleChange}
          onClose={handleClose}
          input={<OutlinedInput label="Objective Filter" sx={{ backgroundColor: '#fff' }} />}
          renderValue={handleRenderValue}
        >
          <MenuItem value={'Any'} disabled={!isEmpty(selectedValue) && selectedValue.indexOf('Any') === -1}>
            <Checkbox checked={selectedValue.indexOf('Any') > -1} />
            <ListItemText primary={'Any'} />
          </MenuItem>

          {options.map(({ value, label }) => (
            <MenuItem key={value} value={label} disabled={selectedValue.indexOf('Any') > -1}>
              <Checkbox checked={selectedValue.indexOf(label) > -1} />
              <ListItemText primary={label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(ObjectivesFilter)
