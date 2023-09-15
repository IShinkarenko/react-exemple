import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ReorderIcon from '@mui/icons-material/Reorder'
import { Box, Button, Skeleton, useMediaQuery } from '@mui/material'
import { useCompanyProfileSection } from 'api/hooks'
import { DialogPopUp, OptionsMenu } from 'components'
import { useTranslation } from 'next-i18next'
import React, { useCallback, useState } from 'react'

import AddNewSection from '../AddNewSection'
import CompanySectionsOrdering from '../CompanySectionsOrdering'
import VisibilitySectionIndicator from '../VisibilitySectionIndicator'
import useStyles from './styles'

const SummarySectionData = ({ activeSectionId, profileSections, handleUpdateSection, handleDeleteSection }) => {
  const { t } = useTranslation('companyProfile')
  const classes = useStyles()

  const matches = useMediaQuery('(max-width:767px)')
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isOpenOrderingUI, setIsOpenOrderingUI] = useState(false)

  const { loading, data } = useCompanyProfileSection({ variables: { id: activeSectionId } })
  const profileSection = data?.getCompanyProfileSection

  const handleOpenEditSectionForm = useCallback(() => {
    setIsEditOpen(true)
  }, [])

  const handleOpenDeleteSection = useCallback(() => {
    setIsDeleteOpen(true)
  }, [])

  const handleDialogClose = useCallback(() => {
    if (isEditOpen) {
      return setIsEditOpen(false)
    }
    if (isDeleteOpen) {
      return setIsDeleteOpen(false)
    }
  }, [isDeleteOpen, isEditOpen])

  const handleDeleteSectionOnAccept = useCallback(() => {
    handleDeleteSection()
    handleDialogClose()
  }, [handleDeleteSection, handleDialogClose])

  const handleToggleOrderingUI = (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setIsOpenOrderingUI((prev) => !prev)
  }

  const profileSectionOptions = [
    {
      title: t('Edit'),
      icon: <EditIcon />,
      handleClick: handleOpenEditSectionForm,
    },
    {
      title: t('Delete'),
      icon: <DeleteIcon />,
      handleClick: handleOpenDeleteSection,
    },
    {
      title: t('Order'),
      icon: <ReorderIcon />,
      handleClick: handleToggleOrderingUI,
    },
  ]

  return (
    <>
      <Box className={classes.profileSectionSummary}>
        <Box className={classes.profileSectionSummaryBlock}>
          <Box className={classes.profileSectionSummaryItem}>
            <Box className={classes.profileSectionSummaryItemName}>{t('Visibility')}:</Box>
            {loading ? (
              <Skeleton variant="text" height="30px" width={'70px'} />
            ) : (
              <VisibilitySectionIndicator visibilityLevel={profileSection?.visibilityLevel} />
            )}
          </Box>

          <Box className={classes.profileSectionSummaryItem}>
            <Box className={classes.profileSectionSummaryItemName}>{t('Type')}:</Box>
            <Box>
              {loading ? <Skeleton variant="text" height="30px" width={'70px'} /> : profileSection?.profileSectionType}
            </Box>
          </Box>
        </Box>

        <Box className={classes.profileSectionSummaryBlock}>
          {matches ? (
            <OptionsMenu actions={profileSectionOptions} buttonClassName={classes.searchResultOptions} />
          ) : (
            profileSectionOptions.map(({ title, icon, handleClick }) => (
              <Button
                key={title}
                size="small"
                color="primary"
                startIcon={icon}
                variant="outlined"
                onClick={handleClick}
                className={classes.profileSectionButton}
              >
                {title}
              </Button>
            ))
          )}
        </Box>
      </Box>

      <DialogPopUp isOpenModal={isEditOpen} title={t('Edit')} closeModal={handleDialogClose} maxWidth="xs">
        <AddNewSection
          profileSections={profileSection}
          handleDialogClose={handleDialogClose}
          editMode
          handleUpdateSection={handleUpdateSection}
        />
      </DialogPopUp>

      <DialogPopUp
        isOpenModal={isDeleteOpen}
        title={t('Delete Section?')}
        description={t('Are you sure you want to delete section?')}
        cancelTitle={t('Cancel')}
        successTitle={t('Delete')}
        handleAccept={handleDeleteSectionOnAccept}
        closeModal={handleDialogClose}
        maxWidth="xs"
      />

      {isOpenOrderingUI && (
        <CompanySectionsOrdering
          isOpen={isOpenOrderingUI}
          orderList={profileSections}
          handleToggleDrawer={handleToggleOrderingUI}
          handleUpdate={handleUpdateSection}
        />
      )}
    </>
  )
}

export default SummarySectionData
