import { gql } from '@apollo/client'

export const GET_COMPANY_SEARCHES = gql`
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
      id
      _type
      searches(limit: 50) {
        items {
          id
          _type
          companyId
          configuration
          creationTimestamp
          modificationTimestamp
          text
          tags {
            label
            tagType
            value
          }
        }
      }
    }
  }
`
