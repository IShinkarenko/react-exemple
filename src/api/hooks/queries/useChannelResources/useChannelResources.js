import { useQuery } from '@apollo/client'

import { GET_CHANNEL_RESOURCES } from './useChannelResources.gql'

export const useChannelResources = (options) => {
  const channelConnections = useQuery(GET_CHANNEL_RESOURCES, options)

  return channelConnections
}
