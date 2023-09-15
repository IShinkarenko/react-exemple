import { useQuery } from '@apollo/client'

import { GET_COMPANY_USER } from './useCompanyUser.gql'

export const useCompanyUser = (options) => {
  const user = useQuery(GET_COMPANY_USER, options)

  return user
}
