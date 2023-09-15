import { gql } from '@apollo/client'

export const GET_COMPANY_CHANNEL = gql`
  query GetCompanyChannel($id: ID!) {
    getCompanyChannel(id: $id) {
      id
      name
      _type
      companyId
      creationTimestamp
      description
      imageUrl
      instanceStatus
      modificationTimestamp
      orderIndex
      tags {
        label
        tagType
        value
      }
    }
  }
`
