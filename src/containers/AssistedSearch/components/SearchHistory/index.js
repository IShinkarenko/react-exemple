import { useLazyQuery } from '@apollo/client'
import { Box, List, Paper } from '@mui/material'
import { useCompanyChannels, useCompanySearches, useCreateCompanyChannel } from 'api/hooks'
import { GET_COMPANY_CHANNELS } from 'api/hooks/queries/useCompanyChannels/useCompanyChannels.gql'
import { GET_COMPANY_SEARCH } from 'api/hooks/queries/useCompanySearch/useCompanySearch.gql'
import { BaseButton, DialogPopUp, Input, SearchHistoryItem } from 'components'
import { TRADITIONAL_SEARCH, WIZZARD_SEARCH } from 'constant'
import { Field, Form, Formik } from 'formik'
import { isEmpty } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { omitTypenameInArr } from 'utils'

import useStyles from './styles'

const History = ({ state, dispatch }) => {
  const { t } = useTranslation('assistedResearch')

  const classes = useStyles()
  const {
    query: { companyId },
  } = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const { data } = useCompanySearches({ skip: !companyId, variables: { id: companyId } })
  const searches = data?.getCompany?.searches?.items
  const sortedSearches = searches && searches.slice().sort((a, b) => b.modificationTimestamp - a.modificationTimestamp)
  const [createCompanyChannel] = useCreateCompanyChannel({
    refetchQueries: [{ query: GET_COMPANY_CHANNELS, variables: { id: companyId } }],
    awaitRefetchQueries: true,
  })
  const { data: data_channels } = useCompanyChannels({
    variables: { id: companyId },
  })
  const [getSearchItem, { loading: searchItemLoading, data: searchItemData }] = useLazyQuery(GET_COMPANY_SEARCH)
  const historyTags = searchItemData && omitTypenameInArr(searchItemData?.getCompanySearch?.tags)
  const historyText = searchItemData && searchItemData?.getCompanySearch?.text
  const newOrderIndex = data_channels?.getCompany?.channels?.items.length + 1

  useEffect(() => {
    if (!searchItemLoading && !isEmpty(historyTags)) {
      dispatch({ type: 'SET_TAGS', payload: historyTags })
      dispatch({ type: 'SET_SEARCH_TYPE', payload: WIZZARD_SEARCH })
      dispatch({ type: 'SET_ACTIVE_TAB', payload: 0 })
      dispatch({ type: 'SET_RESULTS', payload: true })
    }
  }, [dispatch, historyTags, searchItemData, searchItemLoading])

  useEffect(() => {
    if (!searchItemLoading && historyText) {
      dispatch({ type: 'SET_TEXT', payload: historyText })
      dispatch({ type: 'SET_SEARCH_TYPE', payload: TRADITIONAL_SEARCH })
      dispatch({ type: 'SET_ACTIVE_TAB', payload: 0 })
      dispatch({ type: 'SET_RESULTS', payload: true })
      dispatch({ type: 'SET_EXPANDED', payload: false })
    }
  }, [dispatch, historyText, searchItemData, searchItemLoading])

  const handleSearchAgain = useCallback(
    (searchId) => {
      dispatch({ type: 'SET_SEARCH_ID', payload: searchId })

      getSearchItem({
        variables: { id: searchId },
      })
    },
    [dispatch, getSearchItem]
  )

  const handleDialogOpen = useCallback(
    ({ tags }) => {
      setIsOpen(true)

      const channelTags = omitTypenameInArr(tags)
      dispatch({ type: 'SET_CHANNEL_TAGS', payload: channelTags })
    },
    [dispatch]
  )

  const handleDialogClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleSubmit = useCallback(
    ({ name }) => {
      handleConvertSearchToChannel({ name })
      handleDialogClose()
    },
    [handleConvertSearchToChannel, handleDialogClose]
  )

  const handleConvertSearchToChannel = useCallback(
    ({ name }) => {
      createCompanyChannel({
        variables: {
          input: {
            name,
            companyId,
            tags: state.channelTags,
            orderIndex: newOrderIndex,
            instanceStatus: 'Included',
          },
        },
      })
    },
    [companyId, createCompanyChannel, newOrderIndex, state.channelTags]
  )

  return (
    <>
      <Paper>
        {searches && (
          <List className={classes.historyList}>
            {sortedSearches.map((searchItem) => (
              <SearchHistoryItem
                key={searchItem.id}
                item={searchItem}
                handleSearchAgain={handleSearchAgain}
                handleDialogOpen={handleDialogOpen}
              />
            ))}
          </List>
        )}
      </Paper>

      <DialogPopUp isOpenModal={isOpen} title={t('Conver to Channel')} closeModal={handleDialogClose} maxWidth={'xs'}>
        <Formik initialValues={{ name: '' }} onSubmit={handleSubmit}>
          {() => (
            <Form>
              <Field name="name" label={t('Enter Channel Name')} component={Input} />

              <Box mt={4} display="flex" justifyContent="flex-end">
                <BaseButton title={t('Cancel ')} onClick={handleDialogClose} variant="outlined" />

                <BaseButton title={t('Confirm')} variant="contained" type="submit" />
              </Box>
            </Form>
          )}
        </Formik>
      </DialogPopUp>
    </>
  )
}

export default History
