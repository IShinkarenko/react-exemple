import { Box } from '@mui/material'
import { PieChart } from 'components'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { rounded } from 'utils'

import useStyles from './styles'

const TotalCompanyEcosystem = ({ sectors, centeredText, totalCompanies }) => {
  const { t } = useTranslation('channels')
  const classes = useStyles()
  const formatedData = sectors.map(({ name, companyCount, estimatedEmployees }) => ({
    id: name,
    label: name,
    value: companyCount,
    estimatedEmployees,
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
        {rounded(totalCompanies)}
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
        title={t('Total Company Ecosystem')}
        data={formatedData}
        handleClick={handleAnalyticClick}
        colors={['#64AABA', '#74D3D1', '#A9E7C3', '#E4F8E1']}
        centredMetric={CenterMetric}
      />
    </Box>
  )
}

export default TotalCompanyEcosystem
