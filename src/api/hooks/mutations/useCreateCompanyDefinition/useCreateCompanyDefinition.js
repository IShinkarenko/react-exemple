import { useMutation } from '@apollo/client'

import { CREATE_COMPANY_DEFINITION } from './useCreateCompanyDefinition.gql'

export const useCreateCompanyDefinition = (options) => {
  const mutation = useMutation(CREATE_COMPANY_DEFINITION, options)

  return mutation
}
