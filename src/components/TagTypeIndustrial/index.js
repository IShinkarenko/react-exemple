import { ChipSelect } from 'components'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { memo, useCallback, useMemo } from 'react'
import { concatTags, getTagsByType } from 'utils'

const Industrial = ({ handleChange, tags, errors, size, freeSoloUUIDHashValue, requiredTags = [] }) => {
  const { t } = useTranslation('tags')

  const router = useRouter()
  const optionsBasePath = `/static/locales/${router.locale}/lists`

  const getValues = useMemo(() => (type) => getTagsByType(tags, type), [tags])

  const onHandleChange = useCallback(
    ({ options, name: type }) => {
      const newTags = concatTags(tags, options, type)
      handleChange(newTags)
    },
    [handleChange, tags]
  )

  return (
    <>
      <ChipSelect
        name="OperatingSector"
        label={`${t('Current Sector Keywords')}`}
        jsonUrl={`${optionsBasePath}/sectors.json`}
        values={getValues('OperatingSector')}
        handleChange={onHandleChange}
        errors={errors}
        freeSoloUUIDHashValue={freeSoloUUIDHashValue}
        size={size}
        required={requiredTags.includes('OperatingSector')}
      />

      <ChipSelect
        name="DesiredSector"
        label={`${t('Growth Sector Keywords')}`}
        jsonUrl={`${optionsBasePath}/sectors.json`}
        values={getValues('DesiredSector')}
        handleChange={onHandleChange}
        errors={errors}
        freeSoloUUIDHashValue={freeSoloUUIDHashValue}
        size={size}
        required={requiredTags.includes('DesiredSector')}
      />
    </>
  )
}

export default memo(Industrial)
