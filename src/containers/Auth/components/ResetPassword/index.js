import { Box, Typography } from '@mui/material'
import { BaseButton, Input } from 'components'
import { SIGN_IN } from 'constant'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { USER_NAME_REGEX } from 'utils/validation'
import * as yup from 'yup'

const resetPasswordSchema = (t) =>
  yup.object().shape({
    username: yup.string().required(t('Username is required')).matches(USER_NAME_REGEX, t('Username is invalid')),
  })

const ResetPassword = ({ forgotPassword, setAuthFormType }) => {
  const { t } = useTranslation('auth')

  const handleSubmit = (values) => forgotPassword(values)

  const handleClick = () => setAuthFormType(SIGN_IN)

  return (
    <Formik initialValues={{ username: '' }} onSubmit={handleSubmit} validationSchema={resetPasswordSchema(t)}>
      {() => (
        <Form>
          <Box mb={3}>
            <Typography variant="h4">{t('Reset your password')}</Typography>
          </Box>

          <Field name="username" label={t('Username')} component={Input} />

          <Box mt={4} display="flex" justifyContent="space-between">
            <BaseButton title={t('Back to Sign In')} variant="text" onClick={handleClick} isDefault />

            <BaseButton title={t('Send code')} variant="contained" type="submit" />
          </Box>
        </Form>
      )}
    </Formik>
  )
}

export default ResetPassword
