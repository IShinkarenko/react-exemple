import { useQuery } from '@apollo/client'

import { GET_COMPANY_PROFILE_SECTION } from './useCompanyProfileSection.gql'

export const useCompanyProfileSection = (options) => {
  const companyProfileSection = useQuery(GET_COMPANY_PROFILE_SECTION, options)

  return companyProfileSection
}
