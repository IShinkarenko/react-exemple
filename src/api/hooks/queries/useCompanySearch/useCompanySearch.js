import { useQuery } from '@apollo/client'

import { GET_COMPANY_SEARCH } from './useCompanySearch.gql'

export const useCompanySearch = (options) => {
  const search = useQuery(GET_COMPANY_SEARCH, options)

  return search
}
