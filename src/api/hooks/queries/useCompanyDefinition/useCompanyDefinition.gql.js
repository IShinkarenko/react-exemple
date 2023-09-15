import { gql } from '@apollo/client'

export const GET_COMPANY_DEFINITION = gql`
  query GetCompanyDefinition($id: ID!) {
    getCompanyDefinition(id: $id) {
      _type
      id
      name
      companyId
      orderIndex
      description
      configuration
      definitionType
      creationTimestamp
      modificationTimestamp
    }
  }
`
