import { useLazyQuery } from '@apollo/client'
import { Box } from '@mui/material'
import { GET_CITIES } from 'api/hooks/queries/useCities/useCities.gql'
import { GET_COUNTRIES } from 'api/hooks/queries/useCountries/useCountries.gql'
import { GET_REGIONS } from 'api/hooks/queries/useRegions/useRegions.gql'
import {
  EasyEditCountryStateCity,
  EasyEditField,
  EasyEditSelect,
  EasyEditYear,
  InfoItem,
  SwitcherVisibility,
} from 'components'
import { useTranslation } from 'next-i18next'
import React, { memo, useCallback } from 'react'
import { appendProtocol } from 'utils'

import AvatarUploader from '../AvatarUploader'
import ProfileAutosuggest from '../ProfileAutosuggest'
import { companySizeKeys, companySizeOptions, industries } from './../../constants'
import useStyles from './styles'

const GeneralInformation = ({
  company: {
    name,
    logoUrl,
    loading,
    location,
    industry,
    websiteUrl,
    companySize,
    description,
    foundingYear,
    visibilityLevel,
  },
  handleChange,
  handleStartLoading,
}) => {
  const classes = useStyles()
  const { t } = useTranslation('companyProfile')

  const [getCountries, { data: countriesData }] = useLazyQuery(GET_COUNTRIES, {
    fetchPolicy: 'no-cache',
  })
  const [getRegions, { data: regionsData }] = useLazyQuery(GET_REGIONS, {
    fetchPolicy: 'no-cache',
  })
  const [getCities, { data: citiesData }] = useLazyQuery(GET_CITIES, {
    fetchPolicy: 'no-cache',
  })

  const countries = countriesData?.getGlobalLocalDefinition?.countries?.items
  const regions = regionsData?.getGeoCountry?.regions?.items
  const cities = citiesData?.getGeoRegion?.cities?.items

  const handleChangeVisibility = useCallback(
    (data) => {
      handleChange({ name: 'visibilityLevel', value: data.visibilityLevel })
    },
    [handleChange]
  )

  const handleUpdateCompanyLogo = useCallback(
    ({ imageUrl }) => {
      handleChange({ name: 'logoUrl', value: imageUrl })
    },
    [handleChange]
  )

  const handleChangeWebsiteUrl = useCallback(
    ({ websiteUrl }) => {
      handleChange({ name: 'websiteUrl', value: appendProtocol(websiteUrl) })
    },
    [handleChange]
  )

  const handleGetCountries = useCallback(() => {
    getCountries({ variables: { id: 'en-US' } })
  }, [getCountries])

  const handleFilterRegions = useCallback(
    (countryId) => {
      getRegions({ variables: { id: countryId } })
    },
    [getRegions]
  )

  const handleFilterCities = useCallback(
    (regionId) => {
      getCities({ variables: { id: regionId } })
    },
    [getCities]
  )

  return (
    <>
      <Box className={classes.companyGeneralTop}>
        <Box className={classes.companyGeneralTopLeft}>
          <Box className={classes.companyLogoWrap}>
            <AvatarUploader
              handleStartLoading={handleStartLoading}
              handleUpdate={handleUpdateCompanyLogo}
              loading={loading}
              name={name}
              src={logoUrl}
            />
          </Box>

          <EasyEditField handleSave={handleChange} name={'name'} value={name} variant={'h4'} />
        </Box>

        <ProfileAutosuggest />
      </Box>

      <Box>
        <InfoItem
          title={`${t('Visibility')}:`}
          text={<SwitcherVisibility handleChange={handleChangeVisibility} value={visibilityLevel} />}
          className={classes.companyProfileVisibility}
        />

        <InfoItem
          title={`${t('Location')}:`}
          text={
            <EasyEditCountryStateCity
              name={'location'}
              value={location}
              citiesOptions={cities}
              regionsOptions={regions}
              handleSave={handleChange}
              countriesOptions={countries}
              displayCmpClass={classes.itemValue}
              handleLoadCountries={handleGetCountries}
              handleFilterCities={handleFilterCities}
              handleFilterRegions={handleFilterRegions}
            />
          }
          className={classes.companyProfilelocation}
        />

        <InfoItem
          title={`${t('Industry')}:`}
          text={
            <EasyEditSelect
              name={'industry'}
              options={industries(t)}
              value={t(industry)}
              handleSave={handleChange}
              maxWidth={'500px'}
              displayCmpClass={classes.itemValue}
              selectProps={{
                MenuProps: {
                  classes: { paper: classes.menuPaper },
                },
              }}
            />
          }
        />
      </Box>

      <Box className={classes.companySecondaryData} mt={3}>
        <InfoItem
          direction={'column'}
          text={
            <EasyEditSelect
              displayCmpClass={classes.itemValue}
              displayValueKeys={companySizeKeys}
              handleSave={handleChange}
              name={'companySize'}
              options={companySizeOptions}
              value={companySize}
            />
          }
          title={`${t('Company Size')}:`}
        />

        <InfoItem
          direction={'column'}
          text={
            <EasyEditYear
              displayCmpClass={classes.itemValue}
              handleSave={handleChange}
              name={'foundingYear'}
              value={foundingYear ?? ''}
            />
          }
          title={`${t('Founded')}:`}
        />

        <InfoItem
          direction={'column'}
          text={
            <EasyEditField
              displayCmpClass={classes.itemValue}
              handleSave={handleChangeWebsiteUrl}
              name={'websiteUrl'}
              value={websiteUrl ?? ''}
            />
          }
          title={`${t('Website')}:`}
        />
      </Box>

      <Box mt={3}>
        <InfoItem
          direction={'column'}
          text={
            <EasyEditField
              textfiled
              displayCmpClass={classes.itemValue}
              handleSave={handleChange}
              name={'description'}
              value={description ?? ''}
              maxWidth={'750px'}
            />
          }
          title={`${t('Description')}:`}
        />
      </Box>
    </>
  )
}

export default memo(GeneralInformation)
