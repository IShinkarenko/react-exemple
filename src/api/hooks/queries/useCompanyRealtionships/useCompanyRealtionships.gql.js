import { gql } from '@apollo/client'
import { relationshipFragment } from 'api/hooks/fragments'

export const GET_COMPANY_RELATIONSHIPS = gql`
  query GetCompany($id: ID!, $nextToken: String, $filter: ModelCompanyRelationshipFastFilterInput) {
    getCompany(id: $id) {
      id
      relationships(limit: 25, sortDirection: ASC, nextToken: $nextToken, filter: $filter) {
        items {
          ...RelationshipFragment
        }
        nextToken
      }
    }
  }
  ${relationshipFragment}
`
