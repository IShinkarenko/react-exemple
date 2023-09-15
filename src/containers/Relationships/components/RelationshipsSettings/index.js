import { Box, Paper, Typography } from '@mui/material'
import { useCreateCompanyDefinition, useDeleteCompanyDefinition, useUpdateCompanyDefinition } from 'api/hooks'
import { RELATIONSHIP_CUSTOM_FIELD, RELATIONSHIP_SOURCE, RELATIONSHIP_STANDARD_TAG, RELATIONSHIP_TYPE } from 'constant'
import { updateCompanyDefinitionsCache } from 'libs/cache/updateCompanyDefinitionsCache'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import { getDefinitionsByType } from 'utils'

import ChipSelectSmart from './components/ChipSelectSmart'
import useStyles from './styles'

const RelationshipsSettings = ({ definitions }) => {
  const { t } = useTranslation('relationships')
  const {
    query: { companyId },
  } = useRouter()
  const classes = useStyles()
  const newOrderIndex = definitions.length + 1

  const [createCompanyDefinition] = useCreateCompanyDefinition()
  const [deleteCompanyDefinition] = useDeleteCompanyDefinition()
  const [updateCompanyDefinition] = useUpdateCompanyDefinition()

  const getValues = (type) => getDefinitionsByType(definitions, type)

  const createDefinition = useCallback(
    ({ newValue: name, name: definitionType, configuration }) => {
      createCompanyDefinition({
        variables: {
          input: {
            companyId,
            definitionType,
            name,
            orderIndex: newOrderIndex,
            configuration,
          },
        },
        update: (cache, { data }) => {
          updateCompanyDefinitionsCache({ companyId, cache, data })
        },
      })
    },
    [createCompanyDefinition, companyId, newOrderIndex]
  )

  const deleteDefinition = useCallback(
    ({ id }) => {
      deleteCompanyDefinition({
        variables: {
          id,
        },
        optimisticResponse: {
          __typename: 'Mutation',
          deleteCompanyDefinition: {
            id,
            name,
            __typename: 'CompanyDefinition',
          },
        },
        update: (cache, { data: { deleteCompanyDefinition } }) => {
          cache.evict({ id: cache.identify(deleteCompanyDefinition) })
          cache.gc()
        },
      })
    },
    [deleteCompanyDefinition]
  )

  const updateDefinition = useCallback(
    (name, id, configuration) => {
      updateCompanyDefinition({
        variables: {
          input: {
            id,
            companyId,
            name,
            configuration,
          },
        },
      })
    },
    [companyId, updateCompanyDefinition]
  )

  return (
    <>
      <Paper elevation={3}>
        <Box className={classes.description}>
          <Typography variant="h5">{t('Description')}</Typography>
          <Typography variant="subtitle2" color="secondary">
            {t(
              'The settings below allow you to create custom fields that extend the fields available on any given relationship profile and to quickly filter on the relevant type, source for first point of contact, and any tags that might apply for quick lookups. Some examples are created at sign-up.'
            )}
          </Typography>
        </Box>

        <Box className={classes.chipsWrap}>
          <Box className={classes.chipsInner}>
            <ChipSelectSmart
              label={t('Custom Fields')}
              name={RELATIONSHIP_CUSTOM_FIELD}
              values={getValues(RELATIONSHIP_CUSTOM_FIELD)}
              handleCreate={createDefinition}
              handleDelete={deleteDefinition}
              handleUpdate={updateDefinition}
              className={classes.chipsField}
            />

            <ChipSelectSmart
              editOnly
              label={t('Relationship Types')}
              name={RELATIONSHIP_TYPE}
              values={getValues(RELATIONSHIP_TYPE)}
              handleCreate={createDefinition}
              handleDelete={deleteDefinition}
              handleUpdate={updateDefinition}
              className={classes.chipsField}
            />

            <ChipSelectSmart
              editOnly
              label={t('Sources')}
              name={RELATIONSHIP_SOURCE}
              values={getValues(RELATIONSHIP_SOURCE)}
              handleCreate={createDefinition}
              handleDelete={deleteDefinition}
              handleUpdate={updateDefinition}
              className={classes.chipsField}
            />

            <ChipSelectSmart
              editOnly
              label={t('Standard Tags')}
              name={RELATIONSHIP_STANDARD_TAG}
              values={getValues(RELATIONSHIP_STANDARD_TAG)}
              handleCreate={createDefinition}
              handleDelete={deleteDefinition}
              handleUpdate={updateDefinition}
              className={classes.chipsField}
            />

            {/* {!isCompanyBasic && (
              <ChipSelectSmart
                label={t('Smart Tags')}
                name={RELETIONSHIP_SMART_TAG}
                values={getValues(RELETIONSHIP_SMART_TAG)}
                handleCreate={createDefinition}
                handleDelete={deleteDefinition}
                handleUpdate={updateDefinition}
                className={classes.chipsField}
              />
            )} */}
          </Box>
        </Box>
      </Paper>
    </>
  )
}

export default RelationshipsSettings
