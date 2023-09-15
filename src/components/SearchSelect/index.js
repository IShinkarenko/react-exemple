import { Box, Checkbox, InputAdornment, ListItemText, MenuItem, TextField } from '@mui/material'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import { useTranslation } from 'next-i18next'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { getOptionLabel } from 'utils'

import useStyles from './styles'

const SearchSelect = ({
  label,
  name,
  value,
  placeholder,
  options,
  className,
  multiple = true,
  handleChange = () => console.log('handleChange'),
  ...rest
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()

  const [checked, setChecked] = useState([])
  const isSingleChecked = typeof checked === 'string'
  const isAllChecked = checked.length === options.length
  const isPartiallyChecked = !isEmpty(checked) && !isAllChecked
  const placeholderTitle = placeholder.split(' ').slice(1).join(' ')

  useEffect(() => {
    if (value) {
      setChecked(value)
    }

    return () => setChecked([])
  }, [value])

  const renderValue = useCallback(
    () =>
      isSingleChecked
        ? [getOptionLabel(checked, options)]
        : isAllChecked
        ? [t('All')]
        : isEmpty(checked)
        ? [t('Select')]
        : [`${placeholderTitle} (${checked.length})`],
    [checked, isAllChecked, isSingleChecked, options, placeholderTitle, t]
  )

  const handleChecked = useCallback(
    (value) => () => {
      if (multiple) {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]

        if (currentIndex === -1) {
          newChecked.push(value)
        } else {
          newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
        handleChange({ value: newChecked, name })
      } else {
        setChecked(value)
        handleChange({ value, name })
      }
    },
    [checked, handleChange, multiple, name]
  )

  const handleClickAll = useCallback(
    (event) => {
      if (isPartiallyChecked) {
        setChecked([])
        handleChange({ value: [], name })
      } else if (event.target.checked) {
        const newSelected = options.map(({ value }) => value)

        setChecked(newSelected)
        handleChange({ value: newSelected, name })
      } else {
        setChecked([])
        handleChange({ value: [], name })
      }
    },
    [handleChange, isPartiallyChecked, name, options]
  )

  return (
    <Box className={clsx(classes.searchSelectWrap, className)}>
      <TextField
        select
        label={label}
        variant="outlined"
        value={renderValue()}
        fullWidth={true}
        className={clsx(multiple && classes.searchField, !isEmpty(checked) && classes.active)}
        SelectProps={{
          multiple: multiple,
          onChange: handleChecked,
          renderValue: () => renderValue(),
          MenuProps: {
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
          },
          classes: { root: multiple && classes.selectRoot },
        }}
        InputProps={{
          startAdornment: multiple && (
            <InputAdornment position="start" className={classes.adornment}>
              <Checkbox
                size="small"
                checked={isAllChecked}
                onChange={handleClickAll}
                indeterminate={isPartiallyChecked}
                className={classes.checkbox}
              />
            </InputAdornment>
          ),
        }}
        inputProps={{
          autoComplete: 'off',
        }}
        {...rest}
      >
        {options.map(({ label, value }) => (
          <MenuItem key={value} value={value} onClick={handleChecked(value)} className={classes.menuItem}>
            {multiple && <Checkbox edge="start" checked={checked.indexOf(value) !== -1} tabIndex={-1} disableRipple />}
            <ListItemText primary={label} />
          </MenuItem>
        ))}
      </TextField>
    </Box>
  )
}

export default memo(SearchSelect)
