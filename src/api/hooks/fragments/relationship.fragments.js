import { gql } from '@apollo/client'

export const relationshipFragment = gql`
  fragment RelationshipFragment on CompanyRelationship {
    _type
    id
    name
    addressLine1
    addressLine2
    addressLine3
    city
    types
    sources
    country
    companyId
    websiteUrl
    postalCode
    description
    phoneNumber
    standardTags
    stateOrProvince
    expandigoCompanyId
    socialLinks
    creationTimestamp
    status
    channels
    sourceName
    sourceType
    customFields {
      id
      value
      definitionId
    }
  }
`
