import { Box, Typography } from '@mui/material'
import { BaseButton, Input } from 'components'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'
import React from 'react'
import * as yup from 'yup'

const signUpConfirmSchema = (t) =>
  yup.object().shape({
    username: yup.string().required(t('Username is required')),
    code: yup.string().required(t('Code is required')),
  })

const SignUpConfirm = ({ confirmSignUp, username, resendConfirmationCode }) => {
  const { t } = useTranslation('auth')

  const handleSubmit = (values) => confirmSignUp(values)

  const handleClick = () => resendConfirmationCode()

  return (
    <Formik
      initialValues={{ username: username, code: '' }}
      validationSchema={signUpConfirmSchema(t)}
      enableReinitialize={true}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <Box mb={3}>
            <Typography variant="h5">{t('Confirm Your Account')}</Typography>
            <Typography variant="subtitle">
              {t(
                'We have sent a code to the email address that you provided. Please enter the code below to continue to the Sign-In prompt.'
              )}
            </Typography>
          </Box>

          <Field name="username" label={t('Preferred Username')} component={Input} />

          <Field name="code" label={t('Confirmation Code')} component={Input} />

          <Box mt={4} display="flex" justifyContent="space-between">
            <BaseButton title={t('Resend Code')} variant="text" onClick={handleClick} isDefault />

            <BaseButton title={t('Confirm')} variant="contained" type="submit" />
          </Box>
        </Form>
      )}
    </Formik>
  )
}

export default SignUpConfirm
