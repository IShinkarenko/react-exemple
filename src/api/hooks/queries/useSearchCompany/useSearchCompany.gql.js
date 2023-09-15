import { gql } from '@apollo/client'

export const GET_COMPANY_SEARCH = gql`
  query GetUser($id: ID!, $searchPhrase: String) {
    getUser(id: $id) {
      id
      companies(limit: 25, filter: { searchPhrase: { contains: $searchPhrase } }) {
        items {
          id
          _type
          role
          logoUrl
          companyId
          companyName
        }
      }
      _type
    }
  }
`
