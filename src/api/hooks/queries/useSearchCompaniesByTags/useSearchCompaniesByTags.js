import { useQuery } from '@apollo/client'

import { SEARCH_COMPANIES_BY_TAGS } from './useSearchCompaniesByTags.gql'

export const useSearchCompaniesByTags = (options) => {
  const searchCompanies = useQuery(SEARCH_COMPANIES_BY_TAGS, options)

  return searchCompanies
}
