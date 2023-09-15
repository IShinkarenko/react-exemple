import { gql } from '@apollo/client'

import { relationshipContactFragment } from './../../fragments'

export const DELETE_RELATIONSHIP_CONTACT = gql`
  mutation deleteRelationshipContact($id: ID!) {
    deleteRelationshipContact(id: $id) {
      ...RelationshipContactFragment
    }
  }
  ${relationshipContactFragment}
`
