import createMentionPlugin, { defaultSuggestionsFilter } from '@draft-js-plugins/mention'
import CodeIcon from '@mui/icons-material/Code'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import SendIcon from '@mui/icons-material/Send'
import { Box } from '@mui/material'
import clsx from 'clsx'
import { BaseButton } from 'components'
import { convertToHTML } from 'draft-convert'
import { convertFromRaw, EditorState } from 'draft-js'
import { BLOCK_TYPE, DraftailEditor, INLINE_STYLE, serialiseEditorStateToRaw } from 'draftail'
import { useTranslation } from 'next-i18next'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import useStyles from './styles'

const TextEditor = ({ handleSubmit, handlechange, mentionList, value, handleCloseEditMode, className }) => {
  const classes = useStyles()
  const { t } = useTranslation('textEditor')

  // @todo move to UseEffect???
  const initialState = value || EditorState.createEmpty()

  const [editorState, setEditorState] = useState(initialState)
  const [open, setOpen] = useState(false)
  const [suggestions, setSuggestions] = useState()
  const isEdit = !!value

  useEffect(() => {
    if (mentionList) {
      setSuggestions(mentionList)
    }
  }, [mentionList])

  const { MentionSuggestions, plugins } = useMemo(() => {
    const mentionPlugin = createMentionPlugin({
      mentionPrefix: '@',
    })
    const { MentionSuggestions } = mentionPlugin
    const plugins = [mentionPlugin]

    return { plugins, MentionSuggestions }
  }, [])

  const onSubmit = () => {
    const html = convertToHtml()

    if (html) {
      handleSubmit({ note: html })
      setTimeout(() => {
        setEditorState(initialState)
      }, 250)
    }
  }

  const convertToHtml = () => {
    const toRaw = serialiseEditorStateToRaw(editorState)
    const toHTML = toRaw ? convertToHTML(exporterConfig)(convertFromRaw(toRaw)) : ''

    return toHTML
  }

  const handleChange = (content) => {
    const html = convertToHtml()

    setEditorState(content)
    handlechange && handlechange(html)
  }

  const exporterConfig = {
    blockToHTML: (block) => {
      if (block.type === BLOCK_TYPE.CODE) {
        return <pre />
      }

      return null
    },
  }

  const onOpenChange = useCallback((open) => {
    setOpen(open)
  }, [])

  const onSearchChange = useCallback(
    ({ value }) => {
      setSuggestions(defaultSuggestionsFilter(value, mentionList))
    },
    [mentionList]
  )

  return (
    <>
      <Box className={clsx(classes.notesEditor, className)}>
        <DraftailEditor
          editorState={editorState}
          onChange={handleChange}
          blockTypes={[
            { type: BLOCK_TYPE.HEADER_TWO },
            { type: BLOCK_TYPE.HEADER_THREE },
            { type: BLOCK_TYPE.HEADER_FOUR },
            { type: BLOCK_TYPE.UNORDERED_LIST_ITEM, icon: <FormatListBulletedIcon /> },
            { type: BLOCK_TYPE.ORDERED_LIST_ITEM, icon: <FormatListNumberedIcon /> },
            { type: BLOCK_TYPE.BLOCKQUOTE, icon: <FormatQuoteIcon /> },
            { type: BLOCK_TYPE.CODE, icon: <CodeIcon /> },
          ]}
          inlineStyles={[
            { type: INLINE_STYLE.BOLD, icon: <FormatBoldIcon /> },
            { type: INLINE_STYLE.ITALIC, icon: <FormatItalicIcon /> },
          ]}
          enableLineBreak={{
            description: t('Soft line break'),
            icon: <KeyboardReturnIcon />,
          }}
          plugins={plugins}
        />

        {mentionList && (
          <MentionSuggestions
            open={open}
            onOpenChange={onOpenChange}
            suggestions={suggestions || []}
            onSearchChange={onSearchChange}
          />
        )}

        {!isEdit && handleSubmit && <SendIcon className={classes.submitNote} onClick={onSubmit} />}
      </Box>

      {isEdit && handleSubmit && (
        <Box mt={1}>
          <BaseButton
            title={t('Cancel')}
            variant="outlined"
            onClick={handleCloseEditMode}
            className={classes.noteButton}
          />

          <BaseButton
            title={t('Save Changes')}
            icon={<KeyboardReturnIcon fontSize="small" />}
            onClick={onSubmit}
            className={classes.noteButton}
          />
        </Box>
      )}
    </>
  )
}

export default TextEditor
