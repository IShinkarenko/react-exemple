import EditIcon from '@mui/icons-material/Edit'
import { Box, Chip, TextField, Typography } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import clsx from 'clsx'
import { BaseButton, DialogPopUp } from 'components'
import { ADD, DELETE, EDIT } from 'constant'
import { useTranslation } from 'next-i18next'
import React, { memo, useCallback, useEffect, useState } from 'react'

import DefinitionForm from '../DefinitionForm'
import useStyles from './styles'

const ChipSelectSmart = ({ name, values, label, handleCreate, handleDelete, handleUpdate, editOnly, className }) => {
  const { t } = useTranslation('relationships')
  const classes = useStyles()
  const [value, setValue] = useState([])
  const [editableValue, setEditableValue] = useState()
  const [deletableValue, setDeletableValue] = useState()
  const [bufferValue, setBufferValue] = useState()
  const [dialog, setDialog] = useState({
    open: false,
    mode: '',
  })

  useEffect(() => {
    if (values) {
      setValue(values)
    }

    return () => setValue([])
  }, [values])

  const handleDialogClose = () => {
    setDialog((preveState) => ({ ...preveState, open: false }))
  }

  const handleDialogOpen = (mode) => {
    setDialog({ open: true, mode })
  }

  const onHandleInputChange = useCallback(
    (newValue, configuration) => {
      const options = value.concat([{ label: newValue, value: newValue }])

      setValue(options)
      handleCreate({ newValue, name, configuration })
      handleDialogClose()
    },
    [name, value, handleCreate]
  )

  const onKeyDownHandler = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      if (editOnly) {
        onHandleInputChange(e.target.value)
      } else {
        setBufferValue(e.target.value)
        handleDialogOpen(ADD)
      }
    }

    if (e.key === 'Backspace') {
      e.stopPropagation()
    }
  }

  const onHandleChange = (event, options) => {
    setValue(options)
    handleCreate({ options, name })
  }

  const handleSubmitForm = useCallback(
    ({ value, id, configuration }) => {
      if (bufferValue) {
        onHandleInputChange(value, configuration)
        setBufferValue('')
      } else {
        handleUpdate(value, id, configuration)
        handleDialogClose()
        setEditableValue('')
      }
    },
    [bufferValue, handleUpdate, onHandleInputChange]
  )

  const onHandleEdit = (value) => {
    setEditableValue(value)
    handleDialogOpen(EDIT)
  }

  const onHandleDelete = (option) => {
    setDeletableValue(option)
    handleDialogOpen(DELETE)
  }

  const deleteHandler = () => {
    const newValues = value.filter((val) => val !== deletableValue)

    setValue(newValues)
    handleDelete(deletableValue)
    setDeletableValue('')
    handleDialogClose()
  }

  const renderTitle = () => {
    switch (dialog.mode) {
      case ADD:
        return t('Setup Custom Filed')
      case EDIT:
        return t('Edit Custom Filed')
      case DELETE:
        return t('Confirm Delete')
    }
  }

  return (
    <>
      <Box className={clsx(classes.root, className)}>
        <Autocomplete
          multiple
          open={false}
          name={name}
          options={[]}
          onChange={onHandleChange}
          value={value}
          autoHighlight
          popupIcon={null}
          clearIcon={null}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option.value}
                label={option.label}
                clickable={true}
                icon={<EditIcon />}
                className={classes.smartChip}
                onClick={() => onHandleEdit(option)}
                onDelete={() => onHandleDelete(option)}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label={label}
              placeholder={label}
              onKeyDown={(e) => onKeyDownHandler(e)}
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password',
              }}
            />
          )}
        />
      </Box>

      <DialogPopUp
        isOpenModal={dialog.open}
        title={renderTitle()}
        closeModal={handleDialogClose}
        maxWidth={dialog.mode === DELETE ? 'xs' : 'sm'}
      >
        {dialog.mode === DELETE ? (
          <Box>
            <Typography variant="h6" color="secondary">
              {t('Are you sure you want to remove this definition?')}
            </Typography>

            <Box mt={6} display="flex" justifyContent="flex-end">
              <BaseButton title={t('Cancel')} variant="outlined" onClick={handleDialogClose} />

              <BaseButton title={t('Delete')} variant="contained" onClick={deleteHandler} />
            </Box>
          </Box>
        ) : (
          <DefinitionForm
            mode={dialog.mode}
            name={name}
            editValue={editableValue}
            bufferValue={bufferValue}
            handleSubmit={handleSubmitForm}
            handleCancel={handleDialogClose}
          />
        )}
      </DialogPopUp>
    </>
  )
}

export default memo(ChipSelectSmart)
