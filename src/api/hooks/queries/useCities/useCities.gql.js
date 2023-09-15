import { gql } from '@apollo/client'

export const GET_CITIES = gql`
  query getGeoRegion($id: ID!) {
    getGeoRegion(id: $id) {
      cities(limit: 1000) {
        items {
          _type
          countryCode
          countryId
          id
          latitude
          longitude
          name
          regionId
          sourceCityId
        }
      }
    }
  }
`
