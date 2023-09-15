import { gql } from '@apollo/client'

import { definitionFragment } from './../../fragments'

export const DELETE_COMPANY_DEFINITION = gql`
  mutation deleteCompanyDefinition($id: ID!) {
    deleteCompanyDefinition(id: $id) {
      ...DefinitionFragment
    }
  }
  ${definitionFragment}
`
