import { gql } from '@apollo/client'

export const GET_COMPANY_USERS = gql`
  query GetCompany($id: ID!, $filter: ModelCompanyUserFastFilterInput) {
    getCompany(id: $id) {
      id
      users(limit: 25, filter: $filter) {
        items {
          _type
          id
          userId
          name
          role
          disabled
        }
        nextToken
      }
      _type
    }
  }
`
