import { gql } from '@apollo/client'
import { userNotificationFragment } from 'api/hooks/fragments'

export const GET_NOTIFICATION = gql`
  query getUserNotification($id: ID!) {
    getUserNotification(id: $id) {
      ...UsetNotificationFragment
    }
  }
  ${userNotificationFragment}
`
