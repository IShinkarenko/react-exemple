import { gql } from '@apollo/client'

export const UPDATE_USER_PROFILE = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      _type
      id
      bio
      fullName
      avatarUrl
      phoneNumber
      emailAddress
    }
  }
`
