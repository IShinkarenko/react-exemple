import { gql } from '@apollo/client'
import { userNotificationFragment } from 'api/hooks/fragments'

export const CREATE_USER_NOTIFICATION = gql`
  mutation createUserNotification($input: CreateUserNotificationInput!) {
    createUserNotification(input: $input) {
      ...UsetNotificationFragment
    }
  }
  ${userNotificationFragment}
`
