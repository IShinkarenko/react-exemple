import { useQuery } from '@apollo/client'

import { GET_COMPANY_RELATIONSHIPS } from './useCompanyRealtionships.gql'

export const useCompanyRealtionships = (options) => {
  const companyRealtionships = useQuery(GET_COMPANY_RELATIONSHIPS, options)

  return companyRealtionships
}
