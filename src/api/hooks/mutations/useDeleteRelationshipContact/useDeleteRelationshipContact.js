import { useMutation } from '@apollo/client'

import { DELETE_RELATIONSHIP_CONTACT } from './useDeleteRelationshipContact.gql'

export const useDeleteRelationshipContact = (options) => {
  const mutation = useMutation(DELETE_RELATIONSHIP_CONTACT, options)

  return mutation
}
