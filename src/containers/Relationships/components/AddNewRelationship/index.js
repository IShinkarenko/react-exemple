import InfoIcon from '@mui/icons-material/Info'
import { Box, Tooltip, Typography } from '@mui/material'
import { useCompanyDefinitions, useCreateCompanyRelationship } from 'api/hooks'
import { BaseButton, Input, SectionLoader } from 'components'
import ChipSelect from 'components/ChipSelect'
import { RELATIONSHIP_CUSTOM_FIELD, RELATIONSHIP_SOURCE, RELATIONSHIP_STANDARD_TAG, RELATIONSHIP_TYPE } from 'constant'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { memo, useCallback, useState } from 'react'
import routes from 'routes'
import { appendProtocol, extractIds, generateIdValuePair, getDefinitionsByType } from 'utils'
import * as yup from 'yup'

import useStyles from './styles'

const addRelationshipSchema = (t) =>
  yup.object().shape({
    name: yup.string().required(t('Company Name is required')),
  })

const AddRelationship = ({ handleCancel }) => {
  const { t } = useTranslation(['relationships'])
  const router = useRouter()
  const {
    query: { companyId },
  } = router
  const classes = useStyles()
  const [typesValue, setTypesValue] = useState([])
  const [sourcesValue, setSourcesValue] = useState([])
  const [tagsValue, setTagsValue] = useState([])

  const { loading, data } = useCompanyDefinitions({
    fetchPolicy: 'network-only',
    variables: {
      id: companyId,
      filter: {
        definitionType: [RELATIONSHIP_CUSTOM_FIELD, RELATIONSHIP_TYPE, RELATIONSHIP_SOURCE, RELATIONSHIP_STANDARD_TAG],
      },
    },
  })
  const definitions = data?.getCompany?.definitions?.items

  const [createCompanyRelationship] = useCreateCompanyRelationship({
    onCompleted: ({ createCompanyRelationship: { id } }) =>
      router.push({
        pathname: routes.companyRelationship,
        query: { companyId, relationshipId: id },
      }),
  })

  const handleChangeTypes = useCallback(({ options }) => {
    setTypesValue(options)
  }, [])

  const handleChangeSources = useCallback(({ options }) => {
    setSourcesValue(options)
  }, [])

  const handleChangeTags = useCallback(({ options }) => {
    setTagsValue(options)
  }, [])

  const handleSubmit = useCallback(
    ({ name, websiteUrl }) => {
      const customFieldsFromSettings = getDefinitionsByType(definitions, RELATIONSHIP_CUSTOM_FIELD)
      const normilizedData = {
        name,
        companyId,
        websiteUrl: appendProtocol(websiteUrl),
        sources: extractIds(sourcesValue),
        types: extractIds(typesValue),
        standardTags: extractIds(tagsValue),
        customFields: generateIdValuePair(customFieldsFromSettings),
        status: 'None',
        channels: [],
        sourceType: 'ManualEntry',
      }

      createCompanyRelationship({
        variables: {
          input: normilizedData,
        },
      })
    },
    [companyId, createCompanyRelationship, definitions, sourcesValue, tagsValue, typesValue]
  )

  if (loading) return <SectionLoader />

  return (
    <Formik
      initialValues={{ name: '', websiteUrl: '' }}
      validationSchema={addRelationshipSchema(t)}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <Field name="name" label={t('Company Name')} component={Input} />

          <Field name="websiteUrl" label={t('Website URL')} component={Input} />

          <Box mt={4} display="flex">
            <Box className={classes.listingFilters}>
              <Typography variant="h6">{t('Optional Listing Filters')}</Typography>
            </Box>

            <Tooltip
              title={t(
                'Listing filters are defined in the Settings and are used to classify the company added for quick reference in the list.'
              )}
            >
              <InfoIcon fontSize={'small'} />
            </Tooltip>
          </Box>

          <ChipSelect
            label={t('Relationship Types')}
            name={RELATIONSHIP_TYPE}
            values={typesValue}
            isCheckbox={true}
            freeSolo={false}
            handleChange={handleChangeTypes}
            options={getDefinitionsByType(definitions, RELATIONSHIP_TYPE) || []}
            className={classes.chipsField}
          />

          <ChipSelect
            label={t('Sources')}
            name={RELATIONSHIP_SOURCE}
            values={sourcesValue}
            isCheckbox={true}
            freeSolo={false}
            handleChange={handleChangeSources}
            options={getDefinitionsByType(definitions, RELATIONSHIP_SOURCE) || []}
            className={classes.chipsField}
          />

          <ChipSelect
            label={t('Standard Tags')}
            name={RELATIONSHIP_STANDARD_TAG}
            values={tagsValue}
            isCheckbox={true}
            freeSolo={false}
            handleChange={handleChangeTags}
            options={getDefinitionsByType(definitions, RELATIONSHIP_STANDARD_TAG) || []}
            className={classes.chipsField}
          />

          <Box mt={4} display="flex" justifyContent="flex-end">
            <BaseButton title={t('Cancel')} variant="outlined" onClick={handleCancel} />

            <BaseButton title={t('Save')} variant="contained" type="submit" />
          </Box>
        </Form>
      )}
    </Formik>
  )
}

export default memo(AddRelationship)
