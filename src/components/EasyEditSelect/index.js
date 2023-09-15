import CloseIcon from '@mui/icons-material/Close'
import DoneIcon from '@mui/icons-material/Done'
import { Box } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { memo, useCallback } from 'react'
import EasyEdit, { Types } from 'react-easy-edit'

import DisplayComponent from './components/DisplayComponent'
import EditComponent from './components/EditComponent'

const EasyEditSelect = ({
  name,
  value,
  options,
  maxWidth,
  className,
  handleSave,
  selectProps,
  handleClick,
  displayCmpClass,
  displayValueKeys,
  toolTipPlacement,
}) => {
  const { t } = useTranslation('common')

  const onHandleSave = useCallback(
    (value) => {
      const data = { value, name }

      handleSave(data)
    },
    [handleSave, name]
  )

  return (
    <Box display="flex" alignItems="center" onClick={handleClick} maxWidth={maxWidth}>
      <EasyEdit
        type={Types.TEXT}
        value={value}
        onSave={onHandleSave}
        displayComponent={
          <DisplayComponent
            placement={toolTipPlacement}
            className={displayCmpClass}
            displayValueKeys={displayValueKeys}
          />
        }
        editComponent={<EditComponent className={className} options={options} selectProps={selectProps} />}
        saveButtonLabel={<DoneIcon fontSize="small" />}
        cancelButtonLabel={<CloseIcon fontSize="small" />}
        disableAutoCancel={false}
        placeholder={t('Click to edit')}
      />
    </Box>
  )
}

export default memo(EasyEditSelect)
