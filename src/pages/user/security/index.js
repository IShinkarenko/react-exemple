import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { Box, Paper, Table, TableBody, Typography } from '@mui/material'
import { Auth } from 'aws-amplify'
import { BaseButton, Input, PageHead, TableRowField } from 'components'
import { PASSWORD_REQUIRMENTS } from 'constant'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { PASSWORD_REGEX } from 'utils/validation'
import * as yup from 'yup'

import useStyles from './styles'

const editUserSecuritySchema = (t) =>
  yup.object().shape(
    {
      currentPassword: yup
        .string()
        .min(8, t('Please make sure your password contains at least 8 characters'))
        .when(['newPassword', 'newPasswordRepeat'], {
          is: (newPassword, newPasswordRepeat) => !!newPassword || !!newPasswordRepeat,
          then: yup.string().required(t('This field is required')),
        }),
      newPassword: yup
        .string()
        .matches(
          PASSWORD_REGEX,
          t(
            'Please make sure your password is min 8 characters and contains at least 1 uppercase letter, 1 lowercase letter, 1 special symbol and 1 digit'
          )
        )
        .when(['currentPassword', 'newPasswordRepeat'], {
          is: (currentPassword, newPasswordRepeat) => !!currentPassword || !!newPasswordRepeat,
          then: yup
            .string()
            .required(t('This field is required'))
            .notOneOf([yup.ref('currentPassword')], t(`New password shoudn't be equal current password`)),
        }),
      newPasswordRepeat: yup
        .string()
        .when('newPassword', {
          is: (newPassword) => !!newPassword,
          then: yup.string().required(t('This field is required')),
        })
        .oneOf([yup.ref('newPassword')], t(`The Repeat Password confirmation does't match`)),
    },
    [
      ['newPassword', 'newPasswordRepeat'],
      ['newPassword', 'currentPassword'],
      ['currentPassword', 'newPasswordRepeat'],
    ]
  )

const initialValues = {
  currentPassword: '',
  newPassword: '',
  newPasswordRepeat: '',
}

const EditUserSecurity = () => {
  const { t } = useTranslation('userProfile')

  const classes = useStyles()
  const [authError, setAuthError] = useState('')

  const onPasswordChanged = (data, resetForm) => {
    if (data === 'SUCCESS') {
      resetForm(initialValues)
      toast('🔑  Password changed successfully!!!')
    }
  }

  const handleSubmit = ({ currentPassword, newPassword }, { resetForm }) =>
    Auth.currentAuthenticatedUser()
      .then((user) => {
        return Auth.changePassword(user, currentPassword, newPassword)
      })
      .then((data) => onPasswordChanged(data, resetForm))
      .catch((err) => setAuthError(err.message))

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={editUserSecuritySchema(t)}>
      {({ values, isValid }) => {
        return (
          <Form>
            <PageHead
              title={t('Security')}
              right={
                <BaseButton
                  title={`${t('Save')}`}
                  type="submit"
                  disabled={(!values.currentPassword && !values.newPassword && !values.newPasswordRepeat) || !isValid}
                />
              }
            />

            <Paper elevation={1}>
              <Table className={classes.securityTable}>
                <TableBody>
                  <TableRowField title={t('Change Password')} align="left" classNames={classes.tableRowEdit}>
                    <Box>
                      <Typography className={classes.passTitle} variant="h4">
                        {`${t('Password strength')}:`}
                      </Typography>

                      <Typography color="secondary" className={classes.passRecomend} variant="h5">
                        {`${t('Your password should')}:`}
                      </Typography>

                      <ul className={classes.list}>
                        {PASSWORD_REQUIRMENTS.map((requirement) => (
                          <li key={requirement}>{t(`${requirement}`)}</li>
                        ))}
                      </ul>

                      {authError && (
                        <Box display="flex" alignItems="center">
                          <ErrorOutlineIcon color="error" className={classes.errorIcon} />

                          <Typography variant="body2" color="error">
                            {authError}
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    <Box display="flex" flexDirection="column">
                      <Field
                        type="password"
                        name="currentPassword"
                        label={t('Current Password')}
                        variant="filled"
                        isHandleTouched
                        component={Input}
                        className={classes.securityField}
                      />

                      <Field
                        type="password"
                        name="newPassword"
                        label="New Password"
                        variant="filled"
                        isHandleTouched
                        component={Input}
                        className={classes.securityField}
                      />

                      <Field
                        type="password"
                        name="newPasswordRepeat"
                        label={t('Repeat new password')}
                        variant="filled"
                        isHandleTouched
                        component={Input}
                        className={classes.securityField}
                      />
                    </Box>
                  </TableRowField>
                </TableBody>
              </Table>
            </Paper>
          </Form>
        )
      }}
    </Formik>
  )
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['userProfile', 'userProfileMenu', 'accountMenu'])),
  },
})

export default EditUserSecurity
