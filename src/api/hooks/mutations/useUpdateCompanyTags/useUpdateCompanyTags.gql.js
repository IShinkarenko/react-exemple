import { gql } from '@apollo/client'

export const UPDATE_COMPANY_TAGS = gql`
  mutation updateCompany($input: UpdateCompanyInput!) {
    __typename
    updateCompany(input: $input) {
      _type
      id
      status
      tags {
        tagType
        value
        label
      }
    }
  }
`
