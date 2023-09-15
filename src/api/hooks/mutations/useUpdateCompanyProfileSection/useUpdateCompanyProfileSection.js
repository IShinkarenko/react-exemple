import { useMutation } from '@apollo/client'

import { UPDATE_COMPANY_PROFILE_SECTION } from './useUpdateCompanyProfileSection.gql'

export const useUpdateCompanyProfileSection = (options) => {
  const mutation = useMutation(UPDATE_COMPANY_PROFILE_SECTION, options)

  return mutation
}
