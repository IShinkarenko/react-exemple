import { useUpdateCompanyProfile, useUpdateUserNotification } from 'api/hooks'
import React, { useCallback } from 'react'

import Notification from '../Notification'

const TextSummaryNotification = ({ notification, userId, companyId, handleShowFullNotification }) => {
  const [updateCompany] = useUpdateCompanyProfile({
    onCompleted: () =>
      handleUpdateNotification({
        metaData: JSON.stringify({ ...notificationMetaData, status: 'applied' }),
      }),
  })
  const [updateUserNotification] = useUpdateUserNotification()
  const notificationMetaData = notification && JSON.parse(notification?.metaData)

  const handleApplyTextSummary = () => {
    updateCompany({
      variables: {
        input: {
          id: companyId,
          description: notification?.message,
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateCompany: {
          id: companyId,
          __typename: 'Company',
          description: notification?.message,
        },
      },
    })
  }

  const handleIgnorTextSummary = useCallback(() => {
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

  const textSummaryOptions = [
    {
      title: 'Apply',
      handleClick: handleApplyTextSummary,
    },
    {
      title: 'Ignore',
      handleClick: handleIgnorTextSummary,
    },
  ]

  return (
    <Notification
      {...notification}
      options={textSummaryOptions}
      handleShowFullNotification={handleShowFullNotification}
    />
  )
}

export default TextSummaryNotification
