import HistoryIcon from '@mui/icons-material/History'
import SearchIcon from '@mui/icons-material/Search'
import { Box } from '@mui/material'
import { PageHead, TabPanel, Tabs } from 'components'
import { useTranslation } from 'next-i18next'
import React, { useCallback, useMemo } from 'react'
import SwipeableViews from 'react-swipeable-views'

import Search from './components/Search'
import SearchHistory from './components/SearchHistory'
import { useResearchState } from './hooks/useResearchState'
import useStyles from './styles'

const AssistedSearch = () => {
  const { t } = useTranslation('assistedResearch')
  const classes = useStyles()
  const [state, dispatch] = useResearchState()
  const steps = useMemo(
    () => [
      {
        step: 0,
        label: t('Your Sectors'),
        required: ['OperatingSector'],
      },
      {
        step: 1,
        label: t('Your Markets'),
        required: ['OperatingMarket'],
      },
      {
        step: 2,
        label: t('Your Objectives'),
        required: ['DesiredObjective'],
      },
      {
        step: 3,
        label: t('Our AI Suggestions'),
        required: [],
      },
    ],
    [t]
  )

  const tabs = [
    { title: t('Match'), icon: <SearchIcon /> },
    { title: t('History'), icon: <HistoryIcon /> },
  ]

  const handleChange = useCallback(
    (_, tab) => {
      dispatch({ type: 'SET_ACTIVE_TAB', payload: tab })
      dispatch({ type: 'SET_RESULTS', payload: false })
    },
    [dispatch]
  )

  const handleChangeIndex = useCallback(
    (index) => {
      dispatch({ type: 'SET_ACTIVE_TAB', payload: index })
    },
    [dispatch]
  )

  return (
    <>
      <PageHead
        title={t('Assisted Research')}
        right={<Tabs tabs={tabs} activeTab={state.activeTab} handleChange={handleChange} />}
      />

      <Box className={classes.container}>
        <SwipeableViews index={state.activeTab} onChangeIndex={handleChangeIndex} containerStyle={{ height: '100%' }}>
          <TabPanel value={state.activeTab} index={0} classes={{ root: classes.tabPanelRoot }}>
            <Search steps={steps} dispatch={dispatch} state={state} />
          </TabPanel>

          <TabPanel value={state.activeTab} index={1}>
            <SearchHistory state={state} dispatch={dispatch} />
          </TabPanel>
        </SwipeableViews>
      </Box>
    </>
  )
}

export default AssistedSearch
