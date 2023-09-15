import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { FormControl, IconButton, InputAdornment, TextField } from '@mui/material'
import clsx from 'clsx'
import { getIn } from 'formik'
import React, { useCallback, useEffect, useState } from 'react'

const InputBase = ({
  disabled,
  placeholder,
  label,
  className,
  variant = 'outlined',
  shrink,
  field: { ...field },
  form: { errors, touched, isValid, validateForm, setFieldTouched },
  fullWidth = true,
  multiline = false,
  rows = 3,
  margin = 'normal',
  isHandleTouched,
  InputProps,
  type,
  ...rest
}) => {
  const errorMessage = getIn(errors, field.name)
  const isError = errorMessage && getIn(touched, field.name)
  const [isVisibility, setIsVisibility] = useState(false)
  const isPassword = type === 'password'

  useEffect(() => {
    if (!isValid && isHandleTouched) {
      validateForm().then(() => setFieldTouched(field.name))
    }
  }, [isValid, field.name, setFieldTouched, validateForm, isHandleTouched])

  const handleClickShowPassword = useCallback(() => {
    setIsVisibility(!isVisibility)
  }, [isVisibility])

  return (
    <FormControl fullWidth={fullWidth} margin={margin} className={clsx(className)}>
      <TextField
        {...field}
        type={isVisibility ? 'text' : type}
        label={label}
        placeholder={placeholder}
        disabled={disabled}
        variant={variant}
        multiline={multiline}
        rows={multiline ? rows : ''}
        InputLabelProps={{ shrink }}
        error={isError}
        helperText={isError && errorMessage}
        InputProps={{
          endAdornment: isPassword && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
                size="large"
              >
                {isVisibility ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
          ...InputProps,
        }}
        inputProps={{
          autoComplete: 'off',
        }}
        {...rest}
      />
    </FormControl>
  )
}

export default InputBase
