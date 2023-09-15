import { useMutation } from '@apollo/client'

import { UPDATE_COMPANY_DEFINITION } from './useUpdateCompanyDefinition.gql'

export const useUpdateCompanyDefinition = (options) => {
  const mutation = useMutation(UPDATE_COMPANY_DEFINITION, options)

  return mutation
}
