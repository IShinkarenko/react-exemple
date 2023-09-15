import { Box, Typography } from '@mui/material'
import { useProfileSectionItem } from 'api/hooks'
import { CustomSelect, Input, TextEditor } from 'components'
import { convertFromHTML } from 'draft-convert'
import { EditorState } from 'draft-js'
import { Field } from 'formik'
import { useFetchJson } from 'hooks/useFetchJson'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { memo, useCallback, useState } from 'react'

import FormWrapper from '../FormWrapper'
import useStyles from './styles'

const AddCustomItemType = ({ handleDialogClose, sectionId, sectionItemId, type }) => {
  const { t } = useTranslation('addKeyContact')
  const router = useRouter()
  const classes = useStyles()
  const [editorMarkup, setEditorMarkup] = useState()
  const optionsBasePath = `/static/locales/${router.locale}/lists`
  const { result: visibilityOptions } = useFetchJson(`${optionsBasePath}/visibilityLevelOptions.json`)
  const isEditMode = !!sectionItemId
  const { data: data_sectionItem } = useProfileSectionItem({ skip: !isEditMode, variables: { id: sectionItemId } })
  const itemValues = data_sectionItem && JSON.parse(data_sectionItem?.getProfileSectionItem?.value)
  const editValue = isEditMode && itemValues && EditorState.createWithContent(convertFromHTML(itemValues?.editorMarkup))

  const onEditorStateChange = useCallback((editorState) => {
    setEditorMarkup(editorState)
  }, [])

  return (
    <FormWrapper
      initialValues={{ [type]: '', visibilityLevel: '' }}
      sectionId={sectionId}
      sectionItemType={type}
      editorMarkup={editorMarkup}
      sectionItemId={sectionItemId}
      handleDialogClose={handleDialogClose}
    >
      <Field name={type} label={`${t('Title')}`} component={Input} />

      <Field
        name="visibilityLevel"
        label={t('Visibility Level')}
        options={visibilityOptions}
        component={CustomSelect}
      />

      <Box mb={1} mt={2}>
        <Typography variant="h6">Custom text</Typography>
      </Box>

      {itemValues && <TextEditor value={editValue} handlechange={onEditorStateChange} className={classes.editor} />}

      {!isEditMode && <TextEditor handlechange={onEditorStateChange} className={classes.editor} />}
    </FormWrapper>
  )
}

export default memo(AddCustomItemType)
