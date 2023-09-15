import 'react-circular-progressbar/dist/styles.css'

import { Input } from 'components'
import { Field, Form, Formik, getIn } from 'formik'
import { useTranslation } from 'next-i18next'
import React, { memo, useCallback } from 'react'
import { PASSWORD_REGEX, USER_NAME_REGEX } from 'utils/validation'
import * as yup from 'yup'

import useStyles from './styles'

const signUpSchema = (t) =>
  yup.object().shape({
    username: yup.string().required(t('Username is required')).matches(USER_NAME_REGEX, t('Username is invalid')),
    name: yup.string().required(t('Name is required')),
    email: yup.string().required(t('E-mail Address is requred')).email(t('Your E-mail Address is invalid')),
    password: yup
      .string()
      .matches(
        PASSWORD_REGEX,
        t(
          'Please make sure your password is min 8 characters and contains at least 1 uppercase letter, 1 lowercase letter, 1 special symbol and 1 digit'
        )
      )
      .required(t('Password is required')),
    passwordRepeat: yup
      .string()
      .when('password', {
        is: (password) => !!password,
        then: yup.string().required(t('This field is required')),
      })
      .oneOf([yup.ref('password')], t(`The Repeat Password confirmation does't match`)),
  })

const ProfileInformation = ({ dispatch, initialValues }) => {
  const { t } = useTranslation('auth')
  const classes = useStyles()

  const handleScoreChange = useCallback(
    (score) => {
      dispatch({ type: 'SET_PERSONAL_SCORE', payload: score.length })
    },
    [dispatch]
  )

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => console.log(values)}
        validationSchema={signUpSchema(t)}
      >
        {({ values, errors, touched, handleBlur, setFieldTouched, setFieldValue }) => {
          const onHandleBlur = (e, name) => {
            const errorMessage = getIn(errors, name)
            const isError = errorMessage && getIn(touched, name)
            const score = Object.values(values).filter((value) => !!value)

            handleBlur(e)

            if ((!isError && values[name]) || (isError && !values[name])) {
              handleScoreChange(score)
            }
          }

          const sanitizePhone = (value) => {
            return value.replace(/[^0-9\+]/g, '')
          }

          const handleChange = (name, value) => {
            setFieldValue(name, value)
            setFieldTouched(name)
            dispatch({ type: 'SET_INITIAL_VALUES', payload: { [name]: value } })
          }

          return (
            <Form className={classes.form}>
              <Field
                name="name"
                label={t('Your Name')}
                component={Input}
                onBlur={(e) => onHandleBlur(e, 'name')}
                onChange={(e) => handleChange('name', e.target.value)}
                inputProps={{
                  autoComplete: 'new-password',
                }}
                required
              />

              <Field
                name="username"
                label={t('Prefered Username')}
                component={Input}
                onBlur={(e) => onHandleBlur(e, 'username')}
                onChange={(e) => handleChange('username', e.target.value)}
                inputProps={{
                  autoComplete: 'new-password',
                }}
                required
              />

              <Field
                name="password"
                label={t('Password')}
                type="password"
                component={Input}
                onBlur={(e) => onHandleBlur(e, 'password')}
                onChange={(e) => handleChange('password', e.target.value)}
                inputProps={{
                  autoComplete: 'new-password',
                }}
                required
              />

              <Field
                name="passwordRepeat"
                label={t('Repeat password')}
                type="password"
                component={Input}
                onBlur={(e) => onHandleBlur(e, 'passwordRepeat')}
                onChange={(e) => handleChange('passwordRepeat', e.target.value)}
                inputProps={{
                  autoComplete: 'new-password',
                }}
                required
              />

              <Field
                name="email"
                label={t('Email')}
                component={Input}
                onBlur={(e) => onHandleBlur(e, 'email')}
                onChange={(e) => handleChange('email', e.target.value)}
                inputProps={{
                  autoComplete: 'new-password',
                }}
                required
              />

              <Field
                name="phone_number"
                label={t('Phone Number')}
                component={Input}
                onBlur={(e) => onHandleBlur(e, 'phone_number')}
                onChange={(e) => handleChange('phone_number', sanitizePhone(e.target.value))}
                inputProps={{
                  autoComplete: 'new-password',
                }}
              />
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default memo(ProfileInformation)
