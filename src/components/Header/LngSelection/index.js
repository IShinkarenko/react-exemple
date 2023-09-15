import LanguageIcon from '@mui/icons-material/Language'
import { MenuItem } from '@mui/material'
import { DropDownMenuBasic } from 'components'
import { languageLabels } from 'constant'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { memo } from 'react'

import useStyles from './styles'

const LngSelection = () => {
  const classes = useStyles()
  const { t } = useTranslation('accountMenu')
  const router = useRouter()
  const { locales, locale: activeLocale, pathname, query, asPath } = router

  return (
    <>
      <DropDownMenuBasic clickNode={<LanguageIcon />} tooltipTitle={t('Languages')}>
        {locales.map((locale) => (
          <MenuItem
            key={locale}
            selected={locale === activeLocale}
            classes={{ root: classes.lngLink }}
            sx={{
              '&.MuiMenuItem-root.Mui-selected': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <Link href={{ pathname, query }} as={asPath} locale={locale}>
              {t(`${languageLabels[locale]}`)}
            </Link>
          </MenuItem>
        ))}
      </DropDownMenuBasic>
    </>
  )
}

export default memo(LngSelection)
