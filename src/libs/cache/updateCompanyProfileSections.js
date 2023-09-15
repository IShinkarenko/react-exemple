import { GET_COMPANY_PROFILE_SECTIONS } from 'api/hooks/queries/useCompanyProfileSections/useCompanyProfileSections.gql'

export const updateCompanyProfileSections = ({ companyId, cache, data: { createCompanyProfileSection } }) => {
  const { getCompany } = cache.readQuery({
    query: GET_COMPANY_PROFILE_SECTIONS,
    variables: {
      id: companyId,
    },
  })

  const newProfileSections = [...getCompany?.profileSections?.items, createCompanyProfileSection]

  cache.writeQuery({
    query: GET_COMPANY_PROFILE_SECTIONS,
    variables: {
      id: companyId,
    },
    data: {
      getCompany: { ...getCompany, profileSections: { ...getCompany?.profileSections, items: newProfileSections } },
    },
  })
}
