import { Box } from '@mui/material'
import { useCompanyChannels, useCreateCompanyChannel } from 'api/hooks'
import { BaseButton, Input } from 'components'
import { Field, Form, Formik } from 'formik'
import { updateCompanyChannelsCache } from 'libs/cache/updateCompanyChannelsCache'
import { useTranslation } from 'next-i18next'
import React from 'react'
import * as yup from 'yup'

const addNewChannelSchema = (t) =>
  yup.object().shape({
    channelName: yup
      .string()
      .min(2, t('The field should contain min - 2, max - 100 characters'), { min: 2, max: 100 })
      .max(100, t('The field should contain min - 2, max - 100 characters'), { min: 2, max: 100 })
      .required(t('The field is required')),
  })

const AddNewChannel = ({ handleClose, activeCompanyId }) => {
  const { t } = useTranslation('channels')
  const [createCompanyChannel] = useCreateCompanyChannel()
  const { data: data_channels } = useCompanyChannels({
    variables: { id: activeCompanyId && activeCompanyId },
  })
  const newOrderIndex = data_channels?.getCompany?.channels?.items.length + 1

  const onHandleSubmit = (values) => {
    createCompanyChannel({
      variables: {
        input: {
          companyId: activeCompanyId,
          name: values.channelName,
          orderIndex: newOrderIndex,
          instanceStatus: 'Suggested',
        },
      },
      update: (cache, { data }) => updateCompanyChannelsCache({ activeCompanyId, cache, data }),
    })
  }

  return (
    <Formik initialValues={{ channelName: '' }} onSubmit={onHandleSubmit} validationSchema={addNewChannelSchema(t)}>
      {() => (
        <Form>
          <Field name="channelName" label={`${t('Channel Name')}`} component={Input} />

          <Box mt={4} display="flex" justifyContent="flex-end">
            <BaseButton title={`${t('Cancel')}`} onClick={handleClose} variant="outlined" />
            <BaseButton title={`${t('Add')}`} onClick={handleClose} variant="contained" type="submit" />
          </Box>
        </Form>
      )}
    </Formik>
  )
}

export default AddNewChannel
