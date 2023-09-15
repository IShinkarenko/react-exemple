/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Box, Typography } from '@mui/material'
import { Amplify, Analytics } from 'aws-amplify'
import { ObjectivesFilter, SearchLoader } from 'components'
import { WIZZARD_SEARCH } from 'constant'
import CompleteYourProfile from 'containers/CompleteYourProfile'
import SearchResults from 'containers/SearchResults'
import { useSearchResults } from 'hooks/useSearchResults'
import { isEmpty } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { getTagsByType } from 'utils'

import Pagination from '../Pagination'
// import TopCompaniesList from '../TopCompaniesList'
import useStyles from './styles'

Amplify.configure({ mandatorySignIn: false })

const ResultsContainer = ({
  searchParams: { tags, text, searchType },
  completeProfileView,
  handleResetNewSeacrh,
  isNewSearch,
}) => {
  const { t } = useTranslation('searchResults')
  const classes = useStyles()
  const myRef = useRef(null)
  const [companies, setCompanies] = useState([])
  const [paginatedCompanies, setPaginatedCompanies] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pages, setPages] = useState(null)
  const [postsPerPage] = useState(25)
  const isTagsEmpty = isEmpty(tags) && !text
  const { getTagsSearch, getTextSearch, tagsError, textError, companiesData, total, isLoading } = useSearchResults({
    searchType,
  })

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const desireObjectives = getTagsByType(tags, 'DesiredObjective')

  useEffect(() => {
    if (companies) {
      setPaginatedCompanies(companies.slice(indexOfFirstPost, indexOfLastPost))
    }
  }, [companies, indexOfFirstPost, indexOfLastPost])

  useEffect(() => {
    getResults()
  }, [])

  useEffect(() => {
    if (isNewSearch) {
      getResults()
      handleResetNewSeacrh()
    }
  }, [getResults, handleResetNewSeacrh, isNewSearch])

  useEffect(() => {
    if (companiesData) {
      setCompanies(companiesData)
    }
  }, [companiesData])

  useEffect(() => {
    if (!isEmpty(companies)) {
      getPageNumbers()
    }
  }, [companies, getPageNumbers])

  const handleSearchByTags = useCallback(() => {
    if (text) {
      localStorage.removeItem('text')
    }

    Analytics.record({
      name: 'SearchCompaniesByTags',
      attributes: { tags: JSON.stringify(tags), authenticated: 'false' },
    })
    getTagsSearch({
      variables: {
        input: {
          tags,
          limit: 1000,
        },
      },
    })
  }, [getTagsSearch, tags, text])

  const handleSearchByText = useCallback(() => {
    Analytics.record({
      name: 'SearchCompaniesByText',
      attributes: { text: JSON.stringify(text), authenticated: 'false' },
    })

    getTextSearch({
      variables: {
        input: {
          text,
          limit: 1000,
        },
      },
    })
  }, [getTextSearch, text])

  const getResults = useCallback(() => {
    switch (searchType) {
      case WIZZARD_SEARCH:
        return handleSearchByTags()
      default:
        return handleSearchByText()
    }
  }, [handleSearchByTags, handleSearchByText, searchType])

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

  const handleFilterResults = useCallback(
    (filterValue) => {
      if (filterValue.includes('Any')) {
        return setCompanies(companiesData)
      }

      const filteredCompanies = companiesData.filter(({ objectiveMatches }) =>
        filterValue.every((objective) => objectiveMatches.includes(objective))
      )

      setCompanies(filteredCompanies)
    },
    [companiesData]
  )

  if (completeProfileView) return <CompleteYourProfile />

  if (isTagsEmpty)
    return (
      <Alert severity="warning" sx={{ maxWidth: '700px', width: '70%', margin: '24px auto' }}>
        {t('Please add your search criteria!')}
      </Alert>
    )

  if (tagsError || textError)
    return (
      <Alert severity="error" sx={{ maxWidth: '700px', width: '70%', margin: '24px auto' }}>
        {t('Something went wrong!')}
      </Alert>
    )

  if (isLoading) return <SearchLoader />

  return (
    <Box className={classes.resultInner}>
      <Box className={classes.resultsSubHeader} ref={myRef}>
        {text && (
          <Box className={classes.searchCriteriasContainer}>
            <Typography className={classes.searchCriteriasTitle}>{t('Search By:')}</Typography>

            <Typography className={classes.searchCriterias}>{text}</Typography>
          </Box>
        )}

        <Typography className={classes.searchCriteriasSubTitle}>{t('Discover 10,000+ furniture companies')}</Typography>
      </Box>

      {/* <TopCompaniesList /> */}

      <Box>
        {!isEmpty(tags) && <ObjectivesFilter options={desireObjectives} handleFilter={handleFilterResults} />}

        <SearchResults result={paginatedCompanies} total={total} className={classes.unauthenticatedResults} />

        {!!pages && <Pagination pages={pages} currentPage={currentPage} paginate={handlePaginate} />}
      </Box>
    </Box>
  )
}

export default memo(ResultsContainer)
