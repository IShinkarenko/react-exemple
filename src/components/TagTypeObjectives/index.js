import { ChipSelect } from 'components'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { concatTags, getTagsByType } from 'utils'

const Objectives = ({ handleChange, tags, errors, freeSolo, size, requiredTags = [] }) => {
  const { t } = useTranslation('tags')
  const router = useRouter()

  const optionsBasePath = `/static/locales/${router.locale}/lists`

  const getValues = useMemo(() => (type) => getTagsByType(tags, type), [tags])

  const onHandleChange = ({ options, name: type }) => {
    const newTags = concatTags(tags, options, type)
    handleChange(newTags)
  }

  return (
    <ChipSelect
      name="DesiredObjective"
      label={`${t('Strategic Objectives')}`}
      jsonUrl={`${optionsBasePath}/objectives.json`}
      values={getValues('DesiredObjective')}
      handleChange={onHandleChange}
      errors={errors}
      freeSolo={freeSolo}
      size={size}
      required={requiredTags.includes('DesiredObjective')}
    />
  )
}

export default Objectives
