import { useTranslation } from 'next-i18next'
import React from 'react'

const ProfileCenteredMetric = ({ centerX, centerY }) => {
  const { t } = useTranslation('analytics')

  return (
    <>
      <text
        x={centerX}
        y={centerY - 12}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: '13px',
          fontWeight: '400',
          color: '#333',
        }}
      >
        {t('Connections')}
      </text>
      <text
        x={centerX}
        y={centerY + 12}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: '25px',
          fontWeight: '400',
          color: '#333',
        }}
      >
        +17
      </text>
    </>
  )
}

export default ProfileCenteredMetric
