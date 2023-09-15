import { useQuery } from '@apollo/client'

import { GET_COMPANY_PROFILE_SECTION_ITEMS } from './useCompanyProfileSectionItems.gql'

export const useCompanyProfileSectionItems = (options) => {
  const companyProfileSectionItems = useQuery(GET_COMPANY_PROFILE_SECTION_ITEMS, options)

  return companyProfileSectionItems
}
