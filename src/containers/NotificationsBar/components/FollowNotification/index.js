import { useUpdateUserNotification } from 'api/hooks'
import EngageCompanyInterface from 'containers/Relationship/components/EngageCompanyInterface'
import { useCheckUser } from 'hooks/useCheckUser'
import React, { useCallback, useMemo, useState } from 'react'

import Notification from '../Notification'

const FollowNotification = ({ notification, userId, handleShowFullNotification }) => {
  const { user } = useCheckUser()
  const [openFollowOptions, setOpenFollowOptions] = useState(false)
  const notificationMetaData = notification && JSON.parse(notification?.metaData)

  const [updateUserNotification] = useUpdateUserNotification()

  const handleIgnorFollow = useCallback(() => {
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

  const handleOpenConfirmFollowing = useCallback(() => {
    setOpenFollowOptions(true)
  }, [])

  const handleCloseEngagementOptions = useCallback(() => {
    setOpenFollowOptions(false)
  }, [])

  const followOptions = useMemo(
    () => [
      {
        title: 'Follow',
        handleClick: handleOpenConfirmFollowing,
      },
      {
        title: 'Ignore',
        handleClick: handleIgnorFollow,
      },
    ],
    [handleIgnorFollow, handleOpenConfirmFollowing]
  )

  return (
    <>
      <Notification {...notification} options={followOptions} handleShowFullNotification={handleShowFullNotification} />

      {openFollowOptions && (
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

export default FollowNotification
