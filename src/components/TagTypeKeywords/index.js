import { ChipSelect } from 'components'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { concatTags, getTagsByType } from 'utils'

const Keywords = ({ handleChange, tags }) => {
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
      name="Keyword"
      label={t('Other Keywords That Describe Your Company')}
      jsonUrl={`${optionsBasePath}/keywords.json`}
      values={getValues('Keyword')}
      handleChange={onHandleChange}
      noOptionsText={t('Type and press ENTER to add keywords.')}
    />
  )
}

export default Keywords
