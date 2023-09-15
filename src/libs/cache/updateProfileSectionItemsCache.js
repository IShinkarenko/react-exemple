import { GET_COMPANY_PROFILE_SECTION_ITEMS } from 'api/hooks/queries/useCompanyProfileSectionItems/useCompanyProfileSectionItems.gql'

export const updateProfileSectionItemsCache = ({ sectionId, cache, data: { createProfileSectionItem } }) => {
  const { getCompanyProfileSection } = cache.readQuery({
    query: GET_COMPANY_PROFILE_SECTION_ITEMS,
    variables: {
      id: sectionId,
    },
  })

  const newSectionItems = [...getCompanyProfileSection?.items?.items, createProfileSectionItem]

  cache.writeQuery({
    query: GET_COMPANY_PROFILE_SECTION_ITEMS,
    variables: {
      id: sectionId,
    },
    data: {
      getCompanyProfileSection: {
        ...getCompanyProfileSection,
        items: { ...getCompanyProfileSection.items, items: newSectionItems },
      },
    },
  })
}
