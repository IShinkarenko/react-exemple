import { useLazyQuery } from '@apollo/client'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import { Box, LinearProgress, ListItem, Typography } from '@mui/material'
import { GET_COMPANIES } from 'api/hooks/queries/useCompanies/useCompanies.gql'
import { BasicSearchField, DropDownMenu } from 'components'
import { EXPANDIGO_BASIC } from 'constant'
import CompanyItem from 'containers/Sidebar/components/CompanyItem'
import { isEmpty } from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { memo, useCallback, useEffect, useState } from 'react'
import routes from 'routes'

import useStyles from './styles'

const CompanySwitcherList = ({ userId, anchorEl, handleClose, currentCompanyId, subscriptionLevel }) => {
  const router = useRouter()
  const { t } = useTranslation('companyMenu')
  const classes = useStyles()
  const [searchPhrase, setSearchPhrase] = useState('')

  const [getCompanies, { loading, data, fetchMore }] = useLazyQuery(GET_COMPANIES, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  })

  const companiesData = data?.getUser?.companies
  const companies = companiesData?.items || []
  const nextToken = companiesData?.nextToken

  useEffect(() => {
    getCompanies({
      variables: {
        id: userId,
        limit: !searchPhrase ? 5 : 25,
        filter: searchPhrase
          ? {
              ...(searchPhrase && { searchPhrase: searchPhrase.toLowerCase() }),
            }
          : null,
      },
    })
  }, [getCompanies, searchPhrase, userId])

  const handleResetSearch = useCallback(() => {
    setSearchPhrase('')
  }, [setSearchPhrase])

  const handleSearchCompanies = useCallback((searchText) => {
    setSearchPhrase(searchText)
  }, [])

  const handleScroll = useCallback(
    (e) => {
      const target = e.target
      const isScrollable = target.clientHeight + target.scrollTop >= target.scrollHeight

      if (isScrollable) {
        if (nextToken) {
          fetchMore({
            variables: { id: userId, limit: 5, nextToken },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              if (!fetchMoreResult) return previousResult

              return Object.assign({}, previousResult, {
                getUser: {
                  ...fetchMoreResult.getUser,
                  companies: {
                    ...fetchMoreResult.getUser.companies,
                    items: [...previousResult.getUser.companies.items, ...fetchMoreResult.getUser.companies.items],
                  },
                },
              })
            },
          })
        }
      }
    },
    [fetchMore, nextToken, userId]
  )

  const handleAddNewCompany = useCallback(
    (e) => {
      e.preventDefault()
      router.push(routes.createCompany)
    },
    [router]
  )

  const handleChangeCompany = useCallback(
    (companyId) => {
      router.push({
        pathname: routes.company,
        query: { companyId },
      })

      handleClose()
    },
    [handleClose, router]
  )

  return (
    <DropDownMenu anchorEl={anchorEl} handleClose={handleClose} horizontal={'left'} className={classes.switchCompany}>
      <Typography variant="body2" className={classes.switchTitle}>
        {t('Switch Company context')} <CloseIcon onClick={handleClose} />
      </Typography>

      <Box sx={{ p: 1, bgcolor: '#f9f9fc' }}>
        <BasicSearchField
          value={searchPhrase}
          handleSearch={handleSearchCompanies}
          handleReset={handleResetSearch}
          autoFocus={false}
          inputClassName={classes.searchField}
        />
      </Box>

      <Box className={classes.companiesContainer} onScroll={handleScroll}>
        {loading && (
          <Box style={{ position: 'absolute', top: 0, width: '100%' }}>
            <LinearProgress sx={{ height: '3px' }} />
          </Box>
        )}

        {isEmpty(companies) && (
          <Typography variant="subtitle2" className={classes.searchText}>
            {t('No companies')}
          </Typography>
        )}

        {companies.map((company) => (
          <CompanyItem
            {...company}
            key={company.id}
            currentCompanyId={currentCompanyId}
            handleChangeCompany={handleChangeCompany}
          />
        ))}
      </Box>
      {subscriptionLevel !== EXPANDIGO_BASIC && (
        <ListItem className={classes.switchOption} onClick={handleAddNewCompany}>
          <AddIcon /> <span>{t('Add Company')}</span>
        </ListItem>
      )}
    </DropDownMenu>
  )
}

export default memo(CompanySwitcherList)
