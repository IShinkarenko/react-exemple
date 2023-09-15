import { GET_COMPANY_CHANNELS } from 'api/hooks/queries/useCompanyChannels/useCompanyChannels.gql'

export const updateCompanyChannelsCache = ({ activeCompanyId, cache, data: { createCompanyChannel } }) => {
  const { getCompany } = cache.readQuery({
    query: GET_COMPANY_CHANNELS,
    variables: {
      id: activeCompanyId,
    },
  })

  const newChannels = [...getCompany?.channels?.items, createCompanyChannel]

  cache.writeQuery({
    query: GET_COMPANY_CHANNELS,
    variables: {
      id: activeCompanyId,
    },
    data: {
      getCompany: { ...getCompany, channels: { ...getCompany.channels, items: newChannels } },
    },
  })
}
