import { useQuery } from '@apollo/client'

import { GET_RELATIONSHIP_CONTACT } from './useRelationshipContact.gql'

export const useRelationshipContact = (options) => {
  const contact = useQuery(GET_RELATIONSHIP_CONTACT, options)

  return contact
}
