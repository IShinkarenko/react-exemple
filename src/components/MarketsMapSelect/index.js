import { ChipSelect, DialogPopUp, WorldAtlas } from 'components'
import { isEmpty } from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'

import SelectedMarkets from './components/SelectedMarkets'

const MarketsMapSelect = ({ name, label, handleChange, values, className, errors, size, required }) => {
  const { t } = useTranslation('tags')
  const router = useRouter()
  const [selections, setSelections] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [isMarketsEmpty, setIsMarketsEmpty] = useState(false)
  const dataUrl = `/static/locales/${router.locale}/world-atlas.json`

  useEffect(() => {
    if (values) {
      setSelections(values)
    }
  }, [values])

  const handleSelect = useCallback(
    (event, option) => {
      const filteredSelects = selections.filter((f) => f.value === option.value)

      if (isEmpty(filteredSelects)) {
        const newValue = selections
          .filter((f) => !f.value.split('-').includes(option.value) && !option.value.split('-').includes(f.value))
          .concat([option])

        setSelections(newValue)
      }
    },
    [selections]
  )

  const handleRemoveMarket = (option) => {
    setSelections(selections.filter((f) => f.value !== option.value))
  }

  const handleDialogOpen = () => {
    setIsOpen(true)
  }

  const handleDialogClose = () => {
    setIsOpen(false)
    setSelections(values)
  }

  const handleSetMarkets = useCallback(() => {
    handleChange({ options: selections, name })
    setIsOpen(false)

    if (isEmpty(selections)) {
      setIsMarketsEmpty(true)
    } else {
      setIsMarketsEmpty(false)
    }
  }, [handleChange, name, selections])

  return (
    <>
      <ChipSelect
        name={name}
        label={label}
        values={values || []}
        options={[]}
        open={false}
        disableClearable={true}
        onOpen={handleDialogOpen}
        ChipProps={{ onDelete: null }}
        freeSolo={false}
        preventRemove
        className={className}
        errors={errors}
        size={size}
        required={required}
        isMarketsEmpty={isMarketsEmpty}
      />

      <DialogPopUp
        isOpenModal={isOpen}
        title={<SelectedMarkets markets={selections} handleRemoveMarket={handleRemoveMarket} />}
        closeModal={handleDialogClose}
        handleAccept={handleSetMarkets}
        maxWidth={'md'}
        successTitle={t('Finish')}
        cancelTitle={t('Cancel')}
        isButton={false}
        disableEscapeKeyDown
      >
        <WorldAtlas
          name={name}
          color="primary"
          dataUrl={dataUrl}
          onHandleSelect={handleSelect}
          // defaultCountry={defaultCountry}
        />
      </DialogPopUp>
    </>
  )
}

export default MarketsMapSelect
