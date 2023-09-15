import { useMutation } from '@apollo/client'

import { DELETE_PROFILE_SECTION_ITEM } from './useDeleteProfileSectionItem.gql'

export const useDeleteProfileSectionItem = (options) => {
  const mutation = useMutation(DELETE_PROFILE_SECTION_ITEM, options)

  return mutation
}
