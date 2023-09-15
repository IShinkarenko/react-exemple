import { useQuery } from '@apollo/client'

import { GET_COMPANIES_BY_DOMAIN } from './useSearchCompaniesByDomain.gql'

export const useSearchCompaniesByDomain = (options) => {
  const companiesByDomain = useQuery(GET_COMPANIES_BY_DOMAIN, options)

  return companiesByDomain
}
