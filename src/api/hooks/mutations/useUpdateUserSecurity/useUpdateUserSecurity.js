import { useMutation } from '@apollo/client'

import { UPDATE_USER_SECURITY } from './useUpdateUserSecurity.gql'

export const useUpdateUserSecurity = (options) => {
  const mutation = useMutation(UPDATE_USER_SECURITY, options)

  return mutation
}
