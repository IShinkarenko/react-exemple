import { useQuery } from '@apollo/client'

import { GET_NOTIFICATION } from './useNotification.gql'

export const useNotification = (options) => {
  const notification = useQuery(GET_NOTIFICATION, options)

  return notification
}
