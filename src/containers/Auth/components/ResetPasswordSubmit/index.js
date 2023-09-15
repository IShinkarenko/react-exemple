import { Box, Typography } from '@mui/material'
import { BaseButton, Input } from 'components'
import { SIGN_IN } from 'constant'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { PASSWORD_REGEX } from 'utils/validation'
import * as yup from 'yup'

const resetPasswordSubmitSchema = (t) =>
  yup.object().shape({
    code: yup.string().required(t('Code is required')),
    new_password: yup
      .string()
      .matches(
        PASSWORD_REGEX,
        t(
          'Please make sure your password is min 8 characters and contains at least 1 uppercase letter, 1 lowercase letter, 1 special symbol and 1 digit'
        )
      )
      .required(t('New password is required')),
  })

const ResetPasswordSubmit = ({ username, forgotPasswordSubmit, setAuthFormType }) => {
  const { t } = useTranslation('footer')

  const handleSubmit = (values) => forgotPasswordSubmit({ ...values, username })

  const handleClick = () => setAuthFormType(SIGN_IN)

  return (
    <Formik
      initialValues={{ code: '', new_password: '' }}
      onSubmit={handleSubmit}
      validationSchema={resetPasswordSubmitSchema(t)}
    >
      {() => (
        <Form>
          <Box mb={3}>
            <Typography variant="h4">{t('Reset your password')}</Typography>
          </Box>

          <Field name="code" label={t('Enter Code')} component={Input} />

          <Field name="new_password" label={t('Enter New Password')} type="password" component={Input} />

          <Box mt={4} display="flex" justifyContent="space-between">
            <BaseButton title={t('Back to Sign In')} variant="text" onClick={handleClick} isDefault />

            <BaseButton title={t('Submit')} variant="contained" type="submit" />
          </Box>
        </Form>
      )}
    </Formik>
  )
}

export default ResetPasswordSubmit
