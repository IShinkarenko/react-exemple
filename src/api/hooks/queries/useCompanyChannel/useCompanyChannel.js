import { useQuery } from '@apollo/client'

import { GET_COMPANY_CHANNEL } from './useCompanyChannel.gql'

export const useCompanyChannel = (options) => {
  const channels = useQuery(GET_COMPANY_CHANNEL, options)

  return channels
}
