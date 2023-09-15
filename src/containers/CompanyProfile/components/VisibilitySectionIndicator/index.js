import clsx from 'clsx'
import { sectionLevels } from 'constant'
import { useTranslation } from 'next-i18next'
import React from 'react'

import useStyles from './styles'

const VisibilitySectionIndicator = ({ visibilityLevel, className, isLabel = true }) => {
  const { t } = useTranslation('common')

  const classes = useStyles({ visibilityLevel })

  return <span className={clsx(classes.badget, className)}>{isLabel && t(`${sectionLevels[visibilityLevel]}`)}</span>
}

export default VisibilitySectionIndicator
