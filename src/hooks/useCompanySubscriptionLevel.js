import { useCompany, usePreferences } from 'api/hooks'
import { DEFAULT_COMPANY, EXPANDIGO_BASIC } from 'constant'
import { useRouter } from 'next/router'
import { getPreferenceId } from 'utils'

import { useAppState } from './useAppState'

export const useCompanySubscriptionLevel = () => {
  const {
    query: { companyId },
  } = useRouter()
  const state = useAppState()
  const userId = state?.user?.attributes?.sub

  const { data: data_preferences } = usePreferences({ skip: companyId, variables: { id: userId } })
  const defaultCompanyId = getPreferenceId(data_preferences, DEFAULT_COMPANY)

  const id = companyId ? companyId : defaultCompanyId
  const { loading, data } = useCompany({ variables: { id } })
  const subscriptionLevel = data?.getCompany?.subscriptionLevel
  const isCompanyBasic = subscriptionLevel === EXPANDIGO_BASIC

  return { loading, isCompanyBasic, subscriptionLevel }
}
