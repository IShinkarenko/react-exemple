import { useMutation } from '@apollo/client'

import { DELETE_COMPANY_PROFILE_SECTION } from './useDeleteCompanyProfileSection.gql'

export const useDeleteCompanyProfileSection = (options) => {
  const mutation = useMutation(DELETE_COMPANY_PROFILE_SECTION, options)

  return mutation
}
