import { Box, Button } from '@mui/material'
import Amplify, { Analytics } from 'aws-amplify'
import clsx from 'clsx'
import {
  AssistedResearchBackgrounds,
  AssistedResearchForm,
  AssistedResearchPhrases,
  BasicSearchField,
} from 'components'
//import LngSelection from 'components/Header/LngSelection'
import { searchToggleButtons, TRADITIONAL_SEARCH, WIZZARD_SEARCH } from 'constant'
import { isEmpty } from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import routes from 'routes'
import { getTagsByType } from 'utils'

import useStyles from './styles'

Amplify.configure({ mandatorySignIn: false })

const UnauthenticatedSearch = () => {
  const { t } = useTranslation('unauthenticatedSearch')
  const classes = useStyles()
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)
  const [tagsValues, setTagsValues] = useState([])
  const [errors, setErrors] = useState()
  const [searchType, setSearchType] = useState(WIZZARD_SEARCH)

  const isWizzardSearch = searchType === WIZZARD_SEARCH
  const isTraditionalSearch = searchType === TRADITIONAL_SEARCH

  useEffect(() => {
    if (searchType) {
      localStorage.setItem('searchType', searchType)
    }
  }, [searchType])

  const steps = useMemo(
    () => [
      {
        step: 0,
        label: t('Your Sectors'),
        required: ['OperatingSector'],
      },
      {
        step: 1,
        label: t('Your Markets'),
        required: ['OperatingMarket'],
      },
      {
        step: 2,
        label: t('Your Objectives'),
        required: ['DesiredObjective'],
      },
      {
        step: 3,
        label: t('Our AI Suggestions'),
      },
    ],
    [t]
  )
  const isLastStep = activeStep === steps.length - 2

  useEffect(() => {
    Analytics.record({ name: 'UnathenticatedSearchHit' })
    localStorage.removeItem('text')
    localStorage.removeItem('tags')
  }, [])

  const handleChangeTags = useCallback((data) => {
    setTagsValues(data)
  }, [])

  const checkRequredTypes = useCallback(
    (requiredTypes) => requiredTypes.filter((tagType) => isEmpty(getTagsByType(tagsValues, tagType))),
    [tagsValues]
  )

  const handleValidateStepper = useCallback(() => {
    const errorsArray = checkRequredTypes(steps[activeStep].required)

    if (isEmpty(errorsArray)) {
      setErrors([])

      if (isLastStep) {
        router.push(routes.searchResults)
        localStorage.setItem('tags', JSON.stringify(tagsValues))
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
      }
    } else {
      setErrors(errorsArray)
    }
  }, [activeStep, steps, checkRequredTypes, isLastStep, router, tagsValues])

  const handleNext = useCallback(() => {
    handleValidateStepper()
  }, [handleValidateStepper])

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }, [])

  const handleToggleSearch = useCallback(() => {
    if (searchType === WIZZARD_SEARCH) {
      setSearchType(TRADITIONAL_SEARCH)
    } else {
      setSearchType(WIZZARD_SEARCH)
    }
  }, [searchType])

  const handleSearchByText = useCallback(
    (text) => {
      if (!text) {
        return null
      }

      router.push(routes.searchResults)
      localStorage.setItem('text', text)
    },
    [router]
  )

  return (
    <>
      <Box className={classes.header}>
        <Box className={classes.lngButton}>
          {/* <LngSelection /> */}
          {t('Beta - Limited to Furniture Industry')}
        </Box>

        <Box className={classes.inner}>
          <Box className={clsx(classes.bg, isTraditionalSearch && classes.traditionalBg)}>
            <AssistedResearchPhrases
              activeStep={activeStep}
              isTraditionalSearch={isTraditionalSearch}
              className={clsx(isTraditionalSearch && classes.traditionalText)}
            />

            <AssistedResearchBackgrounds activeStep={activeStep} className={classes.images} />
          </Box>

          <Box className={clsx(classes.form, isTraditionalSearch && classes.formTraditional)}>
            <Box className={clsx(classes.searchSwitcher, isTraditionalSearch && classes.traditionalSearchSwitcher)}>
              {searchToggleButtons.map(({ name, title }) => (
                <Button
                  key={name}
                  className={clsx(classes.searchTypeBtn, name === searchType && classes.searchTypeBtnActive)}
                  onClick={handleToggleSearch}
                >
                  {t(`${title}`)}
                </Button>
              ))}
            </Box>

            <CSSTransition in={isWizzardSearch} timeout={500} unmountOnExit>
              <AssistedResearchForm
                steps={steps}
                errors={errors}
                activeStep={activeStep}
                tagsValues={tagsValues}
                handleBack={handleBack}
                handleNext={handleNext}
                handleChangeTags={handleChangeTags}
                className={classes.wizzard}
              />
            </CSSTransition>

            <CSSTransition in={isTraditionalSearch} timeout={500} unmountOnExit>
              <BasicSearchField handleSearch={handleSearchByText} className={classes.traditional} />
            </CSSTransition>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default UnauthenticatedSearch
