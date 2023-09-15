import { Box, Typography } from '@mui/material'
import { ResponsivePie } from '@nivo/pie'
import clsx from 'clsx'
import React, { memo } from 'react'
import { rounded } from 'utils'

import useStyles from './styles'

const PieChart = ({
  data,
  title,
  colors,
  justify,
  className,
  legendAnchor,
  centredMetric,
  legendDirection,
  legendtTanslateX,
  legendtTanslateY,
  legendtSpacing,
  legendItemDirection,
  legendItemWidth,
  legendItemHeight,
  margin,
}) => {
  const classes = useStyles()

  return (
    <>
      <Typography variant="h5" className={classes.pieChartTitle}>
        {title}
      </Typography>

      <Box className={clsx(classes.pie, className)}>
        <ResponsivePie
          data={data}
          height={350}
          margin={margin ? margin : { top: 15, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.6}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          colors={colors}
          borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          enableArcLinkLabels={false}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          enableArcLabels={false}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
          layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', centredMetric]}
          tooltip={({
            datum: {
              id,
              value,
              color,
              data: { companyCount, estimatedEmployees },
            },
          }) => {
            return (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  backgroundColor: '#333333a8',
                  padding: 4,
                  color: '#fff',
                  borderRadius: 5,
                }}
              >
                <div style={{ backgroundColor: color, width: 10, height: 10, borderRadius: '50%' }}></div>

                <div style={{ marginLeft: 5 }}>
                  <div style={{ fontSize: 14 }}>{id}</div>

                  <div>
                    {companyCount ? (
                      <>
                        <div style={{ fontSize: 12, marginTop: 5 }}>Employees - {rounded(value)}</div>
                        <div style={{ fontSize: 12, marginTop: 5 }}>Companies - {rounded(companyCount)}</div>
                      </>
                    ) : (
                      <>
                        <div style={{ fontSize: 12, marginTop: 5 }}>Companies - {rounded(value)}</div>
                        <div style={{ fontSize: 12, marginTop: 5 }}>Employees - {rounded(estimatedEmployees)}</div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          }}
          legends={[
            {
              anchor: legendAnchor ? legendAnchor : 'bottom',
              direction: legendDirection ? legendDirection : 'row',
              justify: justify ? justify : false,
              translateX: legendtTanslateX ? legendtTanslateX : 0,
              translateY: legendtTanslateY ? legendtTanslateY : 56,
              itemsSpacing: legendtSpacing ? legendtSpacing : 5,
              itemWidth: legendItemWidth ? legendItemWidth : 90,
              itemHeight: legendItemHeight ? legendItemHeight : 18,
              itemTextColor: '#999',
              itemDirection: legendItemDirection ? legendItemDirection : 'top-to-bottom',
              itemOpacity: 1,
              symbolSize: 10,
              symbolShape: 'circle',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000',
                  },
                },
              ],
            },
          ]}
        />
      </Box>
    </>
  )
}

export default memo(PieChart)
