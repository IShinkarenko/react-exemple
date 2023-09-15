import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Avatar, Box, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@mui/material'
import { useCompanyUsers, useUserProfile } from 'api/hooks'
import { DialogPopUp, OptionsMenu } from 'components'
import moment from 'moment'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { memo, useCallback, useMemo, useState } from 'react'

import EditNoteForm from '../EditNoteForm'
import useStyles from './styles'

const RelationshipNoteItem = ({
  note: { note, id, userId, creationTimestamp },
  handleUpdateNote,
  handleDeleteNote,
}) => {
  const { t } = useTranslation('relationships')
  const classes = useStyles()
  const {
    query: { companyId },
  } = useRouter()
  const [editNoteId, setEditNoteId] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const { data: data_users } = useCompanyUsers({ variables: { id: companyId } })
  const { data } = useUserProfile({ variables: { id: userId } })
  const avatar = data?.getUser?.avatarUrl
  const fullName = data?.getUser?.fullName
  const time = moment(creationTimestamp).format('LT')
  const members = data_users?.getCompany?.users?.items
  const normilizedMentions = (members || []).map(({ id, name }) => ({ id, name }))

  const actions = useMemo(
    () => [
      {
        title: 'Edit',
        icon: <EditIcon fontSize="small" />,
        handleClick: () => setEditNoteId(id),
      },
      {
        title: 'Delete',
        icon: <DeleteIcon fontSize="small" />,
        handleClick: () => setIsOpen(true),
      },
    ],
    [id]
  )

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleCloseEditMode = useCallback(() => {
    setEditNoteId(null)
  }, [])

  const handleSubmitEditNote = useCallback(
    ({ note }) => {
      if (note === '') {
        setIsOpen(true)
      } else {
        handleUpdateNote({ note, id })
        handleCloseEditMode()
      }
    },
    [handleUpdateNote, id, handleCloseEditMode]
  )

  const handleDelete = useCallback(() => {
    handleDeleteNote(id)
    handleCloseEditMode()
  }, [handleCloseEditMode, handleDeleteNote, id])

  return (
    <>
      <ListItem classes={{ container: classes.container, root: classes.root }}>
        <ListItemAvatar>
          <Avatar alt={fullName} src={avatar} />
        </ListItemAvatar>

        <ListItemText className={classes.noteListItem}>
          <Box className={classes.noteTitle}>
            <Typography variant="h6" className={classes.noteUserName}>
              {fullName}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {time}
            </Typography>
          </Box>

          {editNoteId ? (
            <EditNoteForm
              note={note}
              handleCloseEditMode={handleCloseEditMode}
              handleSubmitEditNote={handleSubmitEditNote}
              mentionList={normilizedMentions}
            />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: JSON.parse(note) }} />
          )}
        </ListItemText>

        <ListItemSecondaryAction className={classes.noteAction}>
          <OptionsMenu actions={actions} closeFlag={editNoteId} />
        </ListItemSecondaryAction>
      </ListItem>

      <DialogPopUp
        closeModal={handleCloseDialog}
        isOpenModal={isOpen}
        cancelTitle={t('Cancel')}
        successTitle={t('Delete')}
        title={t(`Delete note`)}
        handleAccept={handleDelete}
        description={t(`Are you sure you want to delete this message? This cannot be undone.`)}
        maxWidth="xs"
      />
    </>
  )
}

export default memo(RelationshipNoteItem)
