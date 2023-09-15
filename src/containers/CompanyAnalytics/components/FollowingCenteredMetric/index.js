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
        {t('Following')}
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
        +5
      </text>
    </>
  )
}

export default ProfileCenteredMetric
