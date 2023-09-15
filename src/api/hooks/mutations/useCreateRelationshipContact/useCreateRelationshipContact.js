import { useMutation } from '@apollo/client'

import { CREATE_RELATIONSHIP_CONTACT } from './useCreateRelationshipContact.gql'

export const useCreateRelationshipContact = (options) => {
  const mutation = useMutation(CREATE_RELATIONSHIP_CONTACT, options)

  return mutation
}
