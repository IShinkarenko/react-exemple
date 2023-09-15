import { Box, Typography } from '@mui/material'
import AnimatedNumber from 'animated-number-react'
import { useChannelDataSummary } from 'api/hooks'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { memo } from 'react'
import { formatNumber } from 'utils'

import CompanyEmployees from './components/CompanyEmployees'
import DataIntegrity from './components/DataIntegrity'
import MapChart from './components/MapChart'
import TotalCompanyEcosystem from './components/TotalCompanyEcosystem'
import useStyles from './styles'

const ChannelDataSummary = () => {
  const { t } = useTranslation('channels')
  const classes = useStyles()
  const {
    query: { channelId },
  } = useRouter()
  const { loading, data } = useChannelDataSummary({ skip: !channelId, variables: { id: channelId } })
  const channelSummary = data?.getCompanyChannel?.summary
  const summary = channelSummary && JSON.parse(channelSummary)
  const formatValue = (value) => formatNumber(value.toFixed(0))

  if (loading) return null

  return (
    <>
      <Box>
        <Box className={classes.generalData}>
          <Box className={classes.grid}></Box>

          <Box className={classes.inner}>
            <Box className={classes.generalDataTitle}>
              <Box className={classes.generalDataTitleInner}>
                <Typography variant="h5" className={classes.heading}>
                  {t('Company Presence')}
                </Typography>

                <Box mb={2} mt={5}>
                  <Typography className={classes.subTitle}>{t('All Companies')}</Typography>
                  <Typography className={classes.subTitleNumber}>
                    <AnimatedNumber value={summary?.companyCount} duration={1500} formatValue={formatValue} />
                  </Typography>
                </Box>

                <Box>
                  <Typography className={classes.subTitle}>{t('All employees')}</Typography>
                  <Typography className={classes.subTitleNumber}>
                    <AnimatedNumber value={summary?.estimatedEmployees} duration={1500} formatValue={formatValue} />
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box className={classes.generalDataMap}>
              <MapChart geographies={summary?.geographies} />
            </Box>
          </Box>
        </Box>

        <Box className={classes.companyInforaphics}>
          <TotalCompanyEcosystem sectors={summary?.sectors} totalCompanies={summary?.companyCount} />

          <CompanyEmployees sizes={summary?.sizes} totalEmployees={summary?.estimatedEmployees} />
        </Box>
      </Box>

      <DataIntegrity metrics={summary?.metrics} totalCompanies={summary?.companyCount} />
    </>
  )
}

export default memo(ChannelDataSummary)
