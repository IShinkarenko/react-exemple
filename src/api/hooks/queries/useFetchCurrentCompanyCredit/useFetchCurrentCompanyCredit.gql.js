import { gql } from '@apollo/client'

export const FETCH_CURRENT_COMPANY_CREDIT = gql`
  query FetchCurrentCompanyCredit($companyId: ID!, $creditType: CreditType!) {
    fetchCurrentCompanyCredit(companyId: $companyId, creditType: $creditType) {
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
