import { gql } from '@apollo/client'

export const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      _type
      id
      bio
      locale
      region
      fullName
      userName
      avatarUrl
      phoneNumber
      emailAddress
    }
  }
`
