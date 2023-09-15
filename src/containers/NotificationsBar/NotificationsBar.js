import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import { Box, IconButton, Skeleton, Tooltip } from '@mui/material'
import { useNotification, useNotifications } from 'api/hooks'
import { useAppState } from 'hooks/useAppState'
import React, { useCallback, useState } from 'react'

import FullNotification from './components/FullNotification'
import NotificationItem from './components/NotificationItem'
import NotificationsContainer from './components/NotificationsContainer'
import useStyles from './styles'

const NotificationsBar = () => {
  const classes = useStyles()
  const {
    user: {
      attributes: { sub: userId },
    },
  } = useAppState()
  const [notificationId, setNotificationId] = useState(null)

  const { loading, data } = useNotifications({ skip: !userId, variables: { id: userId, limit: 50 } })
  const { data: data_notification } = useNotification({
    skip: !notificationId,
    variables: { id: notificationId },
  })
  const notificationsData = data?.getUser?.notifications
  const notifications = notificationsData?.items
  const nextToken = notificationsData?.nextToken
  const newMsg = notifications && notifications.filter(({ isNew }) => !!isNew)
  const msgLength = newMsg && newMsg.length
  const fullNotification = data_notification?.getUserNotification

  const handleShowFullNotification = useCallback((id) => {
    setNotificationId(id)
  }, [])

  const handleCloseFullNotification = useCallback(() => {
    setNotificationId(null)
  }, [])

  if (loading) return <Skeleton variant="circular" className={classes.circle} />

  return (
    <NotificationsContainer
      count={msgLength}
      fullNotification={fullNotification}
      handleCloseFullNotification={handleCloseFullNotification}
    >
      {fullNotification ? (
        <FullNotification {...fullNotification} />
      ) : (
        <>
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              id={notification.id}
              userId={userId}
              handleShowFullNotification={handleShowFullNotification}
            />
          ))}

          {nextToken && (
            <Box display="flex" justifyContent="center" mt={1}>
              <Tooltip title={'Load More'}>
                <IconButton variant="outlined" size="large">
                  <DoubleArrowIcon className={classes.loadMore} />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </>
      )}
    </NotificationsContainer>
  )
}

export default NotificationsBar
