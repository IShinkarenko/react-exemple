import CloseIcon from '@mui/icons-material/Close'
import DoneIcon from '@mui/icons-material/Done'
import { Box } from '@mui/material'
import { isEmpty } from 'lodash'
import { useTranslation } from 'next-i18next'
import React, { memo, useCallback, useEffect, useState } from 'react'
import EasyEdit from 'react-easy-edit'
import { getTagsByType } from 'utils'

import DisplayComponent from './components/DisplayComponent'
import EditComponent from './components/EditComponent'

const EasyEditChipSelect = ({
  name,
  tags,
  className,
  handleSave,
  handleClick,
  displayCmpClass,
  toolTipPlacement,
  displayLabes,
  maxWidth,
  json,
  disableAutoSubmit = false,
  freeSolo,
  noOptionsText,
}) => {
  const { t } = useTranslation('common')
  const [tagsValue, setTagsValue] = useState([])

  const value = isEmpty(getTagsByType(tags, name)) ? null : getTagsByType(tags, name)

  useEffect(() => {
    if (tags) {
      setTagsValue(tags)
    }
  }, [tags])

  const onHandleSave = useCallback(() => {
    handleSave({ name: 'tags', value: tagsValue })
  }, [handleSave, tagsValue])

  const handleChange = useCallback((newTags) => {
    setTagsValue(newTags)
  }, [])

  return (
    <Box display="flex" alignItems="center" onClick={handleClick} maxWidth={maxWidth}>
      <EasyEdit
        type={'text'}
        value={value}
        onSave={onHandleSave}
        displayComponent={
          <DisplayComponent placement={toolTipPlacement} className={displayCmpClass} displayLabes={displayLabes} />
        }
        editComponent={
          <EditComponent
            name={name}
            tags={tags}
            className={className}
            json={json}
            handleChange={handleChange}
            freeSolo={freeSolo}
            noOptionsText={noOptionsText}
          />
        }
        saveButtonLabel={<DoneIcon />}
        cancelButtonLabel={<CloseIcon />}
        disableAutoSubmit={disableAutoSubmit}
        placeholder={t('Click to edit')}
      />
    </Box>
  )
}

export default memo(EasyEditChipSelect)
