import { gql } from '@apollo/client'

export const userNotificationFragment = gql`
  fragment UsetNotificationFragment on UserNotification {
    _type
    id
    isNew
    userId
    message
    metaData
    headline
    companyId
    senderUserId
    senderCompanyId
    notificationType
    creationTimestamp
    relationshipNoteId
    modificationTimestamp
  }
`
