import { gql } from '@apollo/client'

export const UPDATE_COMPANY_USER = gql`
  mutation updateCompanyUser($input: UpdateCompanyUserInput!) {
    __typename
    updateCompanyUser(input: $input) {
      _type
      companyId
      creationTimestamp
      id
      disabled
      locale
      modificationTimestamp
      name
      region
      role
      userId
      userPolicy {
        allowedChannels
        permissions
      }
    }
  }
`
