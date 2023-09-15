import { useQuery } from '@apollo/client'

import { SEARCH_COMPANIES_BY_TEXT } from './useSearchCompaniesByText.gql'

export const useSearchCompaniesByText = (options) => {
  const searchCompanies = useQuery(SEARCH_COMPANIES_BY_TEXT, options)

  return searchCompanies
}
