import AddIcon from '@mui/icons-material/Add'
import InfoIcon from '@mui/icons-material/Info'
import { Box, IconButton, Typography } from '@mui/material'
import {
  useCompanyRealtionshipKeyContacts,
  useCreateRelationshipContact,
  useDeleteRelationshipContact,
  useUpdateRelationshipContact,
} from 'api/hooks'
import { DialogPopUp, SectionLoader } from 'components'
import { updateRelationshipContactCache } from 'libs/cache/updateRelationshipContactCache'
import { isEmpty } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'

import AddRealtionshipKeyContact from '../AddRealtionshipKeyContact'
import RelationshipKeyContact from '../RelationshipKeyContact'
import useStyles from './styles'

const RelationshipKeyContacts = () => {
  const { t } = useTranslation('relationships')
  const classes = useStyles()
  const {
    query: { relationshipId },
  } = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [contactId, setContactId] = useState(null)
  const [mode, setMode] = useState('')
  const isEdit = mode === 'edit'
  const isDelete = mode === 'delete'
  const dialogTitle = isEdit ? t('Edit Key Contact') : t('Add Key Contact')

  const [createRelationshipContact] = useCreateRelationshipContact({
    onCompleted: () => handleDialogClose(),
  })
  const [updateRelationshipContact] = useUpdateRelationshipContact({
    onCompleted: () => handleDialogClose(),
  })
  const [deleteRelationshipContact] = useDeleteRelationshipContact({
    onCompleted: () => handleDialogClose(),
  })

  const { loading, data } = useCompanyRealtionshipKeyContacts({
    variables: { id: relationshipId },
  })
  const contacts = data?.getCompanyRelationship?.contacts?.items
  const contactsCount = contacts && contacts.length

  const handleDialogOpen = useCallback(() => {
    setIsOpen(true)
  }, [])

  const handleDialogClose = useCallback(() => {
    setIsOpen(false)

    if (contactId) {
      setContactId(null)
      setMode('')
    }
  }, [contactId])

  const handleOpenDialogBasedOnAction = useCallback(
    (id, mode) => {
      setMode(mode)
      setContactId(id)
      handleDialogOpen()
    },
    [handleDialogOpen]
  )

  const handleSubmitContact = useCallback(
    (values) => {
      if (contactId) {
        handleUpdateContact(contactId, values)
      } else {
        handleCreateContact(values)
      }
    },
    [contactId, handleUpdateContact, handleCreateContact]
  )

  const handleCreateContact = useCallback(
    (values) => {
      createRelationshipContact({
        variables: {
          input: {
            companyRelationshipId: relationshipId,
            ...values,
          },
        },
        update: (cache, { data }) => updateRelationshipContactCache({ relationshipId, cache, data }),
      })
    },
    [createRelationshipContact, relationshipId]
  )

  const handleUpdateContact = useCallback(
    (id, values) => {
      updateRelationshipContact({
        variables: {
          input: {
            id,
            companyRelationshipId: relationshipId,
            ...values,
          },
        },
      })
    },
    [relationshipId, updateRelationshipContact]
  )

  const handleDeleteContact = useCallback(() => {
    deleteRelationshipContact({
      variables: {
        id: contactId,
      },
      update: (cache, { data: { deleteRelationshipContact } }) => {
        cache.evict({ id: cache.identify(deleteRelationshipContact) })
        cache.gc()
      },
    })
  }, [contactId, deleteRelationshipContact])

  if (loading) return <SectionLoader />

  return (
    <>
      <Box className={classes.keyContactsWrapper}>
        <Box className={classes.keyContactsHead}>
          <Typography variant="subtitle2">
            {t('Contacts')} ({contactsCount || 0})
          </Typography>

          <IconButton size="small" className={classes.keyContactsAddBtn} onClick={handleDialogOpen}>
            <AddIcon />
          </IconButton>
        </Box>

        <Box>
          {isEmpty(contacts) && (
            <Box className={classes.emtyContacts}>
              <InfoIcon />
              <Typography variant="subtitle2">{t('No Contacts')}</Typography>
            </Box>
          )}

          <Box className={classes.keyContactsList}>
            {(contacts || []).map((contact) => (
              <RelationshipKeyContact
                key={contact.id}
                contact={contact}
                contactId={contactId}
                handleOpenDialogBasedOnAction={handleOpenDialogBasedOnAction}
              />
            ))}
          </Box>
        </Box>
      </Box>

      {!isDelete && (
        <DialogPopUp isOpenModal={isOpen} title={dialogTitle} closeModal={handleDialogClose} maxWidth="sm">
          <AddRealtionshipKeyContact
            contactId={contactId}
            handleCancel={handleDialogClose}
            handleSubmitContact={handleSubmitContact}
          />
        </DialogPopUp>
      )}

      {isDelete && (
        <DialogPopUp
          closeModal={handleDialogClose}
          isOpenModal={isOpen}
          cancelTitle={t('Cancel')}
          successTitle={t('Delete')}
          title={t(`Delete contact`)}
          handleAccept={handleDeleteContact}
          description={t(`Are you sure you want to delete this contact? This cannot be undone.`)}
          maxWidth="xs"
        />
      )}
    </>
  )
}

export default RelationshipKeyContacts
