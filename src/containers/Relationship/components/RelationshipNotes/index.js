import AddIcon from '@mui/icons-material/Add'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import InfoIcon from '@mui/icons-material/Info'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import {
  useCompanyRealtionshipNotes,
  useCompanyUsers,
  useCreateRelationshipNote,
  useDeleteRelationshipNote,
  useUpdateRelationshipNote,
} from 'api/hooks'
import { DialogPopUp, SectionLoader, TextEditor } from 'components'
import { useAppState } from 'hooks/useAppState'
import { updateRelationshipNoteCache } from 'libs/cache/updateRelationshipNoteCache'
import { isEmpty } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { memo, useCallback, useRef, useState } from 'react'

import RelationshipNotesList from '../RelationshipNotesList'
import useStyles from './styles'

const RelationshipNotes = () => {
  const { t } = useTranslation('relationships')
  const classes = useStyles()
  const {
    user: {
      username: userName,
      attributes: { sub: userId },
    },
  } = useAppState()
  const {
    query: { relationshipId, companyId },
  } = useRouter()

  const notesWrapRef = useRef(null)

  const [isOpen, setIsOpen] = useState(false)

  const { loading, data: data_notes, fetchMore } = useCompanyRealtionshipNotes({ variables: { id: relationshipId } })
  const { loading: companyLoading, data: data_users } = useCompanyUsers({ variables: { id: companyId } })
  const [updateRelationshipNote] = useUpdateRelationshipNote()
  const [deleteRelationshipNote] = useDeleteRelationshipNote()
  const [createRelationshipNote] = useCreateRelationshipNote({
    onCompleted: () => handleDialogClose(),
  })

  const notes = data_notes?.getCompanyRelationship?.notes?.items
  const notesLength = notes && notes.length
  const isFetchMore = notes?.nextToken
  const members = data_users?.getCompany?.users?.items
  const normilizedMentions = (members || []).map(({ id, name }) => ({ id, name }))

  const handleCreateNote = useCallback(
    ({ note }) => {
      createRelationshipNote({
        variables: {
          input: {
            userId,
            userName,
            note: JSON.stringify(note),
            companyRelationshipId: relationshipId,
          },
        },
        update: (cache, { data }) => updateRelationshipNoteCache({ relationshipId, cache, data }),
      })
    },
    [createRelationshipNote, userId, userName, relationshipId]
  )

  const handleUpdateNote = useCallback(
    ({ note, id }) =>
      updateRelationshipNote({
        variables: {
          input: {
            note: JSON.stringify(note),
            id,
            companyRelationshipId: relationshipId,
          },
        },
      }),
    [updateRelationshipNote, relationshipId]
  )

  const handleDeleteNote = useCallback(
    (id) => {
      deleteRelationshipNote({
        variables: {
          id,
        },
        update: (cache, { data: { deleteRelationshipNote } }) => {
          cache.evict({ id: cache.identify(deleteRelationshipNote) })
          cache.gc()
        },
      })
    },
    [deleteRelationshipNote]
  )

  const handleFetchMoreNotes = () => {
    fetchMore({
      variables: { id: relationshipId, nextToken: isFetchMore },
    })
  }

  const handleDialogOpen = useCallback(() => {
    setIsOpen(true)
  }, [])

  const handleDialogClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  if (loading || companyLoading) return <SectionLoader />

  return (
    <Box className={classes.chatWrap}>
      <Box className={classes.notesHead}>
        <Typography variant="subtitle2">
          {t('Notes')} ({notesLength || 0})
        </Typography>

        <IconButton size="small" className={classes.notesAddBtn} onClick={handleDialogOpen}>
          <AddIcon />
        </IconButton>
      </Box>

      <Box className={classes.chatArea} ref={notesWrapRef}>
        {isFetchMore && (
          <Box display="flex" justifyContent="center" mt={1}>
            <Tooltip title={t('Load More')}>
              <IconButton variant="outlined" onClick={handleFetchMoreNotes} size="large">
                <DoubleArrowIcon className={classes.loadMore} />
              </IconButton>
            </Tooltip>
          </Box>
        )}

        {isEmpty(notes) && (
          <Box className={classes.emptyNotes}>
            <InfoIcon />
            <Typography variant="subtitle2">{t('No Notes')}</Typography>
          </Box>
        )}

        <RelationshipNotesList
          notes={notes}
          handleUpdateNote={handleUpdateNote}
          handleDeleteNote={handleDeleteNote}
          handleFetchMoreNotes={handleFetchMoreNotes}
        />
      </Box>

      <DialogPopUp
        isOpenModal={isOpen}
        title={t('New Note')}
        closeModal={handleDialogClose}
        maxWidth="sm"
        dialogContentClasses={classes.notesDialog}
      >
        <TextEditor handleSubmit={handleCreateNote} mentionList={normilizedMentions} className={classes.editor} />
      </DialogPopUp>
    </Box>
  )
}

export default memo(RelationshipNotes)
