import { GET_NOTIFICATIONS } from 'api/hooks/queries/useNotifications/useNotifications.gql'

export const updateNotificationsCache = ({ userId, cache, data: { createUserNotification } }) => {
  const { getUser } = cache.readQuery({
    query: GET_NOTIFICATIONS,
    variables: {
      id: userId,
    },
  })

  const newNotifications = [createUserNotification, ...getUser?.notifications?.items]

  cache.writeQuery({
    query: GET_NOTIFICATIONS,
    variables: {
      id: userId,
    },
    data: {
      getUser: { ...getUser, notifications: { ...getUser.notifications, items: newNotifications } },
    },
  })
}
