import { useQuery } from '@apollo/client'

import { GET_COMPANY_CREDITS } from './useCompanyCredits.gql'

export const useCompanyCredits = (options) => {
  const useCompanyCredits = useQuery(GET_COMPANY_CREDITS, options)

  return useCompanyCredits
}
