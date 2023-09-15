import { useMutation } from '@apollo/client'

import { CREATE_PROFILE_SECTION_ITEM } from './useCreateProfileSectionItem.gql'

export const useCreateProfileSectionItem = (options) => {
  const mutation = useMutation(CREATE_PROFILE_SECTION_ITEM, options)

  return mutation
}
