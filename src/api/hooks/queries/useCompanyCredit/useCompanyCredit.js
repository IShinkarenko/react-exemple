import { useQuery } from '@apollo/client'

import { GET_COMPANY_CREDIT } from './useCompanyCredit.gql'

export const useCompanyCredit = (options) => {
  const companyCredit = useQuery(GET_COMPANY_CREDIT, options)

  return companyCredit
}
