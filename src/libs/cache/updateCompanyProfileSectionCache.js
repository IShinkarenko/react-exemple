import { GET_COMPANY_PROFILE_SECTIONS } from 'api/hooks/queries/useCompanyProfileSections/useCompanyProfileSections.gql'
import { moveAndUpdateIndexOrder } from 'utils'

export const updateCompanyProfileSectionCache = ({ companyId, cache, sections, result }) => {
  const { getCompany } = cache.readQuery({
    query: GET_COMPANY_PROFILE_SECTIONS,
    variables: {
      id: companyId,
    },
  })

  const reorderedProfileSections = moveAndUpdateIndexOrder(sections, result)

  cache.writeQuery({
    query: GET_COMPANY_PROFILE_SECTIONS,
    variables: {
      id: companyId,
    },
    data: {
      getCompany: {
        ...getCompany,
        profileSections: { ...getCompany.profileSections, items: reorderedProfileSections },
      },
    },
  })
}
