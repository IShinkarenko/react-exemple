import clsx from 'clsx'
import { SearchField } from 'components'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'
import React, { memo, useCallback } from 'react'

import useStyles from './styles'

const BasicSearchField = ({ handleSearch, className, inputClassName, handleReset = () => null, value, ...rest }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()

  const handleSubmit = useCallback(
    ({ text }, { resetForm }) => {
      handleSearch(text)

      if (!value) {
        resetForm({ text: '' })
      }
    },
    [handleSearch, value]
  )

  return (
    <Formik initialValues={{ text: value || '' }} enableReinitialize onSubmit={handleSubmit}>
      {() => (
        <Form className={className}>
          <Field name="text">
            {({ field, form: { setFieldValue } }) => (
              <SearchField
                {...field}
                placeholder={t('Search...')}
                autoFocus
                isSubmit
                className={clsx(classes.traditionalField, inputClassName)}
                handleResetSearch={() => {
                  setFieldValue('text', '')
                  handleReset()
                }}
                {...rest}
              />
            )}
          </Field>
        </Form>
      )}
    </Formik>
  )
}

export default memo(BasicSearchField)
