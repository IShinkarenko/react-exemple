import { useQuery } from '@apollo/client'

import { GET_COMPANY_DEFINITION } from './useCompanyDefinition.gql'

export const useCompanyDefinition = (options) => {
  const companyDefinition = useQuery(GET_COMPANY_DEFINITION, options)

  return companyDefinition
}
