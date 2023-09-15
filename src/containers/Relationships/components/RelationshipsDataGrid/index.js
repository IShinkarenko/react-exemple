/* eslint-disable no-unused-vars */
import { useLazyQuery } from '@apollo/client'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import { GET_COMPANY_RELATIONSHIPS } from 'api/hooks/queries/useCompanyRealtionships/useCompanyRealtionships.gql'
import { Badge, CustomLoadingOverlay, DataGridPagination } from 'components'
import { CONNECTED, NOT_FOUND } from 'constant'
import { generateLocation, getTypesValue } from 'containers/Relationships/utils'
import { isEmpty } from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { memo, useCallback, useEffect, useMemo } from 'react'
import routes from 'routes'

import RelationshipsToolbar from '../RelationshipsToolbar'

const RelationshipsDataGrid = ({ definitions, state, dispatch }) => {
  const { t } = useTranslation('relationships')
  const router = useRouter()
  const {
    query: { companyId },
  } = router
  const { filter, selectionModel, nextToken, nextNextToken, previousTokens } = state
  const { searchPhrase, types, sources, standardTags } = filter

  const [getRealtionships, { loading, data }] = useLazyQuery(GET_COMPANY_RELATIONSHIPS, {
    onCompleted: ({ getCompany: { relationships } }) =>
      dispatch({ type: 'SET_NEXT_NEXT_TOKEN', payload: relationships?.nextToken }),
    fetchPolicy: 'cache-and-network',
  })

  const relationshipsData = data?.getCompany?.relationships
  const relationships = relationshipsData?.items
  const relationshipsLength = relationships?.length
  const isNextActive = !nextNextToken
  const isBackActive = isEmpty(previousTokens)
  const isFiltered = !isEmpty(types) || !isEmpty(sources) || !isEmpty(standardTags) || searchPhrase

  useEffect(() => {
    getRealtionships({
      variables: {
        id: companyId,
        nextToken,
        filter: isFiltered
          ? {
              types,
              sources,
              standardTags,
              ...(searchPhrase && { searchPhrase: searchPhrase.toLowerCase() }),
            }
          : null,
      },
    })
  }, [companyId, getRealtionships, isFiltered, nextToken, searchPhrase, sources, standardTags, types])

  const handleNext = useCallback(() => {
    dispatch({ type: 'SET_PREVIOUS_TOKENS', payload: [...previousTokens, nextToken] })
    dispatch({ type: 'SET_NEXT_TOKEN', payload: nextNextToken })
    dispatch({ type: 'SET_NEXT_NEXT_TOKEN', payload: null })
  }, [dispatch, nextNextToken, nextToken, previousTokens])

  const handlePrev = useCallback(() => {
    dispatch({ type: 'SET_NEXT_TOKEN', payload: previousTokens.pop() })
    dispatch({ type: 'SET_PREVIOUS_TOKENS', payload: [...previousTokens] })
    dispatch({ type: 'SET_NEXT_NEXT_TOKEN', payload: null })
  }, [dispatch, previousTokens])

  const handleResetTokensOnFilter = useCallback(() => {
    if (!isEmpty(previousTokens)) {
      dispatch({ type: 'SET_NEXT_TOKEN', payload: previousTokens[0] })
      dispatch({ type: 'SET_PREVIOUS_TOKENS', payload: [] })
    }
  }, [dispatch, previousTokens])

  const handleRedirecttoProfile = useCallback(
    (relationshipId) => {
      router.push({
        pathname: routes.companyRelationship,
        query: { companyId, relationshipId },
      })
    },
    [companyId, router]
  )

  const handleSelectionChange = useCallback(
    (newSelectionModel) => {
      dispatch({ type: 'SET_SELECTION_MODEL', payload: newSelectionModel })
    },
    [dispatch]
  )

  const relationshipColumns = useMemo(
    () => [
      { field: 'name', headerName: t('Name'), flex: 1, sortable: false },
      {
        field: 'location',
        headerName: t('Location'),
        sortable: false,
        flex: 1,
        renderCell: ({ row }) => {
          return generateLocation(row)
        },
      },
      {
        field: 'type',
        headerName: t('Type'),
        sortable: false,
        flex: 0.7,
        renderCell: ({ row }) => {
          return getTypesValue(definitions, row.types)
        },
      },

      {
        field: 'status',
        headerName: t('Status'),
        sortable: false,

        renderCell: ({ row }) => {
          return <Badge status={row.expandigoCompanyId ? CONNECTED : NOT_FOUND} />
        },
      },
      {
        field: 'id',
        type: 'actions',
        width: 70,
        sortable: false,
        getActions: (params) => [
          // eslint-disable-next-line react/jsx-key
          <GridActionsCellItem icon={<NavigateNextIcon />} onClick={() => handleRedirecttoProfile(params.id)} />,
        ],
      },
    ],
    [definitions, handleRedirecttoProfile, t]
  )

  return (
    <>
      <DataGrid
        rows={relationships || []}
        columns={relationshipColumns}
        checkboxSelection
        disableColumnMenu
        loading={loading}
        autoHeight
        selectionModel={selectionModel}
        onSelectionModelChange={handleSelectionChange}
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
            <RelationshipsToolbar
              dispatch={dispatch}
              state={state}
              handleResetTokensOnFilter={handleResetTokensOnFilter}
              relationshipsLength={relationshipsLength}
            />
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

export default memo(RelationshipsDataGrid)
