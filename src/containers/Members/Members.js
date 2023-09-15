import { useLazyQuery } from '@apollo/client'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Box, Button } from '@mui/material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import { GET_COMPANY_USERS } from 'api/hooks/queries/useCompanyUsers/useCompanyUsers.gql'
import { Badge, BasicSearchField, CustomLoadingOverlay, DataGridPagination } from 'components'
import { ACTIVE, DISABLED, OWNER } from 'constant'
import { useCheckUser } from 'hooks/useCheckUser'
import { isEmpty } from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import routes from 'routes'

import useStyles from './styles'

const Members = ({ handleIviteViewToggle }) => {
  const { t } = useTranslation('teamMembers')
  const classes = useStyles()
  const router = useRouter()
  const {
    query: { companyId },
  } = router
  const { user } = useCheckUser()
  const [searchPhrase, setSearchPhrase] = useState('')
  const [nextToken, setNextToken] = useState(undefined)
  const [nextNextToken, setNextNextToken] = useState()
  const [previousTokens, setPreviousTokens] = useState([])

  const [getMembers, { loading, data }] = useLazyQuery(GET_COMPANY_USERS, {
    onCompleted: ({ getCompany: { relationships } }) => setNextNextToken(relationships?.nextToken),
    fetchPolicy: 'cache-and-network',
  })
  const members = data?.getCompany?.users?.items
  const isNextActive = !nextNextToken
  const isBackActive = isEmpty(previousTokens)

  useEffect(() => {
    getMembers({
      variables: { id: companyId, ...(searchPhrase && { filter: { searchPhrase: searchPhrase.toLowerCase() } }) },
    })
  }, [companyId, getMembers, searchPhrase])

  const handleRedirectToProfile = useCallback(
    (memberId) => {
      router.push({
        pathname: routes.companyMember,
        query: { companyId, memberId },
      })
    },
    [companyId, router]
  )

  const handleSearchMembers = useCallback((searchText) => {
    setSearchPhrase(searchText)
  }, [])

  const handleResetSearch = useCallback(() => {
    setSearchPhrase('')
  }, [])

  const handleIviteMember = useCallback(() => {
    handleIviteViewToggle()
  }, [handleIviteViewToggle])

  const handleNext = useCallback(() => {
    setPreviousTokens((prev) => [...prev, nextToken])
    setNextToken(nextNextToken)
    setNextNextToken(null)
  }, [nextNextToken, nextToken])

  const handlePrev = useCallback(() => {
    setNextToken(previousTokens.pop())
    setPreviousTokens([...previousTokens])
    setNextNextToken(null)
  }, [previousTokens])

  const memberColumns = useMemo(
    () => [
      { field: 'name', headerName: t('Name'), flex: 1, sortable: false },
      {
        field: 'role',
        headerName: t('Role'),
        sortable: false,
        flex: 1,
      },
      {
        field: 'status',
        headerName: t('Status'),
        sortable: false,
        flex: 1,
        renderCell: ({ row }) => {
          return <Badge status={row?.disabled ? DISABLED : ACTIVE} />
        },
      },
      {
        field: 'id',
        type: 'actions',
        width: 70,
        sortable: false,
        getActions: ({ id, row }) => {
          const userId = user?.attributes?.sub
          const isOwner = userId === row.userId && row.role === OWNER

          return [
            // eslint-disable-next-line react/jsx-key
            <GridActionsCellItem
              icon={<NavigateNextIcon sx={{ opacity: isOwner && 0.5 }} />}
              onClick={() => !isOwner && handleRedirectToProfile(id)}
            />,
          ]
        },
      },
    ],
    [handleRedirectToProfile, t, user]
  )

  return (
    <>
      <DataGrid
        rows={members || []}
        columns={memberColumns}
        disableColumnMenu
        loading={loading}
        autoHeight
        components={{
          LoadingOverlay: CustomLoadingOverlay,
          Pagination: () => (
            <DataGridPagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              isNextActive={isNextActive}
              isBackActive={isBackActive}
            />
          ),
          Toolbar: () => (
            <Box sx={{ p: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <BasicSearchField
                value={searchPhrase}
                handleSearch={handleSearchMembers}
                handleReset={handleResetSearch}
                autoFocus={false}
                inputClassName={classes.searchField}
                variant={'standard'}
              />

              <Button onClick={handleIviteMember} variant="outlined">
                {t('+ Invite')}
              </Button>
            </Box>
          ),
        }}
        sx={{
          bgcolor: '#fff',
          '& .MuiButton-root': { color: '#4B4B4B' },
          '& .MuiButton-root:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' },
        }}
      />
    </>
  )
}

export default memo(Members)
