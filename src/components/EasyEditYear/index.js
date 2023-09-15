import CloseIcon from '@mui/icons-material/Close'
import DoneIcon from '@mui/icons-material/Done'
import { Box } from '@mui/material'
import React, { memo, useCallback } from 'react'
import EasyEdit, { Types } from 'react-easy-edit'

import DisplayComponent from './components/DisplayComponent'
import EditComponent from './components/EditComponent'

const EasyEditField = ({
  name,
  value,
  className,
  handleSave,
  handleClick,
  displayCmpClass,
  toolTipPlacement,
  displayLabes,
  maxWidth,
}) => {
  const onHandleSave = useCallback(
    (value) => {
      const timestamp = new Date(value).getTime()
      const data = { value: timestamp, name }

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
          <DisplayComponent placement={toolTipPlacement} className={displayCmpClass} displayLabes={displayLabes} />
        }
        editComponent={<EditComponent className={className} />}
        saveButtonLabel={<DoneIcon fontSize="small" />}
        cancelButtonLabel={<CloseIcon fontSize="small" />}
        disableAutoCancel={false}
      />
    </Box>
  )
}

export default memo(EasyEditField)
