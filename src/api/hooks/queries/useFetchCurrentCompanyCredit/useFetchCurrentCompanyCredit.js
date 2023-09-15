import { useQuery } from '@apollo/client'

import { FETCH_CURRENT_COMPANY_CREDIT } from './useFetchCurrentCompanyCredit.gql'

export const useFetchCurrentCompanyCredit = (options) => {
  const companyCredit = useQuery(FETCH_CURRENT_COMPANY_CREDIT, options)

  return companyCredit
}
