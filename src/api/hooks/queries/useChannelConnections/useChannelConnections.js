import { useQuery } from '@apollo/client'

import { GET_CHANNEL_CONNECTIONS } from './useChannelConnections.gql'

export const useChannelConnections = (options) => {
  const channelConnections = useQuery(GET_CHANNEL_CONNECTIONS, options)

  return channelConnections
}
