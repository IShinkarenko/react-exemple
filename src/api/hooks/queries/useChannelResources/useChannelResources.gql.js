import { gql } from '@apollo/client'

export const GET_CHANNEL_RESOURCES = gql`
  query GetCompany($id: ID!) {
    getCompanyChannel(id: $id) {
      _type
      id
      resources {
        items {
          _type
          name
          resourceType
          resourceId
          modificationTimestamp
          instanceStatus
          id
          creationTimestamp
          orderIndex
        }
      }
    }
  }
`
