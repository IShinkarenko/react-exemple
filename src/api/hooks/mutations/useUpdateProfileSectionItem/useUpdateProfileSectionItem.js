import { useMutation } from '@apollo/client'

import { UPDATE_PROFILE_SECTION_ITEM } from './useUpdateProfileSectionItem.gql'

export const useUpdateProfileSectionItem = (options) => {
  const mutation = useMutation(UPDATE_PROFILE_SECTION_ITEM, options)

  return mutation
}
