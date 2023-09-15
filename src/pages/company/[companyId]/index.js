import { Paper } from '@mui/material'
import { useCompanyChannels, usePreferences } from 'api/hooks'
import { NoChannels, PageLoader } from 'components'
import { DEFAULT_CHANNEL } from 'constant'
import { useAppDispatch, useAppState } from 'hooks/useAppState'
import { find, isEmpty } from 'lodash'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect } from 'react'
import routes from 'routes'
import { getPreferenceId } from 'utils'

import useStyles from './styles'

const CompanyPage = () => {
  const classes = useStyles()
  const router = useRouter()
  const {
    query: { companyId },
  } = useRouter()
  const state = useAppState()
  const dispatch = useAppDispatch()
  const userId = state?.user?.attributes?.sub

  const { loading: preferenceLoading, data: data_preferences } = usePreferences({ variables: { id: userId } })
  const { loading: channelsLoading, data: data_channels } = useCompanyChannels({ variables: { id: companyId } })

  const channels = data_channels?.getCompany?.channels?.items
  const defaultChannelId = getPreferenceId(data_preferences, DEFAULT_CHANNEL)
  const channelId = isEmpty(channels) ? '' : isDefaultChannel ? isDefaultChannel.id : channels[0].id
  const isDefaultChannel = find(channels, ['id', defaultChannelId])

  useEffect(() => {
    if (channelId) {
      redirectToCompanyWithChannel()
    }
  }, [channelId, redirectToCompanyWithChannel])

  const redirectToCompanyWithChannel = useCallback(() => {
    dispatch({ type: 'SET_CHANNEL_LINK', payload: `/company/${companyId}/channel/${channelId}` })

    router.push({
      pathname: routes.companyChannel,
      query: { companyId, channelId },
    })
  }, [companyId, channelId, dispatch, router])

  if (preferenceLoading || channelsLoading) return <PageLoader />

  if (!channelId)
    return (
      <Paper elevation={1} className={classes.companyContainer}>
        <NoChannels />
      </Paper>
    )

  return null
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['companyProfile', 'companyMenu', 'accountMenu'])),
  },
})

export default CompanyPage
