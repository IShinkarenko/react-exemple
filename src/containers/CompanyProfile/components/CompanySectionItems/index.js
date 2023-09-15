import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ReorderIcon from '@mui/icons-material/Reorder'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { useDeleteProfileSectionItem, useUpdateProfileSectionItem } from 'api/hooks'
import { useCompanyProfileSectionItems } from 'api/hooks/queries/useCompanyProfileSectionItems'
import { DialogPopUp, SectionLoader, TabPanel } from 'components'
import {
  CUSTOM,
  DELETE_SECTION_ITEM,
  itemTypes,
  KEY_CONTACT,
  NEW_SECTION,
  sectionItemsUI,
} from 'containers/CompanyProfile/constants'
import { updateProfileSectionItemOrderCache } from 'libs/cache/updateProfileSectionItemOrderCache'
import { isEmpty } from 'lodash'
import { useTranslation } from 'next-i18next'
import React, { useCallback, useMemo, useState } from 'react'

import AddCustomItemType from '../AddCustomItemType'
import AddKeyContact from '../AddKeyContact'
import AddNewItemType from '../AddNewItemType'
import AddNewSection from '../AddNewSection'
import CompanySectionsOrdering from '../CompanySectionsOrdering'
import SpeedDialActions from '../SpeedDialActions'
import useStyles from './styles'

const CompanySectionItems = ({ activeTab, index, sectionId, profileSectionType }) => {
  const { t } = useTranslation('companyProfile')
  const classes = useStyles()

  const [isOpen, setIsOpen] = useState(false)
  const [sectionItemId, setSectionItemId] = useState()
  const [sectionItemInterface, setSectionItemInterface] = useState()
  const [isOpenOrderingUI, setIsOpenOrderingUI] = useState()

  const { loading, data } = useCompanyProfileSectionItems({ variables: { id: sectionId } })

  const [updateProfileSectionItem] = useUpdateProfileSectionItem()
  const [deleteProfileSectionItem] = useDeleteProfileSectionItem()

  const sectionItems = data?.getCompanyProfileSection?.items?.items
  const isNotDelete = sectionItemInterface !== DELETE_SECTION_ITEM

  const handleDialogClose = useCallback(() => {
    setIsOpen(false)
    if (sectionItemId) setSectionItemId(null)
  }, [sectionItemId])

  const handleAddEditSectionItem = useCallback(
    ({ sectionItemType, id }) => {
      switch (sectionItemType) {
        case KEY_CONTACT:
          return handleOpenSectionItemInterface(KEY_CONTACT, id)
        case CUSTOM:
          return handleOpenSectionItemInterface(CUSTOM, id)
        default:
          return handleOpenSectionItemInterface(sectionItemType, id)
      }
    },
    [handleOpenSectionItemInterface]
  )

  const handleOpenSectionItemInterface = useCallback(
    (type, id) => {
      if (id) {
        setSectionItemId(id)
      }

      setSectionItemInterface(type)
      setIsOpen(!isOpen)
    },
    [isOpen]
  )

  const handleToggleOrderingUI = useCallback((event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setIsOpenOrderingUI((prev) => !prev)
  }, [])

  const handleOpenDeleteConfirmation = useCallback(
    ({ id }) => {
      handleOpenSectionItemInterface(DELETE_SECTION_ITEM, id)
    },
    [handleOpenSectionItemInterface]
  )

  const formProps = useMemo(
    () => ({
      type: sectionItemInterface,
      sectionId,
      sectionItemId,
      handleDialogClose,
    }),
    [handleDialogClose, sectionId, sectionItemId, sectionItemInterface]
  )

  const renderSectionItemInterface = useCallback(() => {
    switch (sectionItemInterface) {
      case KEY_CONTACT:
        return <AddKeyContact {...formProps} />
      case CUSTOM:
        return <AddCustomItemType {...formProps} />
      case NEW_SECTION:
        return <AddNewSection {...formProps} />
      default:
        return <AddNewItemType {...formProps} />
    }
  }, [formProps, sectionItemInterface])

  const renderTitle = useCallback(() => {
    switch (sectionItemInterface) {
      case NEW_SECTION:
        return t('Add New Section')
      case DELETE_SECTION_ITEM:
        return t('Delete Section Item')
      default:
        return t(`${itemTypes[sectionItemInterface]}`)
    }
  }, [sectionItemInterface, t])

  const handleUpdateSectionItemOrder = useCallback(
    (data, sectionItems, result) => {
      const companyProfileSectionId = sectionId

      updateProfileSectionItem({
        variables: {
          input: { companyProfileSectionId, id: data.id, ...data },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          updateProfileSectionItem: {
            companyProfileSectionId,
            id: data.id,
            __typename: 'ProfileSectionItem',
            ...data,
          },
        },
        update: (cache) => updateProfileSectionItemOrderCache({ companyProfileSectionId, cache, sectionItems, result }),
      })
    },
    [sectionId, updateProfileSectionItem]
  )

  const handleDeleteSectionItem = useCallback(() => {
    deleteProfileSectionItem({
      variables: {
        id: sectionItemId,
      },
      update: (cache, { data: { deleteProfileSectionItem } }) => {
        cache.evict({ id: cache.identify(deleteProfileSectionItem) })
        cache.gc()
      },
    })

    handleDialogClose()
  }, [deleteProfileSectionItem, handleDialogClose, sectionItemId])

  if (loading) {
    return <SectionLoader />
  }

  return (
    <>
      <TabPanel value={activeTab} index={index} className={classes.sectionPanel}>
        {isEmpty(sectionItems) && (
          <Box className={classes.emptyItemsFallback}>
            <Typography variant="h4">{t('No items, yet!')}</Typography>
            <Typography variant="body2" className={classes.emptyItemsSubtitle}>
              Add your first item. <img className={classes.emptyItemsIcon} src="/static/arrow_34.svg" alt="arrow" />
            </Typography>
          </Box>
        )}
        {sectionItems.map(({ id, sectionItemType, value }) => {
          const Component = sectionItemsUI[sectionItemType]

          return (
            <Box key={id} className={classes.companySectionItemWrapper}>
              <Box className={classes.companySectionItemActions}>
                <Tooltip title={t('Edit item')}>
                  <IconButton size="small" onClick={() => handleAddEditSectionItem({ sectionItemType, id })}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t('Delete item')}>
                  <IconButton size="small" onClick={() => handleOpenDeleteConfirmation({ id })}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t('Change item oreder')}>
                  <IconButton size="small" onClick={handleToggleOrderingUI}>
                    <ReorderIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>

              <Component key={id} value={JSON.parse(value)} name={sectionItemType} />
            </Box>
          )
        })}

        <SpeedDialActions
          handleClick={handleAddEditSectionItem}
          profileSectionType={profileSectionType}
          className={classes.addSectionItemButton}
        />
      </TabPanel>

      <DialogPopUp
        isOpenModal={isOpen}
        title={renderTitle()}
        closeModal={handleDialogClose}
        maxWidth={'xs'}
        cancelTitle={!isNotDelete && t('Cancel')}
        successTitle={!isNotDelete && t('Delete')}
        handleAccept={!isNotDelete ? handleDeleteSectionItem : null}
      >
        {isNotDelete && renderSectionItemInterface()}
      </DialogPopUp>

      {isOpenOrderingUI && (
        <CompanySectionsOrdering
          orderList={sectionItems}
          isOpen={isOpenOrderingUI}
          handleUpdate={handleUpdateSectionItemOrder}
          handleToggleDrawer={handleToggleOrderingUI}
        />
      )}
    </>
  )
}

export default CompanySectionItems
