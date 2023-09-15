import { Autocomplete, TextField } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import React, { memo } from 'react'

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
  root: {
    backgroundColor: '#fff',
  },
})

const AutoCompleteField = ({
  name,
  label,
  options = [],
  extractLabel = (option) => option.label,

  ...rest
}) => {
  const classes = useStyles()

  return (
    <Autocomplete
      name={name}
      options={options}
      classes={{
        option: classes.option,
        root: classes.root,
      }}
      size={'small'}
      autoHighlight
      getOptionLabel={extractLabel}
      autoComplete={false}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password',
          }}
        />
      )}
      {...rest}
    />
  )
}

export default memo(AutoCompleteField)
