import Skeleton from '@mui/material/Skeleton'
import { DialogPopUp, SimpleSelect } from 'components'
import { useFetchJson } from 'hooks/useFetchJson'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useState } from 'react'

import useStyles from './styles'

const ConfirmSelect = ({ value, name, optionsUrl, handleUpdateData, allowedChannels, helperText }) => {
  const { t } = useTranslation('userProfile')

  const classes = useStyles()
  const { result: options } = useFetchJson(optionsUrl)
  const [selectedValue, setSelectedValue] = useState()
  const [isOpen, setIsOpen] = useState(false)
  const [valueBuffer, setValueBuffer] = useState()

  useEffect(() => {
    if (value) {
      setSelectedValue(value)
    }
  }, [value])

  const handleChangeRole = (event) => {
    setIsOpen(!isOpen)
    setValueBuffer(event.target.value)
  }

  const handleAccept = () => {
    const data =
      name === 'permissions' ? { userPolicy: { permissions: valueBuffer, allowedChannels } } : { [name]: valueBuffer }

    handleUpdateData(data)

    setIsOpen(false)
  }

  const handleCloseDialog = () => {
    setIsOpen(false)
  }

  return (
    <>
      {selectedValue ? (
        <SimpleSelect
          name={name}
          value={selectedValue}
          options={options}
          handleChange={handleChangeRole}
          className={classes.select}
          helperText={helperText}
        />
      ) : (
        <Skeleton variant="text" width={'60%'} height={70} />
      )}

      <DialogPopUp
        closeModal={handleCloseDialog}
        isOpenModal={isOpen}
        cancelTitle={t('Cancel')}
        successTitle={t('Change')}
        title={t(`Cange ${name}`)}
        handleAccept={handleAccept}
        description={t(`Are you sure you want to change member ${name}?`)}
        maxWidth="xs"
      />
    </>
  )
}

export default ConfirmSelect
