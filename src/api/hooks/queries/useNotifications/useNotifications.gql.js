import { gql } from '@apollo/client'
import { userNotificationFragment } from 'api/hooks/fragments'

export const GET_NOTIFICATIONS = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      id
      notifications(sortDirection: DESC) {
        items {
          ...UsetNotificationFragment
        }
        nextToken
      }
    }
  }
  ${userNotificationFragment}
`
