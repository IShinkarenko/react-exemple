import HelpIcon from '@mui/icons-material/Help'
import { Box, Button } from '@mui/material'
import { useUpdateCompanyProfile, useUpdateUserNotification } from 'api/hooks'
import clsx from 'clsx'
import { BaseButton, DialogPopUp, EasyEditField } from 'components'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { memo, useCallback, useState } from 'react'

import useStyles from './styles'

const TextSummaryAlert = ({ userId, notificationId, companyData, message }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const {
    query: { companyId },
  } = useRouter()
  const [isOpenDetails, setIsOpenDetails] = useState(false)
  const [textSummary, setTextSummary] = useState(message)

  const [updateCompany] = useUpdateCompanyProfile({
    onCompleted: () => handleUpdateNotification({ metaData: JSON.stringify({ ...companyData, status: 'applied' }) }),
  })
  const [updateUserNotification] = useUpdateUserNotification()

  const handleOpenDetails = useCallback(() => {
    setIsOpenDetails(true)
  }, [])

  const handleDialogClose = useCallback(() => {
    setIsOpenDetails(false)
  }, [])

  const handleSaveDescription = useCallback(({ value }) => {
    setTextSummary(value)
  }, [])

  const handleCancelTextSummary = useCallback(() => {
    handleUpdateNotification()
  }, [handleUpdateNotification])

  const handleApplyTextSummary = useCallback(() => {
    handleUpdateCompany({ description: textSummary })
  }, [handleUpdateCompany, textSummary])

  const handleUpdateCompany = useCallback(
    (newData) => {
      updateCompany({
        variables: {
          input: {
            id: companyId,
            ...newData,
          },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          updateCompany: {
            id: companyId,
            __typename: 'Company',
            ...newData,
          },
        },
      })
    },
    [companyId, updateCompany]
  )

  const handleUpdateNotification = useCallback(
    (data) => {
      updateUserNotification({
        variables: {
          input: {
            userId,
            id: notificationId,
            isNew: false,
            ...data,
          },
        },
      })
    },
    [notificationId, updateUserNotification, userId]
  )

  return (
    <>
      <Box className={classes.summaryContainer}>
        <Box className={classes.summaryText}>
          <EasyEditField
            textfiled
            disableAutoSubmit
            value={textSummary}
            name={'description'}
            className={classes.editField}
            displayCmpClass={classes.displayField}
            handleSave={handleSaveDescription}
          />
        </Box>

        <Box className={classes.summaryButtons}>
          <Button endIcon={<HelpIcon />} className={classes.summaryButton} onClick={handleOpenDetails}>
            {t('Learn More')}
          </Button>

          <Box>
            <BaseButton
              title={t('Cancel')}
              className={classes.summaryButton}
              variant="outlined"
              onClick={handleCancelTextSummary}
            />

            <BaseButton
              title={t('Apply')}
              className={clsx(classes.summaryButton, classes.summaryButtonApply)}
              onClick={handleApplyTextSummary}
            />
          </Box>
        </Box>
      </Box>

      {isOpenDetails && (
        <DialogPopUp
          isOpenModal={isOpenDetails}
          title={t('Suggested Text Summary')}
          description={t(
            'We can write a very brief explanation on why the summary was created (remove background noise from long descriptions) and how it is used inside the Expandigo platform (to show a brief bu insightful overview to users during search, improve visibility, and so on)'
          )}
          closeModal={handleDialogClose}
          cancelTitle={t('Cancel')}
        />
      )}
    </>
  )
}

export default memo(TextSummaryAlert)
