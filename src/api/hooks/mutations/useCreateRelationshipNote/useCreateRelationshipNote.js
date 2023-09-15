import { useMutation } from '@apollo/client'

import { CREATE_RELATIONSHIP_NOTE } from './useCreateRelationshipNote.gql'

export const useCreateRelationshipNote = (options) => {
  const mutation = useMutation(CREATE_RELATIONSHIP_NOTE, options)

  return mutation
}
