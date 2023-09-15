import { useLazyQuery } from '@apollo/client'

import { GET_REGIONS } from './useRegions.gql'

export const useSearchCompany = (options) => {
  const regions = useLazyQuery(GET_REGIONS, options)

  return regions
}
