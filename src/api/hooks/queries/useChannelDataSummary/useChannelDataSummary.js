import { useQuery } from '@apollo/client'

import { GET_CHANNEL_DATA_SUMMARY } from './useChannelDataSummary.gql'

export const useChannelDataSummary = (options) => {
  const channelDataSummary = useQuery(GET_CHANNEL_DATA_SUMMARY, options)

  return channelDataSummary
}
