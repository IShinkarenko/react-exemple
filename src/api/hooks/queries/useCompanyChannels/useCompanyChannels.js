import { useQuery } from '@apollo/client'

import { GET_COMPANY_CHANNELS } from './useCompanyChannels.gql'

export const useCompanyChannels = (options) => {
  const channels = useQuery(GET_COMPANY_CHANNELS, options)

  return channels
}
