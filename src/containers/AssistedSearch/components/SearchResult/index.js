/* eslint-disable react-hooks/exhaustive-deps */

import { Alert, Box, Paper, Typography } from '@mui/material'
import clsx from 'clsx'
import { BasicSearchField, ObjectivesFilter, SearchLoader } from 'components'
import { TRADITIONAL_SEARCH, WIZZARD_SEARCH } from 'constant'
import SearchResults from 'containers/SearchResults'
import Pagination from 'containers/UnauthenticatedSearchResults/components/Pagination'
// import TopCompaniesList from 'containers/UnauthenticatedSearchResults/components/TopCompaniesList'
import { useSearchResults } from 'hooks/useSearchResults'
import { isEmpty } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { checkRequiredTypes, getTagsByType } from 'utils'

import MatchAgain from '../MatchAgain'
import useStyles from './styles'

const SearchResult = ({
  steps,
  dispatch,
  handleCreateHistorySearchItem,
  state: { tags, errors, expanded, text, searchType },
}) => {
  const { t } = useTranslation('assistedResearch')
  const classes = useStyles()
  const myRef = useRef(null)

  const [companies, setCompanies] = useState([])
  const [paginatedCompanies, setPaginatedCompanies] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pages, setPages] = useState(null)
  const [postsPerPage] = useState(25)

  const { getTagsSearch, getTextSearch, tagsError, textError, companiesData, total, isLoading } = useSearchResults({
    searchType,
  })

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const desireObjectives = getTagsByType(tags, 'DesiredObjective')

  useEffect(() => {
    if (companiesData) {
      setCompanies(companiesData)
    }
  }, [companiesData])

  useEffect(() => {
    if (companies) {
      setPaginatedCompanies(companies.slice(indexOfFirstPost, indexOfLastPost))
    }
  }, [companies, indexOfFirstPost, indexOfLastPost])

  useEffect(() => {
    if (!isEmpty(companies)) {
      getPageNumbers()
    }
  }, [companies, getPageNumbers])

  useEffect(() => {
    if (searchType === WIZZARD_SEARCH) {
      if (!isEmpty(tags)) {
        getTagsSearch({
          variables: {
            input: {
              tags,
              limit: 1000,
            },
          },
        })
      }
    }
  }, [searchType])

  useEffect(() => {
    if (searchType === TRADITIONAL_SEARCH) {
      getTextSearch({
        variables: {
          input: {
            text,
            limit: 1000,
          },
        },
      })

      localStorage.removeItem('text')
    }
  }, [getTextSearch, searchType, text])

  const handlePaginate = useCallback((pageNumber) => {
    setCurrentPage(pageNumber)
    myRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const getPageNumbers = useCallback(() => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(companies.length / postsPerPage); i++) {
      pageNumbers.push(i)
    }

    setPages(pageNumbers.length - 1)
  }, [companies.length, postsPerPage])

  const handleSearchAgain = useCallback(() => {
    const requiredTags = steps.flatMap(({ required }) => required)
    const errorsArray = checkRequiredTypes(requiredTags, tags)

    if (!isEmpty(errorsArray)) {
      dispatch({ type: 'SET_ERRORS', payload: errorsArray })
    } else {
      dispatch({ type: 'SET_ERRORS', payload: [] })
      dispatch({ type: 'SET_EXPANDED', payload: false })
      dispatch({ type: 'SET_TEXT', payload: '' })

      if (searchType === TRADITIONAL_SEARCH) {
        dispatch({ type: 'SET_SEARCH_TYPE', payload: WIZZARD_SEARCH })
      }

      handleNewSearchByTags()
      handleCreateHistorySearchItem()
    }
  }, [dispatch, handleCreateHistorySearchItem, handleNewSearchByTags, searchType, steps, tags])

  const handleNewSearchByTags = useCallback(() => {
    getTagsSearch({
      variables: {
        input: {
          tags,
        },
      },
    })
  }, [getTagsSearch, tags])

  const handleNewSearchByText = useCallback(
    (text) => {
      if (!text) {
        return null
      }

      if (!isEmpty(tags)) {
        dispatch({ type: 'SET_TAGS', payload: [] })
      }

      if (searchType === WIZZARD_SEARCH) {
        dispatch({ type: 'SET_SEARCH_TYPE', payload: TRADITIONAL_SEARCH })
      }

      dispatch({ type: 'SET_TEXT', payload: text })

      getTextSearch({
        variables: {
          input: {
            text,
            limit: 1000,
          },
        },
      })

      handleCreateHistorySearchItem(text)
    },
    [dispatch, getTextSearch, handleCreateHistorySearchItem, searchType, tags]
  )

  const handleFilterResults = useCallback(
    (filterValue) => {
      if (filterValue.includes('Any')) {
        return setCompanies(companiesData)
      }

      const filteredCompanies = companiesData.filter(
        ({ objectiveMatches }) =>
          filterValue.every((objective) => objectiveMatches.includes(objective)) &&
          filterValue.length === objectiveMatches.length
      )

      setCompanies(filteredCompanies)
    },
    [companiesData]
  )

  if (isLoading && !textError && !tagsError) return <SearchLoader />

  return (
    <Paper className={clsx(classes.assistedContainer, classes.resultsContainer)}>
      {searchType === TRADITIONAL_SEARCH && (
        <BasicSearchField
          value={text}
          placeholder={t('Search')}
          handleSearch={handleNewSearchByText}
          className={classes.searchTextAgain}
          inputClassName={classes.traditionalField}
          autoFocus={false}
        />
      )}

      {searchType === WIZZARD_SEARCH && (
        <MatchAgain
          tags={tags}
          errors={errors}
          expanded={expanded}
          dispatch={dispatch}
          handleSearchAgain={handleSearchAgain}
        />
      )}

      {text && (
        <Box className={classes.searchCriteriasContainer}>
          <Typography className={classes.searchCriteriasTitle}>{t('Search By')}:</Typography>

          <Typography className={classes.searchCriterias}>{text}</Typography>
        </Box>
      )}

      {tagsError || textError ? (
        <Alert severity="error" className={classes.resultsAlert}>
          {t('Something went wrong!')}
        </Alert>
      ) : (
        <>
          {/* <TopCompaniesList /> */}

          <Box ref={myRef} className={classes.resultsWrap}>
            {!isEmpty(tags) && <ObjectivesFilter options={desireObjectives} handleFilter={handleFilterResults} />}

            <SearchResults result={paginatedCompanies} total={total} isProfile className={classes.assistedresults} />

            {!!pages && <Pagination pages={pages} currentPage={currentPage} paginate={handlePaginate} />}
          </Box>
        </>
      )}
    </Paper>
  )
}

export default memo(SearchResult)
