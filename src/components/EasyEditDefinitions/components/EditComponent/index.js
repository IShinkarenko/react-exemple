import ChipSelect from 'components/ChipSelect'
import React, { memo, useCallback } from 'react'

import useStyles from './styles'

const EditComponent = ({ value, name, label, setParentValue, handleChange, options, ...rest }) => {
  const classes = useStyles()

  const onHandleChange = useCallback(
    ({ options }) => {
      handleChange(options)
      setParentValue(options)
    },
    [handleChange, setParentValue]
  )

  return (
    <>
      <ChipSelect
        name={name}
        label={label}
        values={value}
        handleChange={onHandleChange}
        className={classes.easyEditChipSelect}
        options={options}
        {...rest}
      />
    </>
  )
}
export default memo(EditComponent)
