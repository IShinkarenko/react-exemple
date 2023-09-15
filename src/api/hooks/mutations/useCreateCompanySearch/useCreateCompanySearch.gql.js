import { gql } from '@apollo/client'

export const CREATE_COMPANY_SEARCH = gql`
  mutation createCompanySearch($input: CreateCompanySearchInput!) {
    createCompanySearch(input: $input) {
      id
      _type
      companyId
      configuration
      creationTimestamp
      modificationTimestamp
      text
      tags {
        label
        tagType
        value
      }
    }
  }
`
