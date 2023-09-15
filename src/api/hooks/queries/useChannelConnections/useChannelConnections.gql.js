import { gql } from '@apollo/client'

export const GET_CHANNEL_CONNECTIONS = gql`
  query GetCompanyChannel($id: ID!, $filter: ModelChannelConnectionFastFilterInput) {
    getCompanyChannel(id: $id) {
      _type
      id
      connections(filter: $filter) {
        items {
          _type
          expandigoCompanyId
          id
          location
          logoUrl
          name
          status
          description
        }
      }
    }
  }
`
