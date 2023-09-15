import { useQuery } from '@apollo/client'

import { GET_COMPANY_DEFINITIONS } from './useCompanyDefinitions.gql'

export const useCompanyDefinitions = (options) => {
  const companyDefinitions = useQuery(GET_COMPANY_DEFINITIONS, options)

  return companyDefinitions
}
