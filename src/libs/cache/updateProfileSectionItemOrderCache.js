import { GET_COMPANY_PROFILE_SECTION_ITEMS } from 'api/hooks/queries/useCompanyProfileSectionItems/useCompanyProfileSectionItems.gql'
import { moveAndUpdateIndexOrder } from 'utils'

export const updateProfileSectionItemOrderCache = ({ companyProfileSectionId, cache, sectionItems, result }) => {
  const { getCompanyProfileSection } = cache.readQuery({
    query: GET_COMPANY_PROFILE_SECTION_ITEMS,
    variables: {
      id: companyProfileSectionId,
    },
  })

  const reorderedSectionItems = moveAndUpdateIndexOrder(sectionItems, result)

  cache.writeQuery({
    query: GET_COMPANY_PROFILE_SECTION_ITEMS,
    variables: {
      id: companyProfileSectionId,
    },
    data: {
      getCompanyProfileSection: {
        ...getCompanyProfileSection,
        items: { ...getCompanyProfileSection.items, items: reorderedSectionItems },
      },
    },
  })
}
