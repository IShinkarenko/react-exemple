/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import InfoIcon from '@mui/icons-material/Info'
import { Box, Typography } from '@mui/material'
import { EasyEditField, InfoItem } from 'components'
import { RELATIONSHIP_CUSTOM_FIELD } from 'constant'
import { isEmpty } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { generateIdValuePair, getDefinitionsByType, normalizeData } from 'utils'

import useStyles from './styles'

const RelationshipCustomFileds = ({
  customFields: contactCustomFileds,
  customFieldDefinitions = [],
  handleUpdateRelationship,
}) => {
  const { t } = useTranslation('relationships')
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const settingsCustomFields = customFieldDefinitions.map(({ id, ...rest }) => ({
    definitionId: id,
    id,
    ...rest,
  }))
  // Get difference between custom fileds in Settings and custom fileds in Contact
  const newCustomFileds = settingsCustomFields.filter(
    (fied1) => !contactCustomFileds.find((fied2) => fied1.definitionId === fied2.definitionId)
  )

  useEffect(() => {
    if (!isEmpty(newCustomFileds)) {
      setLoading(true)
      const normalizedfields = generateIdValuePair(newCustomFileds)

      handleUpdateRelationship({
        name: 'customFields',
        value: normalizeData([...contactCustomFileds, ...normalizedfields]),
      })
      setLoading(false)
    }
  }, [])

  const getCustomFieldLabel = useCallback(
    (definitionId) => {
      return customFieldDefinitions.find(({ id }) => id === definitionId)
    },
    [customFieldDefinitions]
  )

  const onHandleEditField = useCallback(
    (data, id) => {
      const clonedCustomFields = [...contactCustomFileds]
      const newCustomFields = clonedCustomFields.map(({ __typename, ...rest }) =>
        rest.id === id ? { ...rest, value: data.value } : rest
      )

      handleUpdateRelationship({ name: 'customFields', value: newCustomFields })
    },
    [contactCustomFileds, handleUpdateRelationship]
  )

  if (loading || isEmpty(contactCustomFileds)) return null

  return (
    <>
      {isEmpty(contactCustomFileds) && (
        <Box className={classes.emtyFields}>
          <InfoIcon />
          <Typography variant="subtitle2">{t('No Custom Fields')}</Typography>
        </Box>
      )}

      {contactCustomFileds.map(({ id, definitionId, value }) => {
        const customField = getCustomFieldLabel(definitionId)
        const configuration = customField && JSON.parse(customField?.configuration)
        const isDropDown = configuration?.type === 'select'

        return (
          <React.Fragment key={id}>
            {customField && (
              <InfoItem
                title={customField?.name}
                direction={'column'}
                text={
                  <EasyEditField
                    value={value}
                    isDropDown={isDropDown}
                    options={isDropDown && configuration?.list}
                    name={'customFields'}
                    handleSave={(data) => onHandleEditField(data, id)}
                    className={classes.customEditfield}
                  />
                }
              />
            )}
          </React.Fragment>
        )
      })}
    </>
  )
}

export default memo(RelationshipCustomFileds)
