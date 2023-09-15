import { Box, Button, Typography } from '@mui/material'
import { DialogPopUp } from 'components'
import PublicCompanyView from 'containers/PublicCompanyView'
import EngageCompanyInterface from 'containers/Relationship/components/EngageCompanyInterface'
import { AlertButtonsContainer, CompanyName } from 'containers/SystemAlerts/styles'
import { useCheckUser } from 'hooks/useCheckUser'
import { useTranslation } from 'next-i18next'
import React, { useCallback, useState } from 'react'

const ConnectAlert = ({ companyData, handleUpdateNotification }) => {
  const { t } = useTranslation('common')
  const { user } = useCheckUser()
  const [isPublic, setIsPublic] = useState(false)
  const [openConnectOptions, setOpenConnectOptions] = useState(false)

  const handleOpenProfile = useCallback(() => {
    setIsPublic(true)
  }, [])

  const handleCancel = useCallback(() => {
    handleUpdateNotification()
  }, [handleUpdateNotification])

  const handleContinue = useCallback(() => {
    setOpenConnectOptions(true)
  }, [])

  const handleCloseEngagementOptions = useCallback(() => {
    setOpenConnectOptions(false)
  }, [])

  const handleDialogClose = useCallback(() => {
    setIsPublic(false)
  }, [])

  const handleCompleted = useCallback(() => {
    handleUpdateNotification({ metaData: JSON.stringify({ ...companyData, status: 'applied' }) })
  }, [companyData, handleUpdateNotification])

  return (
    <>
      <Box>
        <Typography variant="h5" fontWeight={500}>
          Connect With <CompanyName onClick={handleOpenProfile}>{companyData?.name}</CompanyName> ?
        </Typography>
        <Typography variant="body2">You indicated your desire to connect with this company</Typography>
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

      {openConnectOptions && (
        <EngageCompanyInterface
          isUserAutorized={user}
          selectedCompanyId={companyData?.companyId}
          selectedStatus={companyData?.type}
          handleCompleted={handleCompleted}
          handleCloseEngagementOptions={handleCloseEngagementOptions}
        />
      )}
    </>
  )
}

export default ConnectAlert
