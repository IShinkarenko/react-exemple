import { useMutation } from '@apollo/client'

import { DELETE_COMPANY_DEFINITION } from './useDeleteCompanyDefinition.gql'

export const useDeleteCompanyDefinition = (options) => {
  const mutation = useMutation(DELETE_COMPANY_DEFINITION, options)

  return mutation
}
