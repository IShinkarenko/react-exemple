import { gql } from '@apollo/client'

export const creditFragment = gql`
  fragment CreditFragment on CompanyCredit {
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
`
