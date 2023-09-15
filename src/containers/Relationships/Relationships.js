import ListIcon from '@mui/icons-material/List'
import SettingsIcon from '@mui/icons-material/Settings'
import { Box } from '@mui/material'
import { useCompanyDefinitions } from 'api/hooks'
import { PageHead, TabPanel, Tabs } from 'components'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { memo, useCallback, useMemo } from 'react'
import SwipeableViews from 'react-swipeable-views'

import RelationshipCSVUploader from './components/RelationshipCSVUploader'
import RelationshipsDataGrid from './components/RelationshipsDataGrid'
import RelationshipsSettings from './components/RelationshipsSettings'
import { useRelationshipsState } from './hooks/useRelationshipsState'
import useStyles from './styles'

const Relationships = () => {
  const { t } = useTranslation('relationships')
  const {
    query: { companyId },
  } = useRouter()
  const classes = useStyles()
  const [state, dispatch] = useRelationshipsState()
  const { activeTab, isCSVImport } = state

  const { data } = useCompanyDefinitions({
    variables: { id: companyId },
  })
  const companyDefinitions = data?.getCompany?.definitions?.items

  const tabs = useMemo(
    () => [
      { title: t('List'), icon: <ListIcon /> },
      { title: t('Settings'), icon: <SettingsIcon /> },
    ],
    [t]
  )

  const handleChange = useCallback(
    (_, tab) => {
      dispatch({ type: 'SET_ACTIVE_TAB', payload: tab })
    },
    [dispatch]
  )

  const handleChangeIndex = useCallback(
    (index) => {
      dispatch({ type: 'SET_ACTIVE_TAB', payload: index })
    },
    [dispatch]
  )

  if (isCSVImport) {
    return <RelationshipCSVUploader companyId={companyId} dispatch={dispatch} definitions={companyDefinitions} />
  }

  return (
    <>
      <PageHead
        title={t('Relationships')}
        right={<Tabs tabs={tabs} activeTab={activeTab} handleChange={handleChange} />}
        className={classes.relationshipsHeader}
      />

      <Box className={classes.container}>
        <SwipeableViews index={activeTab} onChangeIndex={handleChangeIndex} containerStyle={{ height: '100%' }}>
          <TabPanel value={activeTab} index={0}>
            <RelationshipsDataGrid definitions={companyDefinitions} state={state} dispatch={dispatch} />
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            <RelationshipsSettings definitions={companyDefinitions} />
          </TabPanel>
        </SwipeableViews>
      </Box>
    </>
  )
}

export default memo(Relationships)
