import { gql } from '@apollo/client'

import { relationshipContactFragment } from './../../fragments'

export const GET_RELATIONSHIP_CONTACT = gql`
  query getRelationshipContact($id: ID!) {
    getRelationshipContact(id: $id) {
      ...RelationshipContactFragment
    }
  }
  ${relationshipContactFragment}
`
