import { gql } from '@apollo/client'

export const GET_COMPANIES = gql`
  query GetUser($id: ID!, $nextToken: String, $limit: Int, $filter: ModelCompanyUserFastFilterInput) {
    getUser(id: $id) {
      id
      companies(limit: $limit, nextToken: $nextToken, filter: $filter) {
        items {
          id
          _type
          role
          logoUrl
          companyId
          companyName
          companyStatus
        }
        nextToken
      }
      _type
    }
  }
`
