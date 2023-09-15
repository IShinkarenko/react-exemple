import { CustomSelect, Input } from 'components'
import { Field } from 'formik'
import { useFetchJson } from 'hooks/useFetchJson'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { memo } from 'react'
import * as yup from 'yup'

import FormWrapper from '../FormWrapper'

const addKeyContactSchema = (t) =>
  yup.object().shape({
    Name: yup.string().required(t('The field is required')),
    Title: yup.string().required(t('The field is required')),
    Email: yup.string().email(t('Email address is not valid')).required(t('The field is required')),
    visibilityLevel: yup.string().required(t('The field is required')),
  })

const AddKeyContact = ({ handleDialogClose, sectionId, sectionItemId, type }) => {
  const { t } = useTranslation('companyProfile')
  const router = useRouter()
  const optionsBasePath = `/static/locales/${router.locale}/lists`
  const { result } = useFetchJson(`${optionsBasePath}/visibilityLevelOptions.json`)

  return (
    <FormWrapper
      initialValues={{
        Name: '',
        Title: '',
        Email: '',
        LinkedIn: '',
        visibilityLevel: '',
      }}
      validationSchema={addKeyContactSchema(t)}
      sectionId={sectionId}
      sectionItemType={type}
      sectionItemId={sectionItemId}
      handleDialogClose={handleDialogClose}
    >
      <Field name="Name" label={`${t('Name')}`} component={Input} />

      <Field name="Title" label={`${t('Title')}`} component={Input} />

      <Field name="Email" label={`${t('Email')}`} component={Input} />

      <Field name="LinkedIn" label={`${t('LinkedIn')}`} component={Input} />

      <Field name="visibilityLevel" label={t('Visibility Level')} options={result} component={CustomSelect} />
    </FormWrapper>
  )
}

export default memo(AddKeyContact)
