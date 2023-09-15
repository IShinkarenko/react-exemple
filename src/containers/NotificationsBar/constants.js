export const notificationTypeLabels = {
  SystemMessage: 'System Message',
  Mention: 'Mention',
  CollaborationRequest: 'Collaboration Request',
  ConnectionRequest: 'Connection Request',
  SystemAlert: 'System Alert',
}

export const typeColor = {
  SystemMessage: '#74d3d126',
  Mention: '#1186d81a',
  CollaborationRequest: '#6fda6812',
  ConnectionRequest: '#ff8d0012',
  SystemAlert: '#74d3d126',
}

export const actionOptions = {
  SystemMessage: [
    {
      title: 'Okay',
    },
    {
      title: 'Keep as New',
    },
  ],
  Mention: [
    {
      title: 'Ignore',
    },
    {
      title: 'Reply',
    },
    {
      title: 'Open Relationship',
    },
  ],
  CollaborationRequest: [
    {
      title: 'Accept',
    },
    {
      title: 'Reject',
    },
  ],
  ConnectionRequest: [
    {
      title: 'Accept',
    },
    {
      title: 'Reject',
    },
    {
      title: 'Review Company',
    },
  ],
  SystemAlert: [
    {
      title: 'Confirm',
    },
    {
      title: 'Reject',
    },
  ],
}
