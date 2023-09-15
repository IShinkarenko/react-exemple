import { gql } from '@apollo/client'

export const GET_COMPANY_CHANNELS = gql`
  query GetCompany($id: ID!, $filter: ModelCompanyChannelFastFilterInput) {
    getCompany(id: $id) {
      id
      name
      channels(limit: 25, sortDirection: ASC, filter: $filter) {
        items {
          id
          name
          orderIndex
          instanceStatus
          _type
        }
        nextToken
      }
      _type
    }
  }
`
