import ChipSelect from 'components/ChipSelect'
import MarketsMapSelect from 'components/MarketsMapSelect'
import React, { memo, useCallback } from 'react'
import { concatTags } from 'utils'

import useStyles from './styles'

const EditComponent = ({ value, name, label, setParentValue, json, tags, handleChange, freeSolo, noOptionsText }) => {
  const classes = useStyles()
  const isMarkets = name === 'OperatingMarket' || name === 'DesiredMarket'

  const onHandleChange = useCallback(
    ({ options }) => {
      const newTags = concatTags(tags, options, name)

      handleChange(newTags)
      setParentValue(options)
    },
    [name, setParentValue, tags, handleChange]
  )

  return (
    <>
      {isMarkets ? (
        <MarketsMapSelect
          name={name}
          label={label}
          handleChange={onHandleChange}
          values={value}
          className={classes.easyEditChipSelect}
        />
      ) : (
        <ChipSelect
          name={name}
          label={label}
          jsonUrl={json}
          values={value}
          handleChange={onHandleChange}
          className={classes.easyEditChipSelect}
          freeSolo={freeSolo}
          noOptionsText={noOptionsText}
        />
      )}
    </>
  )
}
export default memo(EditComponent)
