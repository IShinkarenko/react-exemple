import { Box } from '@mui/material'
import { AutoCompleteField } from 'components'
import React, { useCallback, useEffect, useState } from 'react'

import useStyles from './styles'

const EditComponent = ({
  value,
  countriesOptions,
  regionsOptions,
  citiesOptions,
  setParentValue,
  handleFilterRegions,
  handleFilterCities,
  handleLoadCountries,
}) => {
  const classes = useStyles()
  const [location, setLocation] = useState({
    country: null,
    region: null,
    city: null,
  })
  const parsedValue = value && JSON.parse(value)

  useEffect(() => {
    handleLoadCountries()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (parsedValue) {
      setLocation(parsedValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (parsedValue && parsedValue.country) {
      handleFilterRegions(parsedValue.country.id)
    }

    if (parsedValue && parsedValue.region) {
      handleFilterCities(parsedValue.region.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCountryChange = useCallback(
    (event, selectedCountry) => {
      handleFilterRegions(selectedCountry.id)

      handleChangeState({
        parentValue: { country: selectedCountry, region: null, city: null },
        locationValue: { country: selectedCountry, region: null, city: null },
      })
    },
    [handleChangeState, handleFilterRegions]
  )

  const handleStateChange = useCallback(
    (event, selectedRegion) => {
      if (!selectedRegion) {
        return handleChangeState({
          parentValue: { ...location, region: null, city: null },
          locationValue: { region: null, city: null },
        })
      }

      handleFilterCities(selectedRegion.id)

      handleChangeState({
        parentValue: { ...location, region: selectedRegion },
        locationValue: { region: selectedRegion, city: null },
      })
    },
    [handleChangeState, handleFilterCities, location]
  )

  const handleCityChange = useCallback(
    (event, selectedCity) => {
      handleChangeState({
        parentValue: { ...location, city: selectedCity ? selectedCity : null },
        locationValue: { city: selectedCity ? selectedCity : null },
      })
    },
    [handleChangeState, location]
  )

  const handleChangeState = useCallback(
    ({ parentValue, locationValue }) => {
      setParentValue(JSON.stringify(parentValue))
      setLocation((prevState) => ({
        ...prevState,
        ...locationValue,
      }))
    },
    [setParentValue]
  )

  return (
    <Box className={classes.localtionContainer}>
      <AutoCompleteField
        name={'country'}
        label="Country"
        value={location.country}
        onChange={handleCountryChange}
        options={countriesOptions}
        extractLabel={(option) => option.name}
        disableClearable={true}
      />
      <AutoCompleteField
        name={'region'}
        label="Region"
        options={regionsOptions}
        value={location.region}
        onChange={handleStateChange}
        extractLabel={(option) => option.name}
        disabled={!location.country}
      />
      <AutoCompleteField
        name={'city'}
        label="City"
        options={citiesOptions}
        value={location.city}
        extractLabel={(option) => option.name}
        onChange={handleCityChange}
        disabled={!location.region}
      />
    </Box>
  )
}
export default EditComponent
