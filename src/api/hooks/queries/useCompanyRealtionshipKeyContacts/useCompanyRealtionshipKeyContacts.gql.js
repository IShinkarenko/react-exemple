import { gql } from '@apollo/client'
import { relationshipContactFragment } from 'api/hooks/fragments'

export const GET_COMPANY_RELATIONSHIP_KEY_CONTACTS = gql`
  query GetCompanyRelationship($id: ID!) {
    getCompanyRelationship(id: $id) {
      _type
      id
      contacts(sortDirection: ASC) {
        items {
          ...RelationshipContactFragment
        }
      }
    }
  }
  ${relationshipContactFragment}
`
