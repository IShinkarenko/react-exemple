import { gql } from '@apollo/client'
import { relationshipNoteFragment } from 'api/hooks/fragments'

export const CREATE_RELATIONSHIP_NOTE = gql`
  mutation createRelationshipNote($input: CreateRelationshipNoteInput!) {
    createRelationshipNote(input: $input) {
      ...RelationshipNoteFragment
    }
  }
  ${relationshipNoteFragment}
`
