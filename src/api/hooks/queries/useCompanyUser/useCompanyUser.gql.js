import { gql } from '@apollo/client'

export const GET_COMPANY_USER = gql`
  query GetCompanyUser($id: ID!) {
    getCompanyUser(id: $id) {
      _type
      id
      name
      role
      locale
      userId
      region
      userName
      disabled
      companyId
      companyName
      creationTimestamp
      modificationTimestamp
      userPolicy {
        allowedChannels
        permissions
      }
    }
  }
`
