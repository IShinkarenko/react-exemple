import CloseIcon from '@mui/icons-material/Close'
import DoneIcon from '@mui/icons-material/Done'
import { Box } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { memo, useCallback } from 'react'
import EasyEdit, { Types } from 'react-easy-edit'

import DisplayComponent from './components/DisplayComponent'
import EditComponent from './components/EditComponent'
import useStyles from './styles'

const EasyEditCountryStateCity = ({
  name,
  value,
  options,
  className,
  handleSave,
  citiesOptions,
  regionsOptions,
  handleLoadCountries,
  displayCmpClass,
  countriesOptions,
  toolTipPlacement,
  handleFilterRegions,
  handleFilterCities,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()

  const handleClick = useCallback((event) => {
    event.preventDefault()
    event.stopPropagation()
  }, [])

  const onHandleSave = useCallback(
    (value) => {
      handleSave({ name, value })
    },
    [handleSave, name]
  )

  return (
    <Box onClick={handleClick}>
      <EasyEdit
        type={Types.TEXT}
        value={value}
        onSave={onHandleSave}
        displayComponent={
          <DisplayComponent placement={toolTipPlacement} options={options} className={displayCmpClass} />
        }
        editComponent={
          <EditComponent
            className={className}
            countriesOptions={countriesOptions}
            regionsOptions={regionsOptions}
            citiesOptions={citiesOptions}
            handleFilterRegions={handleFilterRegions}
            handleFilterCities={handleFilterCities}
            handleLoadCountries={handleLoadCountries}
          />
        }
        saveButtonLabel={<DoneIcon fontSize="small" className={classes.saveButtons} />}
        cancelButtonLabel={<CloseIcon fontSize="small" className={classes.saveButtons} />}
        placeholder={t('Click to edit')}
      />
    </Box>
  )
}

export default memo(EasyEditCountryStateCity)
