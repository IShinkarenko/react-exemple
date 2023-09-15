import { Box, Button, Typography } from '@mui/material'
import clsx from 'clsx'
import { BaseButton, BasicSearchField, TagTypeIndustrial, TagTypeMarkets, TagTypeObjectives } from 'components'
import { searchToggleButtons, TRADITIONAL_SEARCH, WIZZARD_SEARCH } from 'constant'
import { isEmpty } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import routes from 'routes'
import { checkRequiredTypes } from 'utils'

import useStyles from './styles'

const ResultsSidebar = ({
  handleNewSearch,
  completeProfileView,
  handleCompleteProfile,
  isNewSearch,
  searchParams: { text, tags: incomingTags, searchType: incomigSearchType },
}) => {
  const { t } = useTranslation('searchResults')
  const classes = useStyles()
  const router = useRouter()
  const {
    query: { q },
  } = router
  const [tags, setTags] = useState([])
  const [errors, setErrors] = useState()
  const [searchType, setSearchType] = useState(WIZZARD_SEARCH)
  const requiredTags = useMemo(() => ['OperatingSector', 'OperatingMarket', 'DesiredObjective'], [])

  const isWizzardSearch = searchType === WIZZARD_SEARCH
  const isTraditionalSearch = searchType === TRADITIONAL_SEARCH

  useEffect(() => {
    if (incomingTags) {
      setTags(incomingTags)
    }
  }, [incomingTags])

  useEffect(() => {
    if (incomigSearchType) {
      setSearchType(incomigSearchType)
    }
  }, [incomigSearchType])

  const onHandleChange = useCallback((newTags) => {
    setTags(newTags)
  }, [])

  const handleSearchByTags = useCallback(() => {
    const errors = checkRequiredTypes(requiredTags, tags)

    if (!isEmpty(errors)) {
      return setErrors(errors)
    }

    localStorage.setItem('searchType', WIZZARD_SEARCH)
    localStorage.setItem('tags', JSON.stringify(tags))
    localStorage.removeItem('text')

    setErrors([])
    handleNewSearch()
  }, [handleNewSearch, requiredTags, tags])

  const handleSearchByText = useCallback(
    (text) => {
      if (!text) {
        return null
      }
      if (q) {
        router.replace(routes.searchResults)
      }

      localStorage.setItem('searchType', TRADITIONAL_SEARCH)
      localStorage.setItem('text', text)

      handleNewSearch()
    },
    [handleNewSearch, q, router]
  )

  const handleToggleSearch = useCallback(() => {
    if (searchType === WIZZARD_SEARCH) {
      setSearchType(TRADITIONAL_SEARCH)
    } else {
      setSearchType(WIZZARD_SEARCH)
    }
  }, [searchType])

  return (
    <Box className={classes.sidebarInner}>
      {!completeProfileView && (
        <Box className={classes.matches}>
          <Box className={classes.image}>
            <Image src="/static/matches2.png" alt="Search" width={55} height={55} />
          </Box>

          <Typography>
            {t('Do you want')} <strong>{t('to be found by others')}</strong> {t('in matches?')}
          </Typography>

          <Box className={classes.link} onClick={handleCompleteProfile}>
            {t('Complete Your Profile')}
          </Box>
        </Box>
      )}

      <Box className={classes.searchSwitcher}>
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

      {!isNewSearch && (
        <Box className={classes.sideBarSearchContainer}>
          <CSSTransition in={isWizzardSearch} timeout={500} unmountOnExit>
            <Box className={classes.sidebarWizardSearch}>
              <Box className={classes.filtersArea}>
                <TagTypeIndustrial handleChange={onHandleChange} tags={tags} errors={errors} size={'small'} />

                <TagTypeMarkets handleChange={onHandleChange} tags={tags} errors={errors} size={'small'} />

                <TagTypeObjectives handleChange={onHandleChange} tags={tags} errors={errors} size={'small'} />
              </Box>

              <BaseButton title={t('Get my matches')} className={classes.searchAgain} onClick={handleSearchByTags} />
            </Box>
          </CSSTransition>

          <CSSTransition in={isTraditionalSearch} timeout={500} unmountOnExit>
            <BasicSearchField
              value={text}
              handleSearch={handleSearchByText}
              className={classes.sidebarSearchText}
              inputClassName={classes.searchTextAgainInput}
              placeholder={'Search Again'}
            />
          </CSSTransition>
        </Box>
      )}
    </Box>
  )
}

export default memo(ResultsSidebar)
