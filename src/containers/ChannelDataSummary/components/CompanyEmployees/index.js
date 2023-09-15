import { Box } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { PieChart } from 'components'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { rounded } from 'utils'

import useStyles from './styles'

const CompanyEmployees = ({ sizes, centeredText, totalEmployees }) => {
  const { t } = useTranslation('channels')
  const classes = useStyles()
  const matches = useMediaQuery('(max-width:1200px)')
  const formatedData = sizes.map(({ name, estimatedEmployees, companyCount }) => ({
    id: name,
    label: name,
    value: estimatedEmployees,
    companyCount,
  }))

  const handleAnalyticClick = () => {}

  const CenterMetric = ({ centerX, centerY }) => (
    <>
      <text
        x={centerX}
        y={centeredText ? centerY - 15 : centerY}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: '30px',
          fontWeight: '400',
          color: '#333',
        }}
      >
        {rounded(totalEmployees)}
      </text>

      {centeredText && (
        <text
          x={centerX}
          y={centerY + 15}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontSize: '14px',
            fontWeight: '400',
            color: '#333',
          }}
        >
          {centeredText}
        </text>
      )}
    </>
  )

  return (
    <Box className={classes.totalCompanyData}>
      <PieChart
        title={t('Company Employees')}
        data={formatedData}
        handleClick={handleAnalyticClick}
        colors={['#56A496', '#64AABA', '#74D3D1', '#85DAC9', '#A9E7C3', '#CEF3D0', '#E4F8E1']}
        centredMetric={CenterMetric}
        enableArcLabels={false}
        legendItemWidth={58}
        legendDirection={matches && 'column'}
        legendAnchor={matches && 'top-right'}
        legendtTanslateX={matches && 70}
        legendtTanslateY={matches && 25}
        legendItemHeight={matches && 25}
        legendtSpacing={matches && 10}
        justify={matches && true}
        margin={matches && { top: 15, right: 120, bottom: 80, left: 40 }}
      />
    </Box>
  )
}

export default CompanyEmployees
