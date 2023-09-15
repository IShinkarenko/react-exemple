import { gql } from '@apollo/client'

export const GET_COUNTRIES = gql`
  query GetGlobalLocalDefinition($id: ID!) {
    getGlobalLocalDefinition(id: $id) {
      countries(limit: 1000) {
        items {
          _type
          id
          name
          iso3Code
          latitude
          longitude
          numericCode
          countryCode
        }
      }
    }
  }
`
