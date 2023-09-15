import { gql } from '@apollo/client'
import { userNotificationFragment } from 'api/hooks/fragments'

export const UPDATE_USER_NOTIFICATION = gql`
  mutation UpdateUserNotificationMutation($input: UpdateUserNotificationInput!) {
    updateUserNotification(input: $input) {
      ...UsetNotificationFragment
    }
  }
  ${userNotificationFragment}
`
