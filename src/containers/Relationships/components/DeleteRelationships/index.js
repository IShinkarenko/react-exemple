import { Box, Typography } from '@mui/material'
import { useDeleteBatchCompanyRelationship } from 'api/hooks'
import { BaseButton } from 'components'
import { isEmpty } from 'lodash'
import { useTranslation } from 'next-i18next'
import React, { memo, useCallback } from 'react'
import { toast } from 'react-toastify'

const DeleteRelationships = ({ relationshipsIds, relationshipsLength, handleCancel, filter }) => {
  const { t } = useTranslation('relationships')
  const [batchDeleteCompanyRelationship] = useDeleteBatchCompanyRelationship({ onCompleted: () => handleCancel() })
  const isCheckedAll = relationshipsIds.length === relationshipsLength
  const { types, sources, standardTags, searchPhrase } = filter
  const isFiltered = !isEmpty(types) || !isEmpty(sources) || !isEmpty(standardTags) || !!searchPhrase

  const handleDeleteWithFilter = () => {
    batchDeleteCompanyRelationship({
      variables: {
        filter: {
          ...(!isEmpty(types) && { types }),
          ...(!isEmpty(sources) && { sources }),
          ...(!isEmpty(standardTags) && { standardTags }),
          ...(searchPhrase && { searchPhrase: searchPhrase.toLowerCase() }),
        },
      },
    })

    toast.info('Deletion has begun, but may take some time before all filtered relationships are removed.')
  }

  const handleDelete = useCallback(() => {
    batchDeleteCompanyRelationship({
      variables: {
        ids: relationshipsIds,
      },
      update: (cache, { data: { batchDeleteCompanyRelationship } }) => {
        batchDeleteCompanyRelationship.forEach((relationship) => {
          cache.evict({ id: cache.identify(relationship) })
          cache.gc()
        })
      },
    })
  }, [batchDeleteCompanyRelationship, relationshipsIds])

  return (
    <Box>
      <Typography variant="body1">
        {isCheckedAll
          ? t('Delete only current page or all pages?')
          : t('Are you sure you want to delete this relationship(s)? This cannot be undone.')}
      </Typography>

      <Box mt={4} display="flex" justifyContent="flex-end">
        {isCheckedAll ? (
          <BaseButton title={'All Pages'} variant="contained" onClick={handleDeleteWithFilter} disabled={!isFiltered} />
        ) : (
          <BaseButton title={t('Cancel')} variant="outlined" onClick={handleCancel} />
        )}

        <BaseButton title={isCheckedAll ? t('Current Page') : t('Delete')} variant="contained" onClick={handleDelete} />
      </Box>
    </Box>
  )
}

export default memo(DeleteRelationships)
