import { gql } from '@apollo/client'

export const definitionFragment = gql`
  fragment DefinitionFragment on CompanyDefinition {
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
`
