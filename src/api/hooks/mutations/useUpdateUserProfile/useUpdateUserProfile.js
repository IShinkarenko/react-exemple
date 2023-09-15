import { useMutation } from '@apollo/client'

import { UPDATE_USER_PROFILE } from './useUpdateUserProfile.gql'

export const useUpdateUserProfile = (options) => {
  const mutation = useMutation(UPDATE_USER_PROFILE, options)

  return mutation
}
