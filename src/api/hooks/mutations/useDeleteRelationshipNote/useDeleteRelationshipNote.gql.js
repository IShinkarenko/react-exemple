import { gql } from '@apollo/client'

import { relationshipNoteFragment } from './../../fragments'

export const DELETE_RELATIONSHIP_NOTE = gql`
  mutation deleteRelationshipNote($id: ID!) {
    deleteRelationshipNote(id: $id) {
      ...RelationshipNoteFragment
    }
  }
  ${relationshipNoteFragment}
`
