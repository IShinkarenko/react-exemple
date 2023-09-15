import { useQuery } from '@apollo/client'

import { GET_RELATIONSHIP_CONTACTS } from './useRelationshipContacts.gql'

export const useRelationshipContacts = (options) => {
  const contacts = useQuery(GET_RELATIONSHIP_CONTACTS, options)

  return contacts
}
