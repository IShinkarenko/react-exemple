/* eslint-disable react/no-unescaped-entities */
import { Box, Button, CircularProgress, Paper, Typography } from '@mui/material'
import { useCreateCompanySearch } from 'api/hooks'
import { GET_COMPANY_SEARCHES } from 'api/hooks/queries/useCompanySearches/useCompanySearches.gql'
import clsx from 'clsx'
import { AssistedResearchForm, BasicSearchField } from 'components'
import { TRADITIONAL_SEARCH, WIZZARD_SEARCH } from 'constant'
import { isEmpty } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import { checkRequiredTypes, omitTypenameInArr } from 'utils'

import SearchResult from '../SearchResult'
import useStyles from './styles'

const Search = ({ state, steps, dispatch }) => {
  const { t } = useTranslation('assistedResearch')
  const { activeStep, tags, errors, results, text, searchType } = state
  const router = useRouter()
  const {
    query: { companyId },
  } = router
  const classes = useStyles()
  const isLastStep = activeStep === steps.length - 2
  const isWizzardSearch = searchType === WIZZARD_SEARCH
  const isTraditionalSearch = searchType === TRADITIONAL_SEARCH

  const [createCompanySearch, { loading }] = useCreateCompanySearch({
    refetchQueries: [{ query: GET_COMPANY_SEARCHES, variables: { id: companyId } }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      dispatch({ type: 'SET_RESULTS', payload: true })
      dispatch({ type: 'MATCH_AGAIN', payload: false })
    },
  })

  useEffect(() => {
    if (typeof window !== undefined) {
      const globalSeacrhText = localStorage.getItem('text')

      if (globalSeacrhText) {
        handleSubmitTraditionalSeacrh(globalSeacrhText)
      }
    }
  }, [handleSubmitTraditionalSeacrh])

  const handleValidateStepper = useCallback(() => {
    const errorsArray = checkRequiredTypes(steps[activeStep].required, tags)

    if (!isEmpty(errorsArray)) {
      return dispatch({ type: 'SET_ERRORS', payload: errorsArray })
    }

    if (isEmpty(errorsArray) && isLastStep) {
      dispatch({ type: 'SET_ERRORS', payload: [] })
      dispatch({ type: 'SET_SEARCH_TYPE', payload: WIZZARD_SEARCH })
      handleCreateHistorySearchItem()
    }

    dispatch({ type: 'SET_ACTIVE_STEP', payload: activeStep + 1 })
  }, [steps, activeStep, tags, isLastStep, dispatch, handleCreateHistorySearchItem])

  const handleBack = useCallback(() => {
    dispatch({ type: 'SET_ACTIVE_STEP', payload: activeStep - 1 })
  }, [activeStep, dispatch])

  const handleChangeTags = useCallback(
    (data) => {
      dispatch({ type: 'SET_TAGS', payload: data })
    },
    [dispatch]
  )

  const handleCreateHistorySearchItem = useCallback(
    (text) => {
      createCompanySearch({
        variables: {
          input: {
            companyId,
            tags: omitTypenameInArr(tags),
            text: text ? text : '',
          },
        },
      })
    },
    [companyId, createCompanySearch, tags]
  )

  const handleSubmitTraditionalSeacrh = useCallback(
    (text) => {
      if (!text) {
        return null
      }

      dispatch({ type: 'SET_TEXT', payload: text })
      dispatch({ type: 'SET_SEARCH_TYPE', payload: TRADITIONAL_SEARCH })
      handleCreateHistorySearchItem(text)
    },
    [dispatch, handleCreateHistorySearchItem]
  )

  const handleToggleSearch = useCallback(() => {
    if (searchType === WIZZARD_SEARCH) {
      dispatch({ type: 'SET_SEARCH_TYPE', payload: TRADITIONAL_SEARCH })
    } else {
      dispatch({ type: 'SET_SEARCH_TYPE', payload: WIZZARD_SEARCH })
    }
  }, [dispatch, searchType])

  const toggleButtons = [
    {
      name: 'wizzard',
      title: 'Wizard',
    },
    {
      name: 'traditional',
      title: 'Traditional',
    },
  ]

  if (results)
    return (
      <SearchResult
        state={state}
        steps={steps}
        dispatch={dispatch}
        handleCreateHistorySearchItem={handleCreateHistorySearchItem}
      />
    )

  if (loading)
    return (
      <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" height="100%">
        <Typography variant="subtitle2">{t('Searching Suggestions...')}</Typography>
        <Box mt={2}>
          <CircularProgress />
        </Box>
      </Box>
    )

  return (
    <Paper className={classes.assistedWrapper}>
      <Typography className={classes.assistedHead}>{t('Lets Find Companies For You')}</Typography>

      <Box className={classes.assistedContainer}>
        <Box className={clsx(classes.searchSwitcher, isTraditionalSearch && classes.traditionalSearchSwitcher)}>
          {toggleButtons.map(({ name, title }) => (
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
            auth={false}
            steps={steps}
            errors={errors}
            activeStep={activeStep}
            tagsValues={tags}
            handleBack={handleBack}
            handleNext={handleValidateStepper}
            handleChangeTags={handleChangeTags}
            className={classes.assistedForm}
          />
        </CSSTransition>

        <CSSTransition in={isTraditionalSearch} timeout={500} unmountOnExit>
          <BasicSearchField
            value={text}
            handleSearch={handleSubmitTraditionalSeacrh}
            className={classes.traditional}
            inputClassName={classes.traditionalField}
            placeholder={'Search'}
          />
        </CSSTransition>
      </Box>
    </Paper>
  )
}

export default Search
