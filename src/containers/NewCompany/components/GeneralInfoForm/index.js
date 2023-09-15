import { ErrorsBgSync, Input } from 'components'
import { Field, Formik } from 'formik'
import { useTranslation } from 'next-i18next'
import React from 'react'
import * as yup from 'yup'

const SpaceBrandingFromSchema = (t) =>
  yup.object().shape({
    name: yup
      .string()
      .min(2, t('The field should contain min - 2, max - 100 characters', { min: 2, max: 100 }))
      .max(100, t('The field should contain min - 2, max - 100 characters', { min: 2, max: 100 }))
      .required(t('Field is required')),
  })

const GeneralInfoForm = ({ dispatch, name, description }) => {
  const { t } = useTranslation('createCompany')

  return (
    <Formik
      initialValues={{ name, description }}
      validationSchema={SpaceBrandingFromSchema(t)}
      onSubmit={(values) => console.log('values', values)}
    >
      {({ handleSubmit, setFieldValue }) => (
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <Field
            name={'name'}
            label={t('Organization Name')}
            component={Input}
            onChange={(e) => {
              dispatch({ type: 'SET_NAME', payload: e.target.value })
              setFieldValue('name', e.target.value)
            }}
          />

          <Field
            name={'description'}
            label={t('Organization Description')}
            component={Input}
            multiline={true}
            rows={5}
            margin={'none'}
            onChange={(e) => {
              dispatch({ type: 'SET_DESCRIPTION', payload: e.target.value })
              setFieldValue('description', e.target.value)
            }}
          />

          <ErrorsBgSync dispatch={dispatch} />
        </form>
      )}
    </Formik>
  )
}

export default GeneralInfoForm
