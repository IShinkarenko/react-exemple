import { useTranslation } from 'next-i18next'
import React from 'react'

const ProfileCenteredMetric = ({ centerX, centerY }) => {
  const { t } = useTranslation('analytics')

  return (
    <>
      <text
        x={centerX}
        y={centerY - 15}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: '17px',
          fontWeight: '400',
          color: '#333',
        }}
      >
        {t('Profile Hits')}
      </text>
      <text
        x={centerX}
        y={centerY + 15}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: '30px',
          fontWeight: '400',
          color: '#333',
        }}
      >
        500
      </text>
    </>
  )
}
export default ProfileCenteredMetric
