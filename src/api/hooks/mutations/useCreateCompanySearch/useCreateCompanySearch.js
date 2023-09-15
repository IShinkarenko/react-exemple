import { useMutation } from '@apollo/client'

import { CREATE_COMPANY_SEARCH } from './useCreateCompanySearch.gql'

export const useCreateCompanySearch = (options) => {
  const mutation = useMutation(CREATE_COMPANY_SEARCH, options)

  return mutation
}
