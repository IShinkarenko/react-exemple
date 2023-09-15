import { useMutation } from '@apollo/client'

import { CREATE_USER_NOTIFICATION } from './useCreateUserNotification.gql'

export const useCreateUserNotification = (options) => {
  const mutation = useMutation(CREATE_USER_NOTIFICATION, options)

  return mutation
}
