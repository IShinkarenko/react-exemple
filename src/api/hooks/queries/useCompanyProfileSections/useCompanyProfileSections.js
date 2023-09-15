import { useQuery } from '@apollo/client'

import { GET_COMPANY_PROFILE_SECTIONS } from './useCompanyProfileSections.gql'

export const useCompanyProfileSections = (options) => {
  const companyProfileSections = useQuery(GET_COMPANY_PROFILE_SECTIONS, options)

  return companyProfileSections
}
