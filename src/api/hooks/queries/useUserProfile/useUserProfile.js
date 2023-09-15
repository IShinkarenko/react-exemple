import { useQuery } from '@apollo/client'

import { GET_USER } from './useUserProfile.gql'

export const useUserProfile = (options) => {
  const user = useQuery(GET_USER, options)

  return user
}
