import { Box, CircularProgress } from '@mui/material'
import {
  useCompanyProfileSection,
  useCreateProfileSectionItem,
  useProfileSectionItem,
  useUpdateProfileSectionItem,
} from 'api/hooks'
import { BaseButton } from 'components'
import { itemTypes } from 'containers/CompanyProfile/constants'
import { Form, Formik } from 'formik'
import { updateProfileSectionItemsCache } from 'libs/cache/updateProfileSectionItemsCache'
import { useTranslation } from 'next-i18next'
import React from 'react'
import * as yup from 'yup'

const validationSchema = (t) =>
  yup.object().shape({
    visibilityLevel: yup.string().required(t('The field is required')),
  })

const FormWrapper = ({
  children,
  sectionId,
  editorMarkup,
  initialValues,
  sectionItemId,
  sectionItemType,
  handleDialogClose,
}) => {
  const { t } = useTranslation('companyProfile')
  const [createProfileSectionItem] = useCreateProfileSectionItem()
  const [updateProfileSectionItem] = useUpdateProfileSectionItem()
  const { data: data_profileSection } = useCompanyProfileSection({ variables: { id: sectionId } })
  const itemsList = data_profileSection?.getCompanyProfileSection?.items?.items

  const { loading, data: data_sectionItem } = useProfileSectionItem({
    skip: !sectionItemId,
    variables: { id: sectionItemId },
  })
  const sectionItem = data_sectionItem && data_sectionItem?.getProfileSectionItem
  const itemValues = sectionItem && JSON.parse(sectionItem?.value)
  const isEditMode = !!sectionItemId && !!itemValues

  const getInitialValues = isEditMode ? { ...itemValues, visibilityLevel: sectionItem?.visibilityLevel } : initialValues

  const onHandleSubmit = ({ visibilityLevel, ...rest }) => {
    const orderIndex = isEditMode ? sectionItem.orderIndex : itemsList.length + 1
    const data = {
      companyProfileSectionId: sectionId,
      name: itemTypes[sectionItemType],
      orderIndex,
      visibilityLevel,
      sectionItemType,
      value: editorMarkup ? JSON.stringify({ ...rest, editorMarkup }) : JSON.stringify({ ...rest }),
    }

    if (isEditMode) {
      updateProfileSectionItem({
        variables: {
          input: { id: sectionItemId, ...data },
        },
      })
    } else {
      createProfileSectionItem({
        variables: {
          input: data,
        },
        update: (cache, { data }) => {
          updateProfileSectionItemsCache({ sectionId, cache, data })
        },
      })
    }

    handleDialogClose()
  }

  return (
    <Formik
      initialValues={getInitialValues}
      onSubmit={onHandleSubmit}
      validationSchema={validationSchema(t)}
      enableReinitialize={true}
    >
      <Form>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems={'center'} mt={3} height={'244px'}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {children}
            <Box mt={4} display="flex" justifyContent="flex-end">
              <BaseButton title={t('Cancel')} onClick={handleDialogClose} variant="outlined" />
              <BaseButton variant="contained" type="submit" title={isEditMode ? t('Edit') : t('Add')} />
            </Box>
          </>
        )}
      </Form>
    </Formik>
  )
}

export default FormWrapper
