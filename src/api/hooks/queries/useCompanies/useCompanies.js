import { useQuery } from '@apollo/client'

import { GET_COMPANIES } from './useCompanies.gql'

export const useCompanies = (options) => {
  const companies = useQuery(GET_COMPANIES, options)

  return companies
}
