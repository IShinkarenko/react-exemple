import { Box } from '@mui/material'
import { BaseButton, CustomSelect, Input } from 'components'
import { Field, Form, Formik } from 'formik'
import { useFetchJson } from 'hooks/useFetchJson'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { memo, useCallback } from 'react'
import * as yup from 'yup'

const addNewSectionSchema = (t) =>
  yup.object().shape({
    name: yup.string().required(t('The field is required')),
    profileSectionType: yup.string().required(t('The field is required')),
    visibilityLevel: yup.string().required(t('The field is required')),
  })

const AddNewSection = ({ profileSections, handleDialogClose, editMode, handleCreateSection, handleUpdateSection }) => {
  const { locale } = useRouter()
  const { t } = useTranslation('companyProfile')
  const optionsBasePath = `/static/locales/${locale}/lists`
  const sectionTypeOptions = useFetchJson(`${optionsBasePath}/sectionTypeOptions.json`)
  const visibilityLevelOptions = useFetchJson(`${optionsBasePath}/visibilityLevelOptions.json`)

  const handleSubmit = useCallback(
    (values) => {
      if (editMode) {
        handleUpdateSection(values)
      } else {
        handleCreateSection(values)
      }
      handleDialogClose()
    },
    [editMode, handleCreateSection, handleDialogClose, handleUpdateSection]
  )

  return (
    <Formik
      initialValues={{
        name: editMode ? profileSections?.name : '',
        profileSectionType: editMode ? profileSections?.profileSectionType : '',
        visibilityLevel: editMode ? profileSections?.visibilityLevel : '',
      }}
      onSubmit={handleSubmit}
      validationSchema={addNewSectionSchema(t)}
    >
      {() => (
        <Form noValidate autoComplete="off">
          <Field name="name" label={t('Section Name')} component={Input} />

          <Field
            name="profileSectionType"
            label={t('Section Type')}
            options={sectionTypeOptions.result}
            component={CustomSelect}
          />

          <Field
            name="visibilityLevel"
            label={t('Visibility Level')}
            options={visibilityLevelOptions.result}
            component={CustomSelect}
          />

          <Box mt={4} display="flex" justifyContent="flex-end">
            <BaseButton title={t('Cancel')} onClick={handleDialogClose} variant="outlined" />
            <BaseButton variant="contained" type="submit" />
          </Box>
        </Form>
      )}
    </Formik>
  )
}

export default memo(AddNewSection)
