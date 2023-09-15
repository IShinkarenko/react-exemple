import { MarketsMapSelect } from 'components'
import { useTranslation } from 'next-i18next'
import React, { useMemo } from 'react'
import { concatTags, getTagsByType } from 'utils'

const Markets = ({ handleChange, tags, errors, size, requiredTags = [] }) => {
  const { t } = useTranslation('tags')

  const getValues = useMemo(() => (type) => getTagsByType(tags, type), [tags])

  const onHandleChange = ({ options, name: type }) => {
    const newTags = concatTags(tags, options, type)
    handleChange(newTags)
  }

  return (
    <>
      <MarketsMapSelect
        name="OperatingMarket"
        label={`${t('Current Markets')}`}
        handleChange={onHandleChange}
        values={getValues('OperatingMarket')}
        errors={errors}
        size={size}
        required={requiredTags.includes('OperatingMarket')}
      />

      <MarketsMapSelect
        name="DesiredMarket"
        label={`${t('Desired Markets')}`}
        handleChange={onHandleChange}
        values={getValues('DesiredMarket')}
        errors={errors}
        size={size}
        required={requiredTags.includes('DesiredMarket')}
      />
    </>
  )
}

export default Markets
