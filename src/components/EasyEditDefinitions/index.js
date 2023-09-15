import { useLazyQuery } from '@apollo/client'
import CloseIcon from '@mui/icons-material/Close'
import DoneIcon from '@mui/icons-material/Done'
import { Box } from '@mui/material'
import { GET_COMPANY_DEFINITIONS } from 'api/hooks/queries/useCompanyDefinitions/useCompanyDefinitions.gql'
import { isEmpty } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { memo, useCallback, useEffect, useState } from 'react'
import EasyEdit from 'react-easy-edit'
import { getDefinitionsById } from 'utils'

import DisplayComponent from './components/DisplayComponent'
import EditComponent from './components/EditComponent'

const EasyEditDefinitions = ({
  name,
  value,
  maxWidth,
  handleSave,
  handleClick,
  extractLabel,
  definitionType,
  disableAutoSubmit = false,
}) => {
  const { t } = useTranslation('common')
  const {
    query: { companyId },
  } = useRouter()
  const [tagsValue, setTagsValue] = useState([])
  const [getDefinitions, { loading, data }] = useLazyQuery(GET_COMPANY_DEFINITIONS)
  const options = data?.getCompany?.definitions?.items || []
  const renderValue = isEmpty(value) ? null : getDefinitionsById(options, value)

  useEffect(() => {
    if (!isEmpty(value)) {
      handleLoadOptions()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLoadOptions = () => {
    getDefinitions({
      variables: {
        id: companyId,
        filter: { definitionType },
      },
    })
  }

  const onHandleSave = useCallback(() => {
    handleSave({ name, value: tagsValue })
  }, [handleSave, name, tagsValue])

  const handleChange = useCallback((newTags) => {
    setTagsValue(newTags)
  }, [])

  return (
    <Box display="flex" alignItems="center" onClick={handleClick} maxWidth={maxWidth}>
      <EasyEdit
        type="text"
        value={renderValue}
        onSave={onHandleSave}
        displayComponent={<DisplayComponent extractLabel={extractLabel} />}
        editComponent={
          <EditComponent
            name={name}
            loading={loading}
            options={options}
            extractLabel={extractLabel}
            handleChange={handleChange}
            handleLoadOptions={handleLoadOptions}
          />
        }
        saveButtonLabel={<DoneIcon />}
        cancelButtonLabel={<CloseIcon />}
        disableAutoSubmit={disableAutoSubmit}
        placeholder={t('Click to edit')}
      />
    </Box>
  )
}

export default memo(EasyEditDefinitions)
