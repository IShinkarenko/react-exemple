import { Autocomplete, Box, Checkbox, CircularProgress, TextField } from '@mui/material'
import clsx from 'clsx'
import { typeLabels } from 'constant'
import { useFetchJson } from 'hooks/useFetchJson'
import { isEmpty } from 'lodash'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import useStyles from './styles'

const ChipSelect = ({
  extractLabel = (option) => option.label,
  name,
  values,
  jsonUrl,
  options = [],
  freeSolo = true,
  label,
  handleChange,
  preventRemove,
  className,
  isCheckbox = false,
  errors = [],
  freeSoloUUIDHashValue,
  variant = 'outlined',
  noOptionsText = 'No options',
  helperText,
  placeholder,
  handleLoadOptions,
  loading,
  onOpen,
  required,
  isMarketsEmpty,
  ...rest
}) => {
  const classes = useStyles()
  const { result, fetching } = useFetchJson(jsonUrl)
  const [value, setValue] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(false)

  const isLoading = open && options.length === 0

  const isError = errors.includes(name) || error
  const errorMessage = `Please, add at least one ${typeLabels[name]}`
  const chipSelectOptions = jsonUrl ? result : options

  useEffect(() => {
    let active = true

    if (!isLoading) {
      return undefined
    }

    if (active && handleLoadOptions) {
      handleLoadOptions()
    }

    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  useEffect(() => {
    if (values) {
      setValue(values)
    }

    return () => setValue([])
  }, [values])

  useEffect(() => {
    if (required && !isEmpty(value) && error) {
      setError(false)
    }
  }, [required, value, error])

  useEffect(() => {
    if (required && isMarketsEmpty && !error) {
      setError(true)
    }
  }, [required, value, error, isMarketsEmpty])

  const handleOpen = () => {
    if (onOpen) {
      onOpen()
    } else {
      setOpen(true)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onHandleChange = useCallback(
    (event, options) => {
      setValue(options)
      handleChange({ options, name })

      if (required && isEmpty(options) && !error) {
        setError(true)
      }
    },
    [error, handleChange, name, required]
  )

  const onHandleInputChange = useCallback(
    (option) => {
      const isExist = value.find(({ label }) => label === option)
      if (isExist) {
        return setInputValue('')
      }

      const newValue = freeSoloUUIDHashValue ? `${uuidv4()}#${option.toLowerCase()}` : option
      const options = values
        ? values.concat([{ label: option, value: newValue }])
        : [{ label: option, value: newValue }]

      setValue(options)
      handleChange({ options, name })
    },
    [value, freeSoloUUIDHashValue, values, handleChange, name]
  )

  const handleBlur = () => {
    if (required && isEmpty(value)) {
      setError(true)
    } else {
      setError(false)
    }
  }

  return (
    <>
      <Box className={clsx(classes.root, className)}>
        <Autocomplete
          {...rest}
          open={open}
          onOpen={handleOpen}
          onClose={handleClose}
          multiple
          autoHighlight
          name={name}
          value={value}
          loading={loading || fetching}
          inputValue={inputValue}
          onChange={onHandleChange}
          onBlur={handleBlur}
          onInputChange={(e, value) => {
            setInputValue(value)
          }}
          disableCloseOnSelect={isCheckbox}
          options={chipSelectOptions}
          getOptionLabel={(option) => extractLabel(option)}
          noOptionsText={noOptionsText}
          isOptionEqualToValue={(option, value) => extractLabel(option) === extractLabel(value)}
          renderOption={(props, option, { selected }) => (
            <Box {...props}>
              {isCheckbox && <Checkbox checked={selected} />}
              {extractLabel(option)}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              variant={variant}
              label={label}
              error={isError}
              helperText={(isError && errorMessage) || helperText}
              placeholder={placeholder}
              required={required}
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password',
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value && freeSolo) {
                  onHandleInputChange(e.target.value)
                }

                if (e.key === 'Backspace' && preventRemove) {
                  e.stopPropagation()
                }
              }}
            />
          )}
        />
      </Box>
    </>
  )
}

export default memo(ChipSelect)
