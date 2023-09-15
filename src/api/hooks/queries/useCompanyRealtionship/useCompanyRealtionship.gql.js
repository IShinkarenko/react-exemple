import { gql } from '@apollo/client'
import { relationshipFragment } from 'api/hooks/fragments'

export const GET_COMPANY_RELATIONSHIP = gql`
  query GetCompanyRelationship($id: ID!) {
    getCompanyRelationship(id: $id) {
      ...RelationshipFragment
    }
  }
  ${relationshipFragment}
`
