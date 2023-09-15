import { useQuery } from '@apollo/client'

import { GET_COMPANY_USERS } from './useCompanyUsers.gql'

export const useCompanyUsers = (options) => {
  const users = useQuery(GET_COMPANY_USERS, options)

  return users
}
