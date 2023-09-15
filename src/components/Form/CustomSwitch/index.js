import { FormControlLabel, Switch } from '@mui/material'
import React, { memo } from 'react'

const CustomSwitch = ({ field, label, className, ...props }) => {
  const switchLabel = field.value ? label : `Not ${label}`

  return (
    <FormControlLabel
      control={<Switch {...field} checked={field.value} color="primary" {...props} />}
      label={switchLabel}
      className={className}
    />
  )
}

export default memo(CustomSwitch)
