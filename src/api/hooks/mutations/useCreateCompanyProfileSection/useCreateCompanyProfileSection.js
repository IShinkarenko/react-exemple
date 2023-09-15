import { useMutation } from '@apollo/client'

import { CREATE_COMPANY_PROFILE_SECTION } from './useCreateCompanyProfileSection.gql'

export const useCreateCompanyProfileSection = (options) => {
  const mutation = useMutation(CREATE_COMPANY_PROFILE_SECTION, options)

  return mutation
}
