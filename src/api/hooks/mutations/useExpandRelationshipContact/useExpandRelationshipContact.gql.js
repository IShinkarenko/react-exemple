import { gql } from '@apollo/client'

export const EXPAND_RELATIONSHIP_CONTACT = gql`
  mutation expandRelationshipContact($companyId: ID!, $relationshipName: String!, $relationshipContactId: ID!) {
    expandRelationshipContact(
      companyId: $companyId
      relationshipName: $relationshipName
      relationshipContactId: $relationshipContactId
    ) {
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
  }
`
