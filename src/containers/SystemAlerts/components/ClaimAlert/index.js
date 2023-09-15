import { Box, Button, Typography } from '@mui/material'
import { useClaimExistingCompany, useUpdateUserNotification } from 'api/hooks'
import { GET_COMPANIES } from 'api/hooks/queries/useCompanies/useCompanies.gql'
import { DialogPopUp } from 'components'
import PublicCompanyView from 'containers/PublicCompanyView'
import { AlertButtonsContainer, CompanyName } from 'containers/SystemAlerts/styles'
import { useTranslation } from 'next-i18next'
import React, { memo, useCallback, useState } from 'react'
import { toast } from 'react-toastify'

const ClaimAlert = ({ companyData, notificationId, userId }) => {
  const { t } = useTranslation('common')
  const [isPublic, setIsPublic] = useState(false)
  const [isOpenConfirm, setIsOpenConfirm] = useState(false)
  const [updateUserNotification] = useUpdateUserNotification()
  const [claimExistingCompany] = useClaimExistingCompany({
    refetchQueries: [{ query: GET_COMPANIES, variables: { id: userId, limit: 5 } }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      handleDialogClose()
      toast(t('Company is successfully claimed.'))
    },
  })
  const isPublicProfile = companyData?.isLinkToProfile
  const claimedCompanyId = companyData?.companyId

  const handleContinue = useCallback(() => {
    setIsOpenConfirm(true)
  }, [])

  const handleCancel = useCallback(() => {
    handleUpdateNotification()
  }, [handleUpdateNotification])

  const handleDialogClose = useCallback(() => {
    if (isPublic) {
      setIsPublic(false)
    } else {
      setIsOpenConfirm(false)
    }
  }, [isPublic])

  const handleOpenPublicProfile = useCallback(() => {
    setIsPublic(true)
  }, [])

  const handleConfirmClaim = useCallback(() => {
    claimExistingCompany({
      variables: {
        input: {
          userId,
          claimedCompanyId,
        },
      },
    })

    handleUpdateNotification({ metaData: JSON.stringify({ ...companyData, status: 'claimed' }) })
  }, [claimExistingCompany, claimedCompanyId, companyData, handleUpdateNotification, userId])

  const handleUpdateNotification = useCallback(
    (data) =>
      updateUserNotification({
        variables: {
          input: {
            userId,
            id: notificationId,
            isNew: false,
            ...data,
          },
        },
      }),
    [notificationId, updateUserNotification, userId]
  )

  return (
    <>
      <Box>
        <Typography variant="h5" fontWeight={500}>
          {isPublicProfile ? (
            <>
              Possible Match:
              <CompanyName onClick={handleOpenPublicProfile}>{companyData?.name}</CompanyName>
            </>
          ) : (
            <span>Claim {companyData?.name} ?</span>
          )}
        </Typography>

        <Typography variant="body2">
          {isPublicProfile
            ? t('We found an existing company with this domain name, which remains unclaimed.')
            : t('You indicated your desire to claim this company profile')}
        </Typography>
      </Box>

      <AlertButtonsContainer>
        <Button variant="outlined" onClick={handleCancel} size="small" sx={{ textTransform: 'capitalize' }}>
          {t('Cancel')}
        </Button>
        <Button variant="contained" onClick={handleContinue} size="small" sx={{ textTransform: 'capitalize' }}>
          {t('Continue')}
        </Button>
      </AlertButtonsContainer>

      {isPublic && (
        <DialogPopUp isOpenModal={isPublic} closeModal={handleDialogClose} maxWidth={'lg'} isButton>
          <PublicCompanyView companyId={companyData?.companyId} />
        </DialogPopUp>
      )}

      {isOpenConfirm && (
        <DialogPopUp
          isOpenModal={isOpenConfirm}
          title={t('Continue to Claim Company')}
          description={t(
            'You will be unable to edit this company until verification completes. This usually takes up to 3 business days. By confirming below, you agree that you are the rightful owner and reaffirm the Terms and Conditions that apply to your use of the Expandigo application.'
          )}
          closeModal={handleDialogClose}
          dialogActions={
            <AlertButtonsContainer>
              <Button variant="outlined" onClick={handleDialogClose}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleConfirmClaim}>
                Confirm
              </Button>
            </AlertButtonsContainer>
          }
        />
      )}
    </>
  )
}

export default memo(ClaimAlert)
