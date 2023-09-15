import { useQuery } from '@apollo/client'

import { GET_NOTIFICATIONS } from './useNotifications.gql'

export const useNotifications = (options) => {
  const notifications = useQuery(GET_NOTIFICATIONS, options)

  return notifications
}
