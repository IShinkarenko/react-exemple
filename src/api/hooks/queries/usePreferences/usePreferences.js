import { useQuery } from '@apollo/client'

import { GET_PREFERENCES } from './usePreferences.gql'

export const usePreferences = (options) => {
  const preferences = useQuery(GET_PREFERENCES, options)

  return preferences
}
