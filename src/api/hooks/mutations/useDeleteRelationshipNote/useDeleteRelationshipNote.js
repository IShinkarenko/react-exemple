import { useMutation } from '@apollo/client'

import { DELETE_RELATIONSHIP_NOTE } from './useDeleteRelationshipNote.gql'

export const useDeleteRelationshipNote = (options) => {
  const mutation = useMutation(DELETE_RELATIONSHIP_NOTE, options)

  return mutation
}
