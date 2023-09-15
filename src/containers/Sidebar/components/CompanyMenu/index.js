import { List } from '@mui/material'
import { useCompany, usePreferences } from 'api/hooks'
import { LinkItem, LinkSkeleton } from 'components'
import { DEFAULT_COMPANY } from 'constant'
import CompanyChannels from 'containers/CompanyChannels'
import CompanySwitcher from 'containers/CompanySwitcher'
import { useAppState } from 'hooks/useAppState'
import { useCompanySubscriptionLevel } from 'hooks/useCompanySubscriptionLevel'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { memo } from 'react'
import { getPreferenceId, getRestrictedMenuItems } from 'utils'

import { links } from './constants'

const CompanyMenyList = () => {
  const { t } = useTranslation('companyMenu')
  const {
    query: { companyId },
  } = useRouter()
  const { user } = useAppState()
  const { isCompanyBasic } = useCompanySubscriptionLevel()
  const userId = user?.attributes?.sub
  const { data: data_preferences } = usePreferences({ skip: !userId, variables: { id: userId } })
  const activeCompanyId = companyId ? companyId : getPreferenceId(data_preferences, DEFAULT_COMPANY)
  const { data: data_company } = useCompany({
    skip: !activeCompanyId,
    variables: { id: activeCompanyId },
  })
  const company = data_company?.getCompany
  const restrictedMenuItems = getRestrictedMenuItems(company?.subscriptionLevel)
  const companyMenuItems = restrictedMenuItems
    ? links(t).filter((f) => !restrictedMenuItems.includes(f.type))
    : links(t)

  return (
    <>
      <CompanySwitcher company={company} userId={userId} />

      <List component="div">
        {(company ? companyMenuItems : Array.from(new Array(4))).map((link, index) =>
          link ? (
            <LinkItem
              key={link.title}
              linkTitle={t(`${link.title}`)}
              redirectTo={{
                pathname: link.route,
                query: { companyId: activeCompanyId },
              }}
              itemIcon={link.icon}
            />
          ) : (
            <LinkSkeleton key={index} />
          )
        )}

        {company ? !isCompanyBasic && <CompanyChannels activeCompanyId={activeCompanyId} /> : <LinkSkeleton />}
      </List>
    </>
  )
}

export default memo(CompanyMenyList)
