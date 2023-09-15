import { gql } from '@apollo/client'

export const GET_CHANNEL_DATA_SUMMARY = gql`
  query GetCompany($id: ID!) {
    getCompanyChannel(id: $id) {
      _type
      id
      summary
    }
  }
`
