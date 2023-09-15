import { useUpdateUserNotification } from 'api/hooks'
import { CLAIM, CONNECTED, FOLLOWING, TEXT_SUMMARY } from 'constant'
import React, { memo, useCallback } from 'react'

import ClaimAlert from '../ClaimAlert'
import ConnectAlert from '../ConnectAlert'
import FollowAlert from '../FollowAlert'
import TextSummaryAlert from '../TextSummaryAlert'
import { ClaimBannerWrap } from './styles'

const SystemAlert = ({ notification: { metaData, id, message }, userId }) => {
  const [updateUserNotification] = useUpdateUserNotification()
  const notificationMetaData = JSON.parse(metaData)
  const { type } = notificationMetaData

  const handleUpdateNotification = useCallback(
    (data) =>
      updateUserNotification({
        variables: {
          input: {
            userId,
            id,
            isNew: false,
            ...data,
          },
        },
      }),
    [id, updateUserNotification, userId]
  )

  const notificationProps = {
    message,
    userId: userId,
    notificationId: id,
    handleUpdateNotification,
    companyData: notificationMetaData,
  }

  const renderNotification = () => {
    switch (type) {
      case CLAIM:
        return <ClaimAlert {...notificationProps} />
      case TEXT_SUMMARY:
        return <TextSummaryAlert {...notificationProps} />
      case FOLLOWING:
        return <FollowAlert {...notificationProps} />
      case CONNECTED:
        return <ConnectAlert {...notificationProps} />
    }
  }

  return <ClaimBannerWrap>{renderNotification()}</ClaimBannerWrap>
}

export default memo(SystemAlert)
