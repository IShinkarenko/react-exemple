import CloseIcon from '@mui/icons-material/Close'
import DoneIcon from '@mui/icons-material/Done'
import { Box } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { memo, useCallback, useMemo } from 'react'
import EasyEdit, { Types } from 'react-easy-edit'

import DisplayComponent from './components/DisplayComponent'
import EditComponent from './components/EditComponent'

const EasyEditCountriesField = ({ name, value, options, handleSave, toolTipPlacement, className }) => {
  const { t } = useTranslation('common')

  const onHandleSave = useCallback(
    (newValue) => {
      const value = newValue.code
      const data = { value, name }

      handleSave(data)
    },
    [handleSave, name]
  )

  const handleClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const getCountry = useMemo(() => options.find((country) => country.code == value), [options, value])

  return (
    <Box onClick={handleClick}>
      <EasyEdit
        type={Types.TEXT}
        value={getCountry?.country || ''}
        onSave={onHandleSave}
        displayComponent={<DisplayComponent placement={toolTipPlacement} options={options} />}
        editComponent={<EditComponent className={className} options={options} />}
        saveButtonLabel={<DoneIcon />}
        cancelButtonLabel={<CloseIcon />}
        placeholder={t('Click to edit')}
      />
    </Box>
  )
}

export default memo(EasyEditCountriesField)
