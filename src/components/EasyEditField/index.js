import CloseIcon from '@mui/icons-material/Close'
import DoneIcon from '@mui/icons-material/Done'
import LaunchIcon from '@mui/icons-material/Launch'
import { Box, Link, Tooltip } from '@mui/material'
import { CopyToClipboardWrapper } from 'components'
import { useTranslation } from 'next-i18next'
import React, { memo, useCallback, useState } from 'react'
import EasyEdit from 'react-easy-edit'
import { isURL } from 'utils'

import DisplayComponent from './components/DisplayComponent'
import EditComponent from './components/EditComponent'
import useStyles from './styles'

const EasyEditField = ({
  name,
  value,
  variant,
  maxWidth,
  className,
  textfiled,
  handleSave,
  handleClick,
  editInputProps,
  displayCmpClass,
  toolTipPlacement,
  profileSectionId,
  required = false,
  disableAutoSubmit = false,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const [error, setError] = useState(false)

  const onHandleSave = useCallback(
    (value) => {
      const data = { value, name, profileSectionId }

      handleSave(data)
    },
    [handleSave, name, profileSectionId]
  )

  const handleValidate = useCallback(
    (value) => {
      if (!required) {
        return true
      }

      if (!value) {
        setError(true)
        return false
      } else {
        setError(false)
        return true
      }
    },
    [required]
  )

  const onHandleCancel = useCallback(() => {
    setError(false)
  }, [])

  return (
    <Box display="flex" alignItems="center" onClick={handleClick} maxWidth={maxWidth}>
      <EasyEdit
        type="text"
        value={value || undefined}
        onSave={onHandleSave}
        onCancel={onHandleCancel}
        displayComponent={
          <DisplayComponent
            placement={isURL(value) ? 'top' : toolTipPlacement}
            className={displayCmpClass}
            variant={variant}
          />
        }
        editComponent={<EditComponent textfiled={textfiled} className={className} error={error} {...editInputProps} />}
        saveButtonLabel={<DoneIcon fontSize="small" />}
        cancelButtonLabel={<CloseIcon fontSize="small" />}
        onValidate={(value) => handleValidate(value)}
        validationMessage={error ? t('Please, provide a value') : ''}
        disableAutoSubmit={disableAutoSubmit}
        placeholder={t('Click to edit')}
      />

      {isURL(value) && (
        <Box display="flex" alignItems="center">
          <Tooltip title={t('Follow The Link')} placement={'top'} arrow>
            <Link href={value} variant="body2" className={classes.link} target="_blank" rel="noopener">
              <LaunchIcon className={classes.launchIcon} color="action" />
            </Link>
          </Tooltip>

          <CopyToClipboardWrapper value={value} />
        </Box>
      )}
    </Box>
  )
}

export default memo(EasyEditField)
