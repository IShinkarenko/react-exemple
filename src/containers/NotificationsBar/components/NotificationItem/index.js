// eslint-disable-next-line simple-import-sort/sort
import { Box, Skeleton } from '@mui/material'
import { useNotification, usePreferences } from 'api/hooks'
import { CLAIM, DEFAULT_COMPANY, FOLLOWING, CONNECTED, TEXT_SUMMARY } from 'constant'
import { useRouter } from 'next/router'
import React, { memo, useCallback, useMemo } from 'react'
import { getPreferenceId } from 'utils'

import ClaimNotification from '../ClaimNotification'
import ConnectNotification from '../ConnectNotification'
import FollowNotification from '../FollowNotification'
import TextSummaryNotification from '../TextSummaryNotification'

const NotificationItem = ({ id, userId, handleShowFullNotification }) => {
  const {
    query: { companyId },
  } = useRouter()
  const { loading, data } = useNotification({
    variables: { id },
  })
  const { loading: loadingPreferences, data: data_preferences } = usePreferences({
    variables: { id: userId },
  })
  const activeCompanyId = companyId ? companyId : getPreferenceId(data_preferences, DEFAULT_COMPANY)
  const notification = data?.getUserNotification
  const notificationMetaData = notification && JSON.parse(notification?.metaData)
  const type = notificationMetaData?.type

  const notificationPros = useMemo(
    () => ({
      notification,
      userId,
      handleShowFullNotification,
      companyId: activeCompanyId,
    }),
    [activeCompanyId, handleShowFullNotification, notification, userId]
  )

  const renderNotification = useCallback(() => {
    switch (type) {
      case CLAIM:
        return <ClaimNotification {...notificationPros} />
      case FOLLOWING:
        return <FollowNotification {...notificationPros} />
      case CONNECTED:
        return <ConnectNotification {...notificationPros} />
      case TEXT_SUMMARY:
        return <TextSummaryNotification {...notificationPros} />
      default:
        return null
    }
  }, [notificationPros, type])

  if (loading || loadingPreferences)
    return (
      <Box mt={2} mb={2}>
        <Skeleton variant="rectangular" width="100%" height="138px" />
      </Box>
    )

  return renderNotification()
}

export default memo(NotificationItem)
