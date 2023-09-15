import { useQuery } from '@apollo/client'

import { GET_PUBLIC_COMPANY } from './usePublicCompany.gql'

export const usePublicCompany = (options) => {
  const publicCompany = useQuery(GET_PUBLIC_COMPANY, options)

  return publicCompany
}
