import { useMutation } from '@apollo/client'

import { UPDATE_PREFERENCES } from './useUpdatePreferences.gql'

export const useUpdatePreferences = (options) => {
  const mutation = useMutation(UPDATE_PREFERENCES, options)

  return mutation
}
