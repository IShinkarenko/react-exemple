import { gql } from '@apollo/client'

import { relationshipContactFragment } from './../../fragments'

export const UPDATE_RELATIONSHIP_CONTACT = gql`
  mutation updateRelationshipContact($input: UpdateRelationshipContactInput!) {
    updateRelationshipContact(input: $input) {
      ...RelationshipContactFragment
    }
  }
  ${relationshipContactFragment}
`
