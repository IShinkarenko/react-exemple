import { gql } from '@apollo/client'

export const UPDATE_USER_SECURITY = gql`
  mutation updateUser($input: UpdateUserInput!) {
    __typename
    updateUser(input: $input) {
      id
      _type
      userName
    }
  }
`
