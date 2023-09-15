import DonutLargeIcon from '@mui/icons-material/DonutLarge'
import { Box, Card, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material'
import { ResponsiveBar } from '@nivo/bar'
import { ResponsivePie } from '@nivo/pie'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useRef, useState } from 'react'

import ConnectionsCenteredMetric from './components/ConnectionsCenteredMetric'
import FollowingCenteredMetric from './components/FollowingCenteredMetric'
import ProfileCenteredMetric from './components/ProfileCenteredMetric'
import SharesCenteredMetric from './components/SharesCenteredMetric'
import {
  audienceMarkets,
  audienceSectors,
  audienceSectors2,
  data,
  dataConnections,
  dataFollowing,
  dataShares,
} from './constants'
import useStyles from './styles'

const CompanyAnalytic = () => {
  const { t } = useTranslation('analytics')
  const classes = useStyles()
  const [audience, setAudience] = useState(null)
  const [audienceDetail, setAudienceDetail] = useState(false)
  const myRef = useRef(null)
  const barData = audience === 'Expandigo Network' ? audienceSectors(t) : audienceSectors2(t)

  useEffect(() => {
    if (audience) {
      myRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [audience])

  const handleAnalyticClick = ({ id }) => {
    setAudience(id)
  }

  const handleAudienceClick = ({ indexValue }) => {
    setAudienceDetail(indexValue)
  }

  return (
    <Paper elevation={3} className={classes.wrapper}>
      <Box className={classes.chartsContainer}>
        <Box className={classes.chartMain}>
          <ResponsivePie
            data={data(t)}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            innerRadius={0.6}
            padAngle={1.3}
            cornerRadius={3}
            radialLabelsLinkOffset={7}
            colors={{ datum: 'data.color' }}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            enableArcLinkLabels={false}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
            layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', ProfileCenteredMetric]}
            onClick={handleAnalyticClick}
          />
        </Box>

        <Box className={classes.chartSecondaryContainer}>
          <Box className={classes.chartSecondary}>
            <ResponsivePie
              data={dataShares(t)}
              margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
              innerRadius={0.65}
              padAngle={1.3}
              cornerRadius={3}
              radialLabelsLinkOffset={7}
              colors={{ datum: 'data.color' }}
              activeOuterRadiusOffset={8}
              borderWidth={1}
              borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
              enableArcLinkLabels={false}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor="#333333"
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: 'color' }}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
              layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', SharesCenteredMetric]}
            />
          </Box>
          <Box className={classes.chartSecondary}>
            <ResponsivePie
              data={dataFollowing(t)}
              margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
              innerRadius={0.65}
              padAngle={1.3}
              cornerRadius={3}
              radialLabelsLinkOffset={7}
              colors={{ datum: 'data.color' }}
              activeOuterRadiusOffset={8}
              borderWidth={1}
              borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
              enableArcLinkLabels={false}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor="#333333"
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: 'color' }}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
              layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', FollowingCenteredMetric]}
            />
          </Box>
          <Box className={classes.chartSecondary}>
            <ResponsivePie
              data={dataConnections(t)}
              margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
              innerRadius={0.65}
              padAngle={1.3}
              cornerRadius={3}
              radialLabelsLinkOffset={7}
              colors={{ datum: 'data.color' }}
              activeOuterRadiusOffset={8}
              borderWidth={1}
              borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
              enableArcLinkLabels={false}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor="#333333"
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: 'color' }}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
              layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', ConnectionsCenteredMetric]}
            />
          </Box>
        </Box>
      </Box>

      {audience && (
        <Box ref={myRef} className={classes.audienceWrapper}>
          <Box flex={1}>
            <Typography variant="h5">{t('Audience Sectors')}</Typography>
            <Box className={classes.audience} mt={1} mb={5}>
              <ResponsiveBar
                data={barData}
                keys={['count']}
                indexBy="audience"
                padding={0.3}
                layout="horizontal"
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ datum: 'data.color' }}
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                margin={{ left: 110 }}
                axisTop={null}
                axisRight={null}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                onClick={handleAudienceClick}
              />
            </Box>

            <Typography variant="h5">{t('Audience Markets')}</Typography>
            <Box className={classes.audience} mt={1}>
              <ResponsiveBar
                data={audienceMarkets(t)}
                keys={['count']}
                indexBy="audience"
                padding={0.3}
                layout="horizontal"
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ datum: 'data.color' }}
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                margin={{ left: 110 }}
                axisTop={null}
                axisRight={null}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                onClick={handleAudienceClick}
              />
            </Box>
          </Box>

          {audienceDetail && (
            <Box className={classes.audienceDetails}>
              <Card variant="outlined" className={classes.audienceDetailsCard}>
                <Typography variant="h5">{audienceDetail}</Typography>

                <List>
                  <ListItem>
                    <ListItemIcon>
                      <DonutLargeIcon />
                    </ListItemIcon>
                    <ListItemText>Company</ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <DonutLargeIcon />
                    </ListItemIcon>
                    <ListItemText>Company</ListItemText>
                  </ListItem>
                </List>
              </Card>
            </Box>
          )}
        </Box>
      )}
    </Paper>
  )
}

export default CompanyAnalytic
