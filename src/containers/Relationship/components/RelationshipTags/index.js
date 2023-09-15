import { Box, Typography } from '@mui/material'
import { EasyEditDefinitions, InfoItem } from 'components'
import { RELATIONSHIP_SOURCE, RELATIONSHIP_STANDARD_TAG, RELATIONSHIP_TYPE } from 'constant'
import { useTranslation } from 'next-i18next'
import React, { memo, useCallback } from 'react'

import useStyles from './styles'

const RelationshipTags = ({ types, sources, standardTags, handleUpdateRelationship }) => {
  const { t } = useTranslation('relationships')
  const classes = useStyles()

  const handleSaveDefinition = useCallback(
    ({ name, value: newDefinitions }) => {
      const definitonsIds = newDefinitions.map(({ id }) => id)

      handleUpdateRelationship({ name, value: definitonsIds })
    },
    [handleUpdateRelationship]
  )

  return (
    <Box className={classes.relationshipTagsWrapper}>
      <Box className={classes.tagsHead}>
        <Typography variant="subtitle2">{t('Listing Filters')}</Typography>
      </Box>

      <InfoItem
        title={t('Relationship Types')}
        text={
          <EasyEditDefinitions
            name={'types'}
            value={types}
            label={t('Relationship Types')}
            definitionType={[RELATIONSHIP_TYPE]}
            disableAutoSubmit
            handleSave={handleSaveDefinition}
            extractLabel={(option) => option.name}
          />
        }
        direction={'column'}
        className={classes.relationshipTagsItem}
      />

      <InfoItem
        title={t('Sources')}
        text={
          <EasyEditDefinitions
            name={'sources'}
            value={sources}
            label={t('Sources')}
            definitionType={[RELATIONSHIP_SOURCE]}
            disableAutoSubmit
            handleSave={handleSaveDefinition}
            extractLabel={(option) => option.name}
          />
        }
        direction={'column'}
        className={classes.relationshipTagsItem}
      />

      <InfoItem
        title={t('Tags')}
        text={
          <EasyEditDefinitions
            name={'standardTags'}
            value={standardTags}
            label={t('Tags')}
            definitionType={[RELATIONSHIP_STANDARD_TAG]}
            disableAutoSubmit
            handleSave={handleSaveDefinition}
            extractLabel={(option) => option.name}
          />
        }
        direction={'column'}
        className={classes.relationshipTagsItem}
      />
    </Box>
  )
}

export default memo(RelationshipTags)
