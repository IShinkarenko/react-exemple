import { gql } from '@apollo/client'
import { relationshipFragment } from 'api/hooks/fragments'

export const UPDATE_COMPANY_RELATIONSHIP = gql`
  mutation updateCompanyRelationship($input: UpdateCompanyRelationshipInput!) {
    updateCompanyRelationship(input: $input) {
      ...RelationshipFragment
    }
  }
  ${relationshipFragment}
`
