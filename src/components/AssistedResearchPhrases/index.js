import { Box } from '@mui/material'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import React, { memo } from 'react'

import Trail from './components/Trail'
import useStyles from './styles'

const Phrases = ({ activeStep, isTraditionalSearch, className }) => {
  const { t } = useTranslation('unauthenticatedSearch')
  const classes = useStyles()

  const phrases = [
    {
      title1: t('grow'),
      title2: t('your'),
      title3: t('business'),
    },
    {
      title1: t('expand'),
      title2: t('your'),
      title3: t('markets'),
    },
    {
      title1: t('achieve'),
      title2: t('stated'),
      title3: t('objectives'),
    },
    {
      title1: t('acquire'),
      title2: t('strategic'),
      title3: t('partners'),
    },
  ]

  return (
    <>
      {isTraditionalSearch ? (
        <Box className={clsx(classes.bgText, className)}>
          <Trail>
            <span>{'Find the Company that fits your goals'}</span>
          </Trail>
        </Box>
      ) : (
        phrases.map(
          ({ title1, title2, title3 }, index) =>
            activeStep === index && (
              <Box key={index} className={classes.bgText}>
                <Trail>
                  <span>{title1}</span>
                  <span>{title2}</span>
                  <span>{title3}</span>
                </Trail>
              </Box>
            )
        )
      )}
    </>
  )
}

export default memo(Phrases)
