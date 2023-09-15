import { gql } from '@apollo/client'

export const GET_PREFERENCES = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      preferences {
        preferenceType
        value
      }
    }
  }
`
