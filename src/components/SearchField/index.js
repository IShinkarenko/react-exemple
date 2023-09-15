import CancelIcon from '@mui/icons-material/Cancel'
import SearchIcon from '@mui/icons-material/Search'
import { Box, IconButton, InputAdornment, TextField } from '@mui/material'
import clsx from 'clsx'
import React, { memo, useCallback } from 'react'

import useStyles from './styles'

const SearchField = ({
  handleChangeSearchInput,
  value,
  handleResetSearch,
  className,
  inputClassName,
  placeholder,
  margin = 'none',
  size = 'small',
  isSubmit,
  ...rest
}) => {
  const classes = useStyles()

  const handleChange = useCallback(
    (event) => {
      handleChangeSearchInput(event.target.value)
    },
    [handleChangeSearchInput]
  )

  const handleCleanSearchInput = useCallback(() => {
    handleResetSearch()
  }, [handleResetSearch])

  return (
    <Box className={clsx(classes.companySearchWrap, className)}>
      <TextField
        fullWidth
        value={value}
        size={size}
        margin={margin}
        variant="outlined"
        placeholder={placeholder}
        className={clsx(classes.companySearch, inputClassName)}
        InputLabelProps={{ shrink: false }}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {isSubmit ? (
                <IconButton type="submit" size="small">
                  <SearchIcon className={classes.searchIcon} color="primary" />
                </IconButton>
              ) : (
                <SearchIcon className={classes.searchIcon} />
              )}
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <CancelIcon
                className={clsx(classes.resetSearch, value && classes.resetSearchVisible)}
                onClick={handleCleanSearchInput}
              />
            </InputAdornment>
          ),
        }}
        inputProps={{
          autoComplete: 'off',
        }}
        {...rest}
      />
    </Box>
  )
}

export default memo(SearchField)
