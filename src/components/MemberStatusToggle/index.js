import { FormControlLabel, Switch } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { memo, useEffect, useState } from 'react'

const MemberStatusToggle = ({ isDisable, handleUpdateData }) => {
  const { t } = useTranslation('common')

  const [isDisabled, setIsDisabled] = useState()

  useEffect(() => {
    if (isDisable !== undefined) {
      setIsDisabled(isDisable)
    }
  }, [isDisable])

  const handleChange = (event) => {
    setIsDisabled(!event.target.checked)

    handleUpdateData({ disabled: !event.target.checked })
  }

  return (
    <>
      {isDisabled !== undefined && (
        <FormControlLabel
          control={<Switch checked={!isDisabled} onChange={handleChange} name="member-status" color="primary" />}
          label={isDisabled ? t('Disabled') : t('Active')}
        />
      )}
    </>
  )
}

export default memo(MemberStatusToggle)
