import { gql } from '@apollo/client'
import { definitionFragment } from 'api/hooks/fragments'

export const GET_COMPANY_DEFINITIONS = gql`
  query GetCompany($id: ID!, $filter: ModelCompanyDefinitionFastFilterInput) {
    getCompany(id: $id) {
      _type
      id
      definitions(filter: $filter) {
        items {
          ...DefinitionFragment
        }
      }
    }
  }
  ${definitionFragment}
`
