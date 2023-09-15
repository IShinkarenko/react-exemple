import { useLazyQuery } from '@apollo/client'
import { Box, Grid, Typography } from '@mui/material'
import { GET_CHANNEL_CONNECTIONS } from 'api/hooks/queries/useChannelConnections/useChannelConnections.gql'
import { SEARCH_COMPANIES_BY_TAGS } from 'api/hooks/queries/useSearchCompaniesByTags/useSearchCompaniesByTags.gql'
import { BasicSearchField, SectionLoader, SimpleSelect } from 'components'
import { CONNECTED, CONNECTION_PENDING, CONNECTION_REJECTED, DISCONNECTED, FOLLOWING, NONE, SUGGESTED } from 'constant'
import { isEmpty } from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { omitTypenameInArr } from 'utils'

import ConnectionItem from '../ConnectionItem'
import SuggestedConnections from '../SuggestedConnections'
import useStyles from './styles'

const ChannelConnections = ({ tags }) => {
  const classes = useStyles()
  const { t } = useTranslation('channels')
  const {
    query: { channelId },
  } = useRouter()
  const [sortValue, setSortValue] = useState(NONE)
  const [searchValue, setSearchValue] = useState('')

  const [getConnections, { loading, data }] = useLazyQuery(GET_CHANNEL_CONNECTIONS)

  const [getTagsSearch, { loading: searchLoading, data: dataSearch }] = useLazyQuery(SEARCH_COMPANIES_BY_TAGS, {
    fetchPolicy: 'no-cache',
  })

  const connections = data?.getCompanyChannel?.connections?.items
  const isSuggested = sortValue === SUGGESTED
  const isSorted = sortValue !== NONE && !isSuggested
  const isFiltered = isSorted || searchValue
  const suggestedCompanies = dataSearch?.searchCompaniesByTags?.items
  const suggestedCompaniesTotal = dataSearch?.searchCompaniesByTags?.total

  useEffect(() => {
    getConnections({
      variables: {
        id: channelId,
        filter: isFiltered
          ? {
              ...(isSorted && { status: sortValue }),
              ...(searchValue && { searchPhrase: searchValue.toLowerCase() }),
            }
          : null,
      },
    })
  }, [channelId, getConnections, isFiltered, isSorted, searchValue, sortValue])

  useEffect(() => {
    if (isSuggested) {
      getTagsSearch({
        variables: {
          input: {
            tags: omitTypenameInArr(tags),
            limit: 1000,
          },
        },
      })
    }
  }, [getTagsSearch, isSuggested, tags])

  const handleChangeSort = useCallback((event) => {
    const value = event.target.value

    setSortValue(value)
  }, [])

  const handleSearchConnections = useCallback((searchPhrase) => {
    setSearchValue(searchPhrase)
  }, [])

  const handleResetSearch = useCallback(() => {
    setSearchValue('')
  }, [])

  const sortOptions = useMemo(
    () => [
      { label: t('None'), value: NONE },
      { label: t('Connected'), value: CONNECTED },
      { label: t('Pending'), value: CONNECTION_PENDING },
      { label: t('Rejected'), value: CONNECTION_REJECTED },
      { label: t('Disconnected'), value: DISCONNECTED },
      { label: t('Following'), value: FOLLOWING },
      { label: t('Suggested'), value: SUGGESTED },
    ],
    [t]
  )

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box className={classes.connectionsTop}>
        <Box className={classes.topleft}>
          <BasicSearchField
            value={searchValue}
            handleSearch={handleSearchConnections}
            handleReset={handleResetSearch}
            autoFocus={false}
            inputClassName={classes.searchField}
            disabled={isSorted}
          />
        </Box>

        <Box className={classes.topRight}>
          <Typography variant="overline" className={classes.sortTitle} noWrap>
            {t('Sort By')}
          </Typography>

          <SimpleSelect
            value={sortValue}
            options={sortOptions}
            handleChange={handleChangeSort}
            margin={'dense'}
            className={classes.sortSelect}
            disabled={!!searchValue}
            size={'small'}
          />
        </Box>
      </Box>

      <Box className={classes.connections}>
        <>
          {(loading || searchLoading) && <SectionLoader />}

          {(isEmpty(connections) || (isSuggested && isEmpty(suggestedCompanies))) && (
            <Typography variant="subtitle2" className={classes.notFoundTitle}>
              {t('Sorry, no companies found')}
            </Typography>
          )}

          {!isSuggested && (
            <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {(connections || []).map((connection) => (
                <ConnectionItem key={connection.id} {...connection} />
              ))}
            </Grid>
          )}

          {isSuggested && !isEmpty(suggestedCompanies) && (
            <SuggestedConnections suggestedCompanies={suggestedCompanies} total={suggestedCompaniesTotal} />
          )}
        </>
      </Box>
    </Box>
  )
}

export default memo(ChannelConnections)
