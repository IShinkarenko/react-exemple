import DatePicker from '@mui/lab/DatePicker'
import { TextField } from '@mui/material'
import React from 'react'

const EditComponent = ({ value, setParentValue }) => {
  const handleChange = (date) => {
    setParentValue(date)
  }

  return (
    <DatePicker
      views={['year']}
      value={value}
      onChange={handleChange}
      maxDate={new Date()}
      renderInput={(params) => <TextField {...params} helperText={null} variant="standard" />}
    />
  )
}
export default EditComponent
