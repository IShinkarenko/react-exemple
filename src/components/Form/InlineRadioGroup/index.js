import { Box, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import clsx from 'clsx'
import React, { memo } from 'react'

import useStyles from './styles'

const InlineRadioGroup = ({
  extractId = (option) => option.label,
  extractValue = (option) => option.value,
  extractLabel = (item) => item.label,
  field,
  options,
  label,
  className,
  ...props
}) => {
  const classes = useStyles()

  return (
    <FormControl component="fieldset">
      <RadioGroup {...field} {...props}>
        {label}
        <Box>
          {options.map((option) => (
            <FormControlLabel
              key={extractId(option)}
              value={extractValue(option)}
              control={<Radio color="primary" />}
              label={extractLabel(option)}
              className={clsx(className, field.value === extractValue(option) && classes.active)}
            />
          ))}
        </Box>
      </RadioGroup>
    </FormControl>
  )
}

export default memo(InlineRadioGroup)
