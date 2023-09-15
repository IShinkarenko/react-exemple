import { useMutation } from '@apollo/client'

import { UPDATE_USER_NOTIFICATION } from './useUpdateUserNotification.gql'

export const useUpdateUserNotification = (options) => {
  const mutation = useMutation(UPDATE_USER_NOTIFICATION, options)

  return mutation
}
