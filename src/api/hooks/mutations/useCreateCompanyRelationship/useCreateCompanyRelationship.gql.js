import { gql } from '@apollo/client'

export const CREATE_COMPANY_RELATIONSHIP = gql`
  mutation createCompanyRelationship($input: CreateCompanyRelationshipInput!) {
    createCompanyRelationship(input: $input) {
      addressLine2
      _type
      addressLine3
      channels
      channelsPhrase
      city
      companyId
      country
      creationTimestamp
      description
      expandigoCompanyId
      id
      latitude
      logoUrl
      longitude
      modificationTimestamp
      name
      originId
      phoneNumber
      postalCode
      searchPhrase
      socialLinks
      sources
      standardTags
      stateOrProvince
      status
      types
      websiteUrl
      customFields {
        id
        value
        definitionId
      }
    }
  }
`
