import { Box } from '@mui/material'
import clsx from 'clsx'
import { EasyEditChipSelect, InfoItem } from 'components'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { memo, useCallback } from 'react'

import useStyles from './styles'

const CompanyTags = ({ tags, handleChange }) => {
  const { t } = useTranslation('companyProfile')
  const classes = useStyles()
  const router = useRouter()
  const optionsBasePath = `/static/locales/${router.locale}/lists`

  const onHandleSave = useCallback(
    (data) => {
      handleChange(data)
    },
    [handleChange]
  )

  const companytagsList = [
    { name: 'OperatingSector', json: `${optionsBasePath}/sectors.json`, label: t('Current Sector Keywords') },
    { name: 'DesiredSector', json: `${optionsBasePath}/sectors.json`, label: t('Growth Sector Keywords') },
    { name: 'OperatingMarket', json: null, label: t('Current Markets') },
    { name: 'DesiredMarket', json: null, label: t('Desired Markets') },
    { name: 'DesiredObjective', json: `${optionsBasePath}/objectives.json`, label: t('Strategic Objectives') },
    {
      name: 'Keyword',
      json: `${optionsBasePath}/keywords.json`,
      label: t('Other Keywords That Describe Your Company'),
      noOptionsText: t('Type and press ENTER to add keywords.'),
    },
  ]

  return (
    <Box mt={3}>
      {companytagsList.map(({ name, label, json, noOptionsText }) => (
        <InfoItem
          key={name}
          title={`${label}:`}
          text={
            <EasyEditChipSelect
              tags={tags}
              name={name}
              json={json}
              handleSave={onHandleSave}
              displayCmpClass={clsx(classes.itemValue, classes.companyTags)}
              disableAutoSubmit={true}
              maxWidth={'750px'}
              noOptionsText={noOptionsText}
            />
          }
          direction={'column'}
        />
      ))}
    </Box>
  )
}

export default memo(CompanyTags)
