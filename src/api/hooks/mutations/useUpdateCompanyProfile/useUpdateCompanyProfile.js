import { useMutation } from '@apollo/client'

import { UPDATE_COMPANY_PROFILE } from './useUpdateCompanyProfile.gql'

export const useUpdateCompanyProfile = (options) => {
  const mutation = useMutation(UPDATE_COMPANY_PROFILE, options)

  return mutation
}
