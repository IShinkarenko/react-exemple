import { gql } from '@apollo/client'

import { relationshipNoteFragment } from './../../fragments'

export const UPDATE_RELATIONSHIP_NOTE = gql`
  mutation updateRelationshipNote($input: UpdateRelationshipNoteInput!) {
    updateRelationshipNote(input: $input) {
      ...RelationshipNoteFragment
    }
  }
  ${relationshipNoteFragment}
`
