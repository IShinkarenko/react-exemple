import { useLazyQuery } from '@apollo/client'

import { GET_COMPANY_SEARCH } from './useSearchCompany.gql'

export const useSearchCompany = (options) => {
  const company = useLazyQuery(GET_COMPANY_SEARCH, options)

  return company
}
