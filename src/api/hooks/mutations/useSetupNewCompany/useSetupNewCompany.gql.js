import { gql } from '@apollo/client'

export const SETUP_NEW_COMPANY = gql`
  mutation setupNewCompany($input: SetupNewCompanyInput!) {
    setupNewCompany(input: $input) {
      _type
      id
      name
      status
      region
      locale
      logoUrl
      discount
      parentId
      namespace
      promoCode
      description
      subscriptionId
      visibilityLevel
      subscriptionLevel
      providerCompanyId
      creationTimestamp
      providerCompanyName
      modificationTimestamp
    }
  }
`
