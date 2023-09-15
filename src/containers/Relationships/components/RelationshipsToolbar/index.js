import { Box } from '@mui/material'
import { Analytics } from 'aws-amplify'
import { Actions, BasicSearchField, DialogPopUp } from 'components'
import { ADD, DELETE } from 'constant'
import { useCompanySubscriptionLevel } from 'hooks/useCompanySubscriptionLevel'
import { isEmpty } from 'lodash'
import { useTranslation } from 'next-i18next'
import React, { memo, useCallback, useMemo, useState } from 'react'

import AddNewRelationship from '../AddNewRelationship'
import DeleteRelationships from '../DeleteRelationships'
import RelationshipsFilterPanel from '../RelationshipsFilterPanel'
import useStyles from './styles'

const initialState = {
  mode: '',
  open: false,
}

const RelationshipsToolbar = ({ dispatch, state, handleResetTokensOnFilter, relationshipsLength }) => {
  const classes = useStyles()
  const { t } = useTranslation('relationships')
  const [dialog, setDialog] = useState(initialState)
  const [showPrompt, setShowPrompt] = useState(false)
  const { isCompanyBasic } = useCompanySubscriptionLevel()

  const isDelete = dialog.mode === DELETE
  const isAdd = dialog.mode === ADD
  const isNoSelection = isEmpty(state.selectionModel)

  const handleNotifyClose = () => {
    Analytics.record({
      name: 'ImportExportRelationshipFeaturePrompt',
      attributes: { response: 'false' },
    })

    setShowPrompt(false)
  }

  const handleDialogClose = useCallback(() => {
    setDialog(initialState)
  }, [])

  const handleAddRelationship = useCallback(() => {
    setDialog({ mode: ADD, open: true })
  }, [])

  const handleDeleteRelationships = useCallback(() => {
    setDialog({ mode: DELETE, open: true })
  }, [])

  /*   const handleCsvInterface = useCallback(() => {
    if (isCompanyBasic) {
      return setShowPrompt(true)
    }

    dispatch({ type: 'SET_IS_CSV_IMPORT', payload: true })
  }, [dispatch, isCompanyBasic]) */

  const handleCsvInterface = useCallback(() => {
    dispatch({ type: 'SET_IS_CSV_IMPORT', payload: true })
  }, [dispatch])

  const handleExportViewToggle = useCallback(() => {
    if (isCompanyBasic) {
      return setShowPrompt(true)
    }

    // do somethig
  }, [isCompanyBasic])

  const handleNotify = useCallback(() => {
    Analytics.record({
      name: 'ImportExportRelationshipFeaturePrompt',
      attributes: { response: 'true' },
    })

    setShowPrompt(false)
  }, [])

  const handleSearchRelationships = useCallback(
    (searchPhrase) => {
      dispatch({ type: 'SET_FILTER', payload: { searchPhrase } })
      handleResetTokensOnFilter()
    },
    [dispatch, handleResetTokensOnFilter]
  )

  const handleResetSearch = useCallback(() => {
    dispatch({ type: 'SET_FILTER', payload: { searchPhrase: '' } })
  }, [dispatch])

  const actions = useMemo(
    () => [
      { label: t('Add Relationship'), handleClick: handleAddRelationship, disabled: false },
      { label: t('Import'), handleClick: handleCsvInterface, disabled: false },
      { label: t('Delete'), handleClick: handleDeleteRelationships, disabled: isNoSelection },
      { label: t('Invite to Connect'), handleClick: () => console.log('click'), disabled: isNoSelection },
      { label: t('Export'), handleClick: handleExportViewToggle, disabled: false },
    ],
    [handleAddRelationship, handleCsvInterface, handleDeleteRelationships, handleExportViewToggle, isNoSelection, t]
  )
  return (
    <>
      <Box sx={{ p: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box className={classes.relationshipsTollbar}>
          <RelationshipsFilterPanel
            dispatch={dispatch}
            filter={state.filter}
            handleResetTokensOnFilter={handleResetTokensOnFilter}
          />

          <BasicSearchField
            value={state?.filter?.searchPhrase}
            handleSearch={handleSearchRelationships}
            handleReset={handleResetSearch}
            autoFocus={false}
            inputClassName={classes.searchField}
            variant={'standard'}
          />
        </Box>

        <Box>
          <Actions actions={actions} />
        </Box>
      </Box>

      <DialogPopUp
        isOpenModal={dialog.open}
        title={isDelete ? t('Delete Relationship(s)') : t('Add Relationship')}
        closeModal={handleDialogClose}
        maxWidth={'xs'}
      >
        {isAdd && <AddNewRelationship handleCancel={handleDialogClose} />}

        {isDelete && (
          <DeleteRelationships
            filter={state.filter}
            relationshipsLength={relationshipsLength}
            relationshipsIds={state.selectionModel}
            handleCancel={handleDialogClose}
          />
        )}
      </DialogPopUp>

      <DialogPopUp
        isOpenModal={showPrompt}
        title={t('Would you like to be notified?')}
        successTitle={t('Yes')}
        cancelTitle={t('No')}
        handleAccept={handleNotify}
        closeModal={handleNotifyClose}
        description={t(
          'The ability to bulk import and export your existing relationships will be available after this early beta phase for users who wish to upgrade to a paid plan.  Upgrading users will then be able to import existing companies and use the “Expand” intelligence option on each to learn more about imported companies and export them for external use, i.e., in their CRM systems.  Would you like to be notified when this feature is available for upgrade?'
        )}
      />
    </>
  )
}

export default memo(RelationshipsToolbar)
