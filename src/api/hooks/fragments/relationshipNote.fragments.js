import { gql } from '@apollo/client'

export const relationshipNoteFragment = gql`
  fragment RelationshipNoteFragment on RelationshipNote {
    _type
    id
    note
    userId
    userName
    creationTimestamp
    modificationTimestamp
    companyRelationshipId
  }
`
