import { useMutation } from '@apollo/client'

import { UPDATE_RELATIONSHIP_NOTE } from './useUpdateRelationshipNote.gql'

export const useUpdateRelationshipNote = (options) => {
  const mutation = useMutation(UPDATE_RELATIONSHIP_NOTE, options)

  return mutation
}
