import { gql } from '@apollo/client'

import { definitionFragment } from './../../fragments'

export const UPDATE_COMPANY_DEFINITION = gql`
  mutation updateCompanyDefinition($input: UpdateCompanyDefinitionInput!) {
    updateCompanyDefinition(input: $input) {
      ...DefinitionFragment
    }
  }
  ${definitionFragment}
`
