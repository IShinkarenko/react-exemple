import { gql } from '@apollo/client'

import { definitionFragment } from './../../fragments'

export const CREATE_COMPANY_DEFINITION = gql`
  mutation createCompanyDefinition($input: CreateCompanyDefinitionInput!) {
    createCompanyDefinition(input: $input) {
      ...DefinitionFragment
    }
  }
  ${definitionFragment}
`
