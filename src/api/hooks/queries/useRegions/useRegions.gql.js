import { gql } from '@apollo/client'

export const GET_REGIONS = gql`
  query getGeoCountry($id: ID!) {
    getGeoCountry(id: $id) {
      regions(limit: 1000) {
        items {
          _type
          countryCode
          countryId
          id
          latitude
          longitude
          name
          regionCode
          sourceRegionId
        }
      }
    }
  }
`
