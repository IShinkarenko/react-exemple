import { gql } from '@apollo/client'

export const GET_COMPANY_RELATIONSHIP_NOTES = gql`
  query GetCompanyRelationship($id: ID!) {
    getCompanyRelationship(id: $id) {
      _type
      id
      notes(limit: 4, sortDirection: DESC) {
        items {
          note
          id
          _type
          companyRelationshipId
          creationTimestamp
          modificationTimestamp
          userId
          userName
        }
        nextToken
      }
    }
  }
`
