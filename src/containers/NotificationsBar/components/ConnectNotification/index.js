import { useUpdateUserNotification } from 'api/hooks'
import EngageCompanyInterface from 'containers/Relationship/components/EngageCompanyInterface'
import { useCheckUser } from 'hooks/useCheckUser'
import React, { useCallback, useMemo, useState } from 'react'

import Notification from '../Notification'

const ConnectNotification = ({ notification, userId, handleShowFullNotification }) => {
  const { user } = useCheckUser()
  const [openConnectOptions, setOpenConnectOptions] = useState(false)
  const notificationMetaData = notification && JSON.parse(notification?.metaData)

  const [updateUserNotification] = useUpdateUserNotification()

  const handleIgnorConnect = useCallback(() => {
    handleUpdateNotification({ metaData: JSON.stringify({ ...notificationMetaData, status: 'ignored' }) })
  }, [handleUpdateNotification, notificationMetaData])

  const handleUpdateNotification = useCallback(
    (data) => {
      updateUserNotification({
        variables: {
          input: {
            id: notification?.id,
            userId,
            isNew: false,
            ...data,
          },
        },
      })
    },
    [notification?.id, updateUserNotification, userId]
  )

  const handleOpenConfirmConnecting = useCallback(() => {
    setOpenConnectOptions(true)
  }, [])

  const handleCloseEngagementOptions = useCallback(() => {
    setOpenConnectOptions(false)
  }, [])

  const connectOptions = useMemo(
    () => [
      {
        title: 'Connect',
        handleClick: handleOpenConfirmConnecting,
      },
      {
        title: 'Ignore',
        handleClick: handleIgnorConnect,
      },
    ],
    [handleIgnorConnect, handleOpenConfirmConnecting]
  )

  return (
    <>
      <Notification
        {...notification}
        options={connectOptions}
        handleShowFullNotification={handleShowFullNotification}
      />

      {openConnectOptions && (
        <EngageCompanyInterface
          isUserAutorized={user}
          selectedCompanyId={notificationMetaData?.companyId}
          selectedStatus={notificationMetaData?.type}
          handleCloseEngagementOptions={handleCloseEngagementOptions}
        />
      )}
    </>
  )
}

export default ConnectNotification
