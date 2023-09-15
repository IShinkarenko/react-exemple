import { useClaimExistingCompany, useUpdateUserNotification } from 'api/hooks'
import { GET_COMPANIES } from 'api/hooks/queries/useCompanies/useCompanies.gql'
import { BaseButton, DialogPopUp } from 'components'
import React, { memo, useCallback, useState } from 'react'

import Notification from './../Notification'

const ClaimNotification = ({ notification, userId, handleShowFullNotification }) => {
  const [isOpen, setIsOpen] = useState(false)
  const notificationMetaData = notification && JSON.parse(notification?.metaData)

  const [updateUserNotification] = useUpdateUserNotification({ onCompleted: () => handleDialogClose() })
  const [claimExistingCompany] = useClaimExistingCompany({
    refetchQueries: [{ query: GET_COMPANIES, variables: { id: userId, limit: 5 } }],
    awaitRefetchQueries: true,
    onCompleted: () =>
      handleUpdateNotification({
        metaData: JSON.stringify({ ...notificationMetaData, status: 'claimed' }),
      }),
  })

  const handleDialogClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleOpenConfirmClaim = useCallback(() => {
    setIsOpen(true)
  }, [])

  const handleIgnorClaim = useCallback(() => {
    handleUpdateNotification({ metaData: JSON.stringify({ ...notificationMetaData, status: 'ignored' }) })
  }, [handleUpdateNotification, notificationMetaData])

  const handleConfirmClaim = useCallback(() => {
    claimExistingCompany({
      variables: {
        input: {
          userId,
          claimedCompanyId: notificationMetaData?.companyId,
        },
      },
    })
  }, [claimExistingCompany, notificationMetaData, userId])

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

  const claimOptions = [
    {
      title: 'Confirm',
      handleClick: handleOpenConfirmClaim,
    },
    {
      title: 'Ignore',
      handleClick: handleIgnorClaim,
    },
  ]
  return (
    <>
      <Notification {...notification} options={claimOptions} handleShowFullNotification={handleShowFullNotification} />

      <DialogPopUp
        isOpenModal={isOpen}
        title={'Continue to Claim Company'}
        description={
          'You will be unable to edit this company until verification completes. This usually takes up to 3 business days. By confirming below, you agree that you are the rightful owner and reaffirm the Terms and Conditions that apply to your use of the Expandigo application.'
        }
        closeModal={handleDialogClose}
        dialogActions={
          <>
            <BaseButton title={'Cancel'} variant="outlined" onClick={handleDialogClose} />
            <BaseButton title={'Confirm'} onClick={handleConfirmClaim} />
          </>
        }
      />
    </>
  )
}

export default memo(ClaimNotification)
