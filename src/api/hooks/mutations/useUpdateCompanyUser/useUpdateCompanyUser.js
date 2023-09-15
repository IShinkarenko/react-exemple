import { useMutation } from '@apollo/client'

import { UPDATE_COMPANY_USER } from './useUpdateCompanyUser.gql'

export const useUpdateCompanyUser = (options) => {
  const mutation = useMutation(UPDATE_COMPANY_USER, options)

  return mutation
}
