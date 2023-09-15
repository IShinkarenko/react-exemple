import { useMutation } from '@apollo/client'

import { EXPAND_RELATIONSHIP_CONTACT } from './useExpandRelationshipContact.gql'

export const useExpandRelationshipContact = (options) => {
  const mutation = useMutation(EXPAND_RELATIONSHIP_CONTACT, options)

  return mutation
}
