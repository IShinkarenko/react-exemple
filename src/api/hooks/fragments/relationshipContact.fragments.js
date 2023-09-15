import { gql } from '@apollo/client'

export const relationshipContactFragment = gql`
  fragment RelationshipContactFragment on RelationshipContact {
    _type
    id
    name
    note
    title
    socialLinks
    emailAddress
    homePhoneNumber
    mobilePhoneNumber
    officePhoneNumber
    creationTimestamp
    modificationTimestamp
    companyRelationshipId
    metaData
    providerPersonId
  }
`
