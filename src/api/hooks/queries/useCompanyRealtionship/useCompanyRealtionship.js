import { useQuery } from '@apollo/client'

import { GET_COMPANY_RELATIONSHIP } from './useCompanyRealtionship.gql'

export const useCompanyRealtionship = (options) => {
  const companyRealtionship = useQuery(GET_COMPANY_RELATIONSHIP, options)

  return companyRealtionship
}
