import { gql } from '@apollo/client'
import { creditFragment } from 'api/hooks/fragments'

export const GET_COMPANY_CREDITS = gql`
  query GetCompany($id: ID!, $creditType: CreditType, $limit: Int) {
    getCompany(id: $id) {
      _type
      id
      credits(limit: $limit, sortDirection: DESC, filter: { creditType: { eq: $creditType } }) {
        items {
          ...CreditFragment
        }
      }
    }
  }
  ${creditFragment}
`
