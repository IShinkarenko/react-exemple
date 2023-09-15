import { gql } from '@apollo/client'

import { relationshipFragment } from './../../fragments'

export const DELETE_COMPANY_RELATIONSHIP = gql`
  mutation deleteCompanyRelationship($id: ID!) {
    deleteCompanyRelationship(id: $id) {
      ...RelationshipFragment
    }
  }
  ${relationshipFragment}
`
