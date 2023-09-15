import { useQuery } from '@apollo/client'

import { GET_CITIES } from './useCities.gql'

export const useCities = (options) => {
  const cities = useQuery(GET_CITIES, options)

  return cities
}
