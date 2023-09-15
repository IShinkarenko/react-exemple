import { TextEditor } from 'components'
import { convertFromHTML } from 'draft-convert'
import { EditorState } from 'draft-js'
import React from 'react'

import useStyles from './styles'

const EditNoteForm = ({ note, handleCloseEditMode, mentionList, handleSubmitEditNote }) => {
  const classes = useStyles()

  const HtmlToEditorState = EditorState.createWithContent(convertFromHTML(JSON.parse(note)))

  const onnHandleEdit = (values) => {
    handleSubmitEditNote(values)
  }

  return (
    <TextEditor
      value={HtmlToEditorState}
      mentionList={mentionList}
      handleSubmit={onnHandleEdit}
      handleCloseEditMode={handleCloseEditMode}
      className={classes.editTextFiled}
    />
  )
}

export default EditNoteForm
