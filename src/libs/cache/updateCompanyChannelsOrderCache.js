import { GET_COMPANY_CHANNELS } from 'api/hooks/queries/useCompanyChannels/useCompanyChannels.gql'
import { moveAndUpdateIndexOrder } from 'utils'

export const updateCompanyChannelsOrderCache = ({ activeCompanyId, cache, channels, result }) => {
  const { getCompany } = cache.readQuery({
    query: GET_COMPANY_CHANNELS,
    variables: {
      id: activeCompanyId,
    },
  })

  const reorderedChannels = moveAndUpdateIndexOrder(channels, result)

  cache.writeQuery({
    query: GET_COMPANY_CHANNELS,
    variables: {
      id: activeCompanyId,
    },
    data: {
      getCompany: { ...getCompany, channels: { ...getCompany.channels, items: reorderedChannels } },
    },
  })
}
