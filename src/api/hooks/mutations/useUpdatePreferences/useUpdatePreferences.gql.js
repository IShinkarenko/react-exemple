import { gql } from '@apollo/client'

export const UPDATE_PREFERENCES = gql`
  mutation updateUser($input: UpdateUserInput!) {
    __typename
    updateUser(input: $input) {
      id
      preferences {
        preferenceType
        value
      }
    }
  }
`
