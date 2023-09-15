import { useLazyQuery } from '@apollo/client'

import { GET_COUNTRIES } from './useCountries.gql'

export const useCountries = (options) => {
  const countries = useLazyQuery(GET_COUNTRIES, options)

  return countries
}
