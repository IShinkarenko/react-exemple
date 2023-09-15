import { gql } from '@apollo/client'

import { relationshipContactFragment } from './../../fragments'

export const GET_RELATIONSHIP_CONTACTS = gql`
  query getCompanyRelationship($id: ID!) {
    getCompanyRelationship(id: $id) {
      contacts {
        items {
          ...RelationshipContactFragment
        }
      }
    }
  }
  ${relationshipContactFragment}
`
