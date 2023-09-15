import { gql } from '@apollo/client'

export const GET_COMPANY_CREDIT = gql`
  query GetCompanyCredit($id: ID!) {
    getCompanyCredit(id: $id) {
      _type
      id
      creationTimestamp
      modificationTimestamp
      companyId
      month
      year
      creditType
      limit
      paid
      free
      used
      price
      rollover
    }
  }
`
