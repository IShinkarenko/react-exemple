import { gql } from '@apollo/client'

export const GET_COMPANY_PAYMENT_CONFIG = gql`
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
      _type
      id
      name
      paymentsConfig
    }
  }
`
