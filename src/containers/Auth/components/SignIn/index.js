import { Box, Typography } from '@mui/material'
import { BaseButton, Input } from 'components'
import { RESET_PASSWORD, SIGN_UP } from 'constant'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { PASSWORD_REGEX } from 'utils/validation'
import * as yup from 'yup'

const signInSchema = (t) =>
  yup.object().shape({
    username: yup.string().required(t('Username is required')),
    password: yup
      .string()
      .matches(
        PASSWORD_REGEX,
        t(
          'Please make sure your password is min 8 characters and contains at least 1 uppercase letter, 1 lowercase letter, 1 special symbol and 1 digit'
        )
      )
      .required(t('Password is required')),
  })

const SignInCustom = ({ signIn, setAuthFormType, username }) => {
  const { t } = useTranslation('auth')

  const handleSubmit = (values) => {
    signIn(values)
  }

  return (
    <Formik
      initialValues={{ username: username ? username : '', password: '' }}
      onSubmit={handleSubmit}
      validationSchema={signInSchema(t)}
      enableReinitialize={true}
    >
      {() => (
        <Form>
          <Box mb={3}>
            <Typography variant="h4">{t('Sign in to your account')}</Typography>
          </Box>

          <Field name="username" label={t('Username')} component={Input} />

          <Field name="password" type="password" label={t('Password')} component={Input} />

          <Box mt={4} display="flex" justifyContent="space-between">
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <BaseButton title={t('Sign Up')} variant="text" onClick={() => setAuthFormType(SIGN_UP)} isDefault />
              <BaseButton
                title={t('Forgot your password?')}
                variant="text"
                onClick={() => setAuthFormType(RESET_PASSWORD)}
                isDefault
              />
            </Box>
            <BaseButton title={t('Sign In')} variant="contained" type="submit" />
          </Box>
        </Form>
      )}
    </Formik>
  )
}

export default SignInCustom
