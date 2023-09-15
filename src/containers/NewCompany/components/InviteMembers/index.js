import { Box, Divider, Grid } from '@mui/material'
import { MembersFieldsArray, NavigationButtons, StepSubHeader } from 'components'
import { FieldArray, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'
import * as React from 'react'
import * as Yup from 'yup'

import useStyle from './styles'

const InviteMembers = ({ setActiveStep }) => {
  const classes = useStyle()
  const { t } = useTranslation(['createCompany', 'common'])

  const handleSave = (values) => {
    console.log('save', values)
    // const emails = email.filter((email) => email !== '')
  }

  return (
    <>
      <Box className={classes.container}>
        <Formik
          initialValues={{ members: [{ email: '', role: '' }] }}
          validationSchema={Yup.object().shape({
            members: Yup.array().of(
              Yup.object().shape({
                email: Yup.string().email(t('Email address is not valid')),
              })
            ),
          })}
          onSubmit={(values) => handleSave(values)}
        >
          {(formikProps) => (
            <Form>
              <Box className={classes.header}>
                <StepSubHeader
                  header={t('Invite Members to Your Organization')}
                  body={t('Invite as many participants as you want')}
                />
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
            </Form>
          )}
        </Formik>
      </Box>

      <NavigationButtons
        withoutSave
        lastStep={true}
        skip={false}
        activeStep={1}
        handlerNext={(step) => setActiveStep(step)}
        disabled={false}
      />
    </>
  )
}

export default InviteMembers
