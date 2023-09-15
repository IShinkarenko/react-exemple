import { useMutation } from '@apollo/client'

import { UPDATE_COMPANY_TAGS } from './useUpdateCompanyTags.gql'

export const useUpdateCompanyTags = (options) => {
  const mutation = useMutation(UPDATE_COMPANY_TAGS, options)

  return mutation
}
