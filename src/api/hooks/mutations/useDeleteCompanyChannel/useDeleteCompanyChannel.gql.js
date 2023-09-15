import { gql } from '@apollo/client'

export const DELETE_COMPANY_CHANNEL = gql`
  mutation deleteCompanyChannel($id: ID!) {
    deleteCompanyChannel(id: $id) {
      _type
      id
      name
      companyId
      orderIndex
    }
  }
`
