import React, { memo } from 'react'
import { Geography } from 'react-simple-maps'
import theme from 'theme'

const LoadGeography = ({ geography, handleSetProperties }) => {
  // const isDefaultValue = !select.length && defaultCountry && geography.properties.country === defaultCountry

  // useEffect(() => {
  //   if (isDefaultValue) {
  //     handleSetProperties(geography.rsmKey)
  //   }
  // }, [isDefaultValue, geography.rsmKey, handleSetProperties])

  const onHandleClick = () => {
    handleSetProperties(geography.rsmKey)
  }

  return (
    <Geography
      geography={geography}
      onClick={onHandleClick}
      style={{
        default: {
          fill: theme.palette.grey[500],
          outline: 'none',
          stroke: 'white',
          strokeWidth: 1,
        },
        hover: {
          fill: theme.palette.primary.main,
          outline: 'none',
        },
        pressed: {
          fill: theme.palette.secondary.main,
          outline: 'none',
        },
      }}
    />
  )
}

export default memo(LoadGeography)
