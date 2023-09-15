import { useNotifications } from 'api/hooks'
import { useCheckUser } from 'hooks/useCheckUser'
import React, { memo } from 'react'

import SystemAlert from './components/SystemAlert'

const SystemAlerts = () => {
  const { user, loading: userLoading } = useCheckUser()
  const userId = user?.attributes?.sub

  const { loading, data } = useNotifications({ variables: { id: userId } })
  const notifications = data?.getUser?.notifications?.items || []

  if (loading || userLoading) return null

  return (
    <>
      {notifications.map((notification) => (
        <React.Fragment key={notification?.id}>
          {notification.isNew && <SystemAlert notification={notification} userId={userId} />}
        </React.Fragment>
      ))}
    </>
  )
}

export default memo(SystemAlerts)
