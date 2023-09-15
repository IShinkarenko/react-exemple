import { useMutation } from '@apollo/client'

import { UPDATE_RELATIONSHIP_CONTACT } from './useUpdateRelationshipContact.gql'

export const useUpdateRelationshipContact = (options) => {
  const mutation = useMutation(UPDATE_RELATIONSHIP_CONTACT, options)

  return mutation
}
