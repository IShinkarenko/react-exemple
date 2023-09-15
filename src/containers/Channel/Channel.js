import GroupIcon from '@mui/icons-material/Group'
import SettingsIcon from '@mui/icons-material/Settings'
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt'
import { Box, Paper } from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
import { useCompanyChannel, useCompanyChannels, useUpdateCompanyChannel } from 'api/hooks'
import { EasyEditField, PageHead, TabPanel, Tabs } from 'components'
import ChannelDataSummary from 'containers/ChannelDataSummary'
import ChannelSettings from 'containers/ChannelSettings'
import { useAppDispatch, useAppState } from 'hooks/useAppState'
import { isEmpty } from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { toast } from 'react-toastify'

import ChannelConnections from './components/ChannelConnections'
import useStyles from './styles'

const Channel = () => {
  const { t } = useTranslation('channels')
  const classes = useStyles()
  const {
    query: { companyId, channelId },
    asPath,
  } = useRouter()
  const state = useAppState()
  const dispatch = useAppDispatch()
  const [tagsValues, setTagsValues] = useState([])

  const tabs = useMemo(
    () => [
      { title: t('Overview'), icon: <SignalCellularAltIcon /> },
      { title: t('Companies'), icon: <GroupIcon /> },
      { title: t('Settings'), icon: <SettingsIcon /> },
    ],
    [t]
  )

  const { data: data_company } = useCompanyChannels({ variables: { id: companyId } })
  const { loading, data: data_channel } = useCompanyChannel({ variables: { id: channelId } })
  const [updateCompanyChannel] = useUpdateCompanyChannel({
    onCompleted: () => toast('Changes successfully saved!'),
  })

  const channels = data_company?.getCompany?.channels
  const activeChannel = channels?.items.find((channel) => channelId === channel.id)
  const channelTags = data_channel?.getCompanyChannel?.tags
  const isChannelTagsEmpty = isEmpty(channelTags)
  const filteredTabs = isChannelTagsEmpty ? tabs.filter(({ title }) => title === 'Settings') : tabs
  const activeTab = isChannelTagsEmpty ? 0 : state.activeChannelTab

  useEffect(() => {
    if (channelId) {
      dispatch({ type: 'SET_CHANNEL_LINK', payload: asPath })
      dispatch({ type: 'SET_CHANNEL_TAB', payload: 0 })
    }
  }, [channelId, dispatch, asPath])

  useEffect(() => {
    if (channelTags) {
      setTagsValues(channelTags)
    }
  }, [channelTags])

  const updateChannel = useCallback(
    (data) =>
      updateCompanyChannel({
        variables: {
          input: {
            companyId,
            id: channelId,
            ...data,
          },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          updateCompanyChannel: {
            companyId,
            id: channelId,
            __typename: 'CompanyChannel',
            ...data,
          },
        },
      }),

    [companyId, channelId, updateCompanyChannel]
  )

  const handleChange = useCallback(
    (event, newValue) => {
      dispatch({ type: 'SET_CHANNEL_TAB', payload: newValue })
    },
    [dispatch]
  )

  const handleChangeIndex = useCallback(
    (index) => {
      dispatch({ type: 'SET_CHANNEL_TAB', payload: index })
    },
    [dispatch]
  )

  const handleUpdateTags = useCallback(
    ({ name, value }) => {
      updateChannel({ [name]: value })
    },
    [updateChannel]
  )

  const handleFieldSave = useCallback(
    ({ value }) => {
      updateChannel({ name: value })
    },
    [updateChannel]
  )

  return (
    <>
      <PageHead
        title={
          activeChannel ? (
            <Box className={classes.title}>
              <EasyEditField
                name={'name'}
                valuePrefix={'#'}
                value={activeChannel?.name}
                handleSave={handleFieldSave}
                className={classes.editField}
              />
            </Box>
          ) : (
            <Box display="flex" justifyContent="center">
              <Skeleton variant="text" height="40px" width="200px" />
            </Box>
          )
        }
        right={
          <>
            {loading ? (
              <Box display="flex">
                {Array.from(new Array(4)).map((_, index) => (
                  <Box key={index} ml={2}>
                    <Skeleton variant="text" height="50px" width="140px" />
                  </Box>
                ))}
              </Box>
            ) : (
              <Tabs tabs={filteredTabs} activeTab={activeTab} handleChange={handleChange} />
            )}
          </>
        }
      />

      <Box className={classes.channelContainer}>
        {!loading && (
          <>
            {isChannelTagsEmpty ? (
              <SwipeableViews index={0} onChangeIndex={handleChangeIndex}>
                <TabPanel value={0} index={0}>
                  <Paper elevation={1}>
                    <ChannelSettings tags={tagsValues} handleChange={handleUpdateTags} />
                  </Paper>
                </TabPanel>
              </SwipeableViews>
            ) : (
              <SwipeableViews index={state.activeChannelTab} onChangeIndex={handleChangeIndex}>
                <TabPanel value={state.activeChannelTab} index={0} sx={{ height: '100%' }}>
                  <ChannelDataSummary />
                </TabPanel>

                <TabPanel value={state.activeChannelTab} index={1}>
                  <ChannelConnections tags={tagsValues} />
                </TabPanel>

                <TabPanel value={state.activeChannelTab} index={2}>
                  <ChannelSettings tags={tagsValues} handleChange={handleUpdateTags} />
                </TabPanel>
              </SwipeableViews>
            )}
          </>
        )}
      </Box>
    </>
  )
}

export default Channel
