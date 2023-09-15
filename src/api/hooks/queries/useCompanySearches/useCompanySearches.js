import { useQuery } from '@apollo/client'

import { GET_COMPANY_SEARCHES } from './useCompanySearches.gql'

export const useCompanySearches = (options) => {
  const searches = useQuery(GET_COMPANY_SEARCHES, options)

  return searches
}
