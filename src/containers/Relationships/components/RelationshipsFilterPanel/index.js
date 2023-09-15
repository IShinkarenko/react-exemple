/* eslint-disable no-unused-vars */
import ClearAllIcon from '@mui/icons-material/ClearAll'
import FilterListIcon from '@mui/icons-material/FilterList'
import { Badge, Box, Button, IconButton, Tooltip, Typography } from '@mui/material'
import { useCompanyDefinitions } from 'api/hooks'
import { DropDownMenu, SearchSelect } from 'components'
import { RELATIONSHIP_SOURCE, RELATIONSHIP_STANDARD_TAG, RELATIONSHIP_TYPE } from 'constant'
import { isEmpty } from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { getDefinitionsByType } from 'utils'

import useStyles from './styles'

const initialFilter = {
  types: [],
  sources: [],
  standardTags: [],
}

const RelationshipsFilterPanel = ({ filter, dispatch, handleResetTokensOnFilter }) => {
  const classes = useStyles()
  const { t } = useTranslation('relationships')
  const {
    query: { companyId },
  } = useRouter()
  const { searchPhrase, ...rest } = filter
  const [anchorEl, setAnchorEl] = useState(null)
  const [bufferFilter, setBufferFilter] = useState(rest)

  const { data } = useCompanyDefinitions({
    variables: { id: companyId },
  })

  const definitions = data?.getCompany?.definitions?.items
  const appliedFilters = Object.entries(rest).filter(([key, value]) =>
    Array.isArray(value) ? !isEmpty(value) : value
  ).length

  const handleShowFilters = useCallback((event) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const handleClose = useCallback(() => {
    setAnchorEl(null)
    setBufferFilter(rest)
  }, [rest])

  const handleChangeSelect = useCallback(({ name, value }) => {
    setBufferFilter((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleApplyFilters = useCallback(() => {
    handleResetTokensOnFilter()
    dispatch({ type: 'SET_FILTER', payload: bufferFilter })
    handleClose()
  }, [bufferFilter, dispatch, handleClose, handleResetTokensOnFilter])

  const handleClearFilter = useCallback(() => {
    setBufferFilter(initialFilter)
  }, [])

  return (
    <>
      <Button
        variant="text"
        onClick={handleShowFilters}
        startIcon={
          <Badge badgeContent={appliedFilters} color="primary">
            <FilterListIcon />
          </Badge>
        }
        sx={{ p: '4px 5px', fontSize: '0.8125rem' }}
      >
        Filters
      </Button>

      <DropDownMenu anchorEl={anchorEl} handleClose={handleClose} horizontal={'left'}>
        <Box className={classes.filters}>
          <Button
            onClick={handleClearFilter}
            startIcon={
              <Tooltip title="Clear All">
                <ClearAllIcon fontSize="small" />
              </Tooltip>
            }
            ariant="text"
            sx={{ minWidth: 'unset', '& .MuiButton-startIcon': { m: 0 } }}
          >
            <span className={classes.clearAllBtnLabel}>Clear All</span>
          </Button>
          <SearchSelect
            name={'types'}
            value={bufferFilter.types}
            label={t('Type')}
            placeholder={t('Choose Type')}
            options={getDefinitionsByType(definitions, RELATIONSHIP_TYPE)}
            size="small"
            handleChange={handleChangeSelect}
          />
          <SearchSelect
            name={'sources'}
            value={bufferFilter.sources}
            label={t('Source')}
            placeholder={t('Choose Source')}
            options={getDefinitionsByType(definitions, RELATIONSHIP_SOURCE)}
            size="small"
            handleChange={handleChangeSelect}
          />
          <SearchSelect
            name={'standardTags'}
            value={bufferFilter.standardTags}
            label={t('Tags')}
            placeholder={t('Choose Tags')}
            options={getDefinitionsByType(definitions, RELATIONSHIP_STANDARD_TAG)}
            size="small"
            handleChange={handleChangeSelect}
          />
          <Button onClick={handleApplyFilters}>Apply</Button>
        </Box>
      </DropDownMenu>
    </>
  )
}

export default memo(RelationshipsFilterPanel)
