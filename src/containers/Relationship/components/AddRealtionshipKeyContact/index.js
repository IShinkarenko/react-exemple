import { Box } from '@mui/material'
import { useRelationshipContact } from 'api/hooks'
import clsx from 'clsx'
import { BaseButton, FieldsArray, Input, SubHead } from 'components'
import { Field, FieldArray, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'
import React, { useCallback } from 'react'
import * as yup from 'yup'

import useStyles from './styles'

const addKeyContactSchema = (t) =>
  yup.object().shape({
    name: yup.string().required(t('The field is required')),
    emailAddress: yup.string().email(t('Email address is not valid')),
    socialLinks: yup.array().of(yup.string().url('Link is not valid').required(t('The field is required'))),
  })

const AddRealtionshipKeyContact = ({ contactId, handleSubmitContact, handleCancel }) => {
  const { t } = useTranslation('relationships')
  const classes = useStyles()
  const { data } = useRelationshipContact({
    variables: { skip: !contactId, id: contactId },
  })
  const contact = data?.getRelationshipContact

  const metaData = contact?.metaData ? JSON.parse(contact.metaData) : {}
  const metaKeys = Object.keys(metaData)

  const handleSubmit = useCallback(
    (values) => {
      handleSubmitContact(values)
    },
    [handleSubmitContact]
  )

  const getDefaultValue = useCallback((contact, field, defaultValue) => {
    if (contact && contact[field]) return contact[field]
    else return defaultValue
  }, [])

  return (
    <Formik
      initialValues={{
        name: getDefaultValue(contact, 'name', ''),
        title: getDefaultValue(contact, 'title', ''),
        socialLinks: getDefaultValue(contact, 'socialLinks', []),
        emailAddress: getDefaultValue(contact, 'emailAddress', ''),
        homePhoneNumber: getDefaultValue(contact, 'homePhoneNumber', ''),
        mobilePhoneNumber: getDefaultValue(contact, 'mobilePhoneNumber', ''),
        officePhoneNumber: getDefaultValue(contact, 'officePhoneNumber', ''),
        note: getDefaultValue(contact, 'note', ''),
      }}
      validationSchema={addKeyContactSchema(t)}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {(formikProps) => (
        <Form>
          <SubHead title={t('General Info')} mt={0} mb={0} />
          <Box className={classes.fieldGroup}>
            <Field name="name" placeholder={t('Name')} component={Input} margin={'dense'} />
            <Field name="title" placeholder={t('Title')} component={Input} margin={'dense'} />
            <Field name="emailAddress" placeholder={t('Email Address')} component={Input} margin={'dense'} />
          </Box>

          <SubHead title="Phones" mt={1} mb={0} />
          <Box className={classes.fieldGroup}>
            <Field name="homePhoneNumber" placeholder={t('Home Phone Number')} component={Input} margin={'dense'} />
            <Field name="mobilePhoneNumber" placeholder={t('Mobile Phone Number')} component={Input} margin={'dense'} />
            <Field name="officePhoneNumber" placeholder={t('Office Phone Number')} component={Input} margin={'dense'} />
          </Box>

          <SubHead
            mt={1}
            mb={0}
            title={t('Social Links')}
            description={t('Social links such as LinkedIn, Facebook etc...')}
          />
          <Box className={clsx(classes.fieldGroup, classes.fieldGroupColumn)}>
            <FieldArray
              name={'socialLinks'}
              render={(arrayHelpers) => <FieldsArray {...formikProps} {...arrayHelpers} label={t('Link')} limit={5} />}
            />
          </Box>

          <SubHead title={t('Notes')} mt={1} mb={0} />
          <Box className={classes.fieldSpan}>
            <Field name="note" component={Input} margin={'dense'} />
          </Box>

          {metaKeys.length > 0 ? (
            <>
              <SubHead title={t('Expansion Data')} mt={1} mb={0} />
              <Box className={classes.metaSpan}>
                {metaKeys.map((key, index) => (
                  <>
                    <span className={classes.metaName} key={key}>
                      {t(key)}:{' '}
                    </span>
                    <span>{index === metaKeys.length - 1 ? t(metaData[key]) : `${t(metaData[key])}, `}</span>
                  </>
                ))}
              </Box>
            </>
          ) : (
            <></>
          )}

          <Box display="flex" justifyContent="flex-end" mt={3}>
            <BaseButton title={t('Cancel')} variant="outlined" onClick={handleCancel} />
            <BaseButton title={t('Save')} variant="contained" type="submit" />
          </Box>
        </Form>
      )}
    </Formik>
  )
}

export default AddRealtionshipKeyContact
