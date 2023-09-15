import { gql } from '@apollo/client'

import { relationshipContactFragment } from './../../fragments'

export const CREATE_RELATIONSHIP_CONTACT = gql`
  mutation createRelationshipContact($input: CreateRelationshipContactInput!) {
    createRelationshipContact(input: $input) {
      ...RelationshipContactFragment
    }
  }
  ${relationshipContactFragment}
`
