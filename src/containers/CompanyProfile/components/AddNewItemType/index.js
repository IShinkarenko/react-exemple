import { CustomSelect, Input } from 'components'
import { itemTypes, itemTypesWithLabels } from 'containers/CompanyProfile/constants'
import { Field } from 'formik'
import { useFetchJson } from 'hooks/useFetchJson'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { memo } from 'react'

import FormWrapper from '../FormWrapper'

const AddNewItemType = ({ handleDialogClose, type, sectionItemId, sectionId }) => {
  const { t } = useTranslation('companyProfile')
  const router = useRouter()
  const optionsBasePath = `/static/locales/${router.locale}/lists`
  const { result: visibilityOptions } = useFetchJson(`${optionsBasePath}/visibilityLevelOptions.json`)
  const isLabelField = itemTypesWithLabels.includes(type)

  return (
    <FormWrapper
      initialValues={{ [type]: '', visibilityLevel: '' }}
      sectionId={sectionId}
      sectionItemType={type}
      sectionItemId={sectionItemId}
      handleDialogClose={handleDialogClose}
    >
      {isLabelField && <Field name={'label'} label={t('Label')} component={Input} />}

      <Field name={type} label={t(`${itemTypes[type]}`)} component={Input} />

      <Field
        name="visibilityLevel"
        label={t('Visibility Level')}
        options={visibilityOptions}
        component={CustomSelect}
      />
    </FormWrapper>
  )
}

export default memo(AddNewItemType)
