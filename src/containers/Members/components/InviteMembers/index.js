import { Box, Divider, Grid, Paper } from '@mui/material'
import { BaseButton, MembersFieldsArray, StepSubHeader } from 'components'
import { FieldArray, Form, Formik } from 'formik'
import { isEmpty } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import * as React from 'react'
import * as Yup from 'yup'

import useStyle from './styles'

const InviteMembers = ({ handleIviteViewToggle }) => {
  const { t } = useTranslation(['teamMembers', 'common'])
  const classes = useStyle()

  const handleCancel = () => {
    handleIviteViewToggle()
  }

  const handleSave = (values) => {
    console.log(values)
  }

  return (
    <Formik
      initialValues={{ members: [{ email: '', role: '' }] }}
      validationSchema={Yup.object().shape({
        members: Yup.array().of(
          Yup.object().shape({
            email: Yup.string().email(t('Email address is not valid')).required(t('Email is required')),
            role: Yup.string().required(t('Role is required')),
          })
        ),
      })}
      onSubmit={handleSave}
    >
      {(formikProps) => (
        <Form className={classes.memberForm}>
          <Paper className={classes.memberPaper}>
            <Box className={classes.header}>
              <StepSubHeader
                header={t('Invite Members to Your Organization')}
                body={t('Invite as many participants as you want')}
              />

              <Box className={classes.headerButtons}>
                <BaseButton title={t('Cancel')} variant="outlined" onClick={handleCancel} />
                <BaseButton title={t('Save')} disabled={!isEmpty(formikProps.errors)} type="submit" />
              </Box>
            </Box>

            <Divider />

            <Box className={classes.emails}>
              <Grid item xs={12}>
                <FieldArray
                  name={'members'}
                  render={(arrayHelpers) => <MembersFieldsArray {...formikProps} {...arrayHelpers} limit={5} />}
                />
              </Grid>
            </Box>
          </Paper>
        </Form>
      )}
    </Formik>
  )
}

export default InviteMembers
