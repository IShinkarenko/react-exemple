import { useQuery } from '@apollo/client'

import { GET_COMPANY } from './useCompany.gql'

export const useCompany = (options) => {
  const company = useQuery(GET_COMPANY, options)

  return company
}
