import { gql } from '@apollo/client'

export const GET_COMPANY_SEARCH = gql`
  query getCompanySearch($id: ID!) {
    getCompanySearch(id: $id) {
      _type
      companyId
      configuration
      creationTimestamp
      id
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
